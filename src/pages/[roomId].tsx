import {useState, useEffect, useRef, useReducer} from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';
import classNames from 'classnames';
import socketIo from 'socket.io-client';
import {v4 as uuidv4} from 'uuid';
import Alert from '@material-ui/lab/Alert';
import 'webrtc-adapter';

import {useStyles} from '@/components/room/layout/styles';
import Header from '@/components/room/layout/Header';
import Footer from '@/components/room/layout/Footer';
import Chat from '@/components/room/layout/Chat';
import ErrorModal from '@/components/room/layout/ErrorModal';
import reducer, {initialState} from '@/components/room/reducer';
import * as actionTypes from '@/components/room/reducer/types';
import Context from '@/components/room/context';
import * as types from '@/components/room/types';
import Snackbar from '@/components/common/Snackbar';
import {formatBytes} from '@/utils/files';

declare global {
	interface RTCPeerConnection {
		chat: RTCDataChannel;
	}
}

type Call = {
	from: string;
	to: string;
	offer: string;
};
type Answer = {
	from: string;
	to: string;
	answer: string;
};
type NewIceCandidate = {
	from: string;
	to: string;
	candidate: string;
};

const peers: {[key: string]: RTCPeerConnection} = {};
const MY_ID = uuidv4();
const isDev = process.env.NODE_ENV !== 'production';
const devices = {
	video: true,
	audio: true,
	done: false,
};
let socket: SocketIOClient.Socket;

const getConnectedDevices = async (type: 'videoinput' | 'audioinput') => {
	const devices = await navigator.mediaDevices.enumerateDevices();

	return devices.filter((device) => device.kind === type);
};
const fetchDevices = async () => {
	const videoCameras = await getConnectedDevices('videoinput');
	const microphones = await getConnectedDevices('audioinput');

	return {videoCameras, microphones};
};

const Room: React.FC = () => {
	const classes = useStyles();

	const router = useRouter();
	const {roomId} = router.query;

	const [state, dispatch] = useReducer(reducer, initialState);

	const [errorModal, setErrorModal] = useState(false);
	const [linkSnackbar, setLinkSnackbar] = useState(false);
	const [deviceAlert, setDeviceAlert] = useState(false);

	const localStreamRef = useRef<MediaStream>(null!);
	const videosRef = useRef<HTMLDivElement>(null!);

	const handleBeforeUnload = (e: BeforeUnloadEvent) => {
		e.preventDefault();

		socket.emit('user-disconnected', {clientId: MY_ID});

		return undefined;
	};
	const handleDeviceChange = async () => {
		const {videoCameras, microphones} = await fetchDevices();

		if (state.videoDisabled && state.audioDisabled && (videoCameras.length || microphones.length)) {
			setDeviceAlert(true);
		}
	};

	useEffect(() => {
		window.addEventListener('beforeunload', handleBeforeUnload);

		navigator.mediaDevices.addEventListener('devicechange', handleDeviceChange);

		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);

			navigator.mediaDevices.removeEventListener('devicechange', handleDeviceChange);

			socket.emit('user-disconnected', {clientId: MY_ID});

			if (localStreamRef.current) {
				localStreamRef.current.getTracks().forEach((track) => track.stop());
			}
		};
	}, []);

	useEffect(() => {
		if (roomId) {
			socket = socketIo(String(process.env.NEXT_PUBLIC_SIGNALING_SERVER), {
				query: `clientId=${MY_ID}&roomId=${roomId}`,
			});

			socket.on('can-join', () => start({video: devices.video, audio: devices.audio}));
			socket.on('cant-join', () => router.replace(`/${uuidv4()}`));
			socket.on('user-connected', call);
			socket.on('incoming-call', handleIcomingCall);
			socket.on('answer', handleAnswer);
			socket.on('new-ice-candidate', handleNewIceCandidate);
			socket.on('user-disconnected', handleUserDisconnected);
		}
	}, [roomId]);

	const addVideo = (stream: MediaStream, clientId = '') => {
		const video = document.createElement('video');
		video.setAttribute('autoplay', 'true');
		video.srcObject = stream;
		video.dataset.clientId = clientId;

		if (!clientId) {
			video.muted = true;
		}

		videosRef.current.append(video);
	};

	const start = async ({audio = true, video = true}) => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				audio,
				video,
			});

			addVideo(stream);

			localStreamRef.current = stream;

			if (video) dispatch({type: actionTypes.ENABLE_VIDEO});
			if (audio) dispatch({type: actionTypes.ENABLE_AUDIO});

			socket.emit('user-connected', {clientId: MY_ID});
		} catch (e) {
			const errors = ['NotReadableError', 'NotFoundError'];

			if (errors.includes(e.name)) {
				if (!devices.done) {
					if (devices.video) {
						devices.video = false;

						start({video: devices.video, audio: devices.audio});
					} else if (devices.audio) {
						devices.video = true;
						devices.audio = false;
						devices.done = true;

						start({video: devices.video, audio: devices.audio});
					}
				} else {
					setErrorModal(true);
				}
			}
		}
	};
	const getNewPeerConnection = (clientId: string): RTCPeerConnection => {
		const peer = new RTCPeerConnection({
			iceServers: [
				{
					urls: 'stun:stun.l.google.com:19302',
				},
			],
		});

		peer.onicecandidate = (e) => {
			if (e.candidate) {
				socket.emit('new-ice-candidate', {
					to: clientId,
					from: MY_ID,
					candidate: JSON.stringify(e.candidate),
				});
			}
		};

		peer.ontrack = (e) => {
			addVideo(e.streams[0], clientId);
		};

		peer.chat = peer.createDataChannel('chat');

		peer.ondatachannel = (e) => {
			const receiveChannel = e.channel;

			if (receiveChannel.label === 'chat') {
				receiveChannel.onmessage = (e) => {
					dispatch({
						type: actionTypes.NEW_MESSAGE,
						payload: {
							message: JSON.parse(e.data),
						},
					});
				};
			} else {
				receiveChannel.binaryType = 'arraybuffer';

				receiveChannel.onmessage = (e) => {
					const messageData = JSON.parse(receiveChannel.label);

					const blob = new Blob([e.data]);
					const url = window.URL.createObjectURL(blob);

					dispatch({
						type: actionTypes.NEW_MESSAGE,
						payload: {
							message: {
								...messageData,
								file: {
									...messageData.file,
									url,
								},
							},
						},
					});

					receiveChannel.close();
				};
			}
		};

		return peer;
	};

	const call = async (clientId: string) => {
		const peer = getNewPeerConnection(clientId);

		peers[clientId] = peer;

		localStreamRef.current
			.getTracks()
			.forEach((track) => peer.addTrack(track, localStreamRef.current));

		const offer = await peer.createOffer();
		await peer.setLocalDescription(offer);

		socket.emit('call', {
			from: MY_ID,
			to: clientId,
			offer: JSON.stringify(offer),
		});
	};
	const handleIcomingCall = async (call: Call) => {
		if (call.to === MY_ID) {
			if (isDev) {
				console.log(`incoming-call: ${call.offer}`);
			}

			const peer = getNewPeerConnection(call.from);

			peers[call.from] = peer;

			localStreamRef.current
				.getTracks()
				.forEach((track) => peer.addTrack(track, localStreamRef.current));

			await peer.setRemoteDescription(JSON.parse(call.offer));
			const answer = await peer.createAnswer();
			await peer.setLocalDescription(answer);

			socket.emit('answer', {
				from: MY_ID,
				to: call.from,
				answer: JSON.stringify(answer),
			});
		}
	};
	const handleAnswer = (answer: Answer) => {
		if (answer.to === MY_ID) {
			if (isDev) {
				console.log(`answer: ${answer.answer}`);
			}

			peers[answer.from].setRemoteDescription(JSON.parse(answer.answer));
		}
	};
	const handleNewIceCandidate = (data: NewIceCandidate) => {
		if (data.to === MY_ID) {
			peers[data.from].addIceCandidate(new RTCIceCandidate(JSON.parse(data.candidate)));
		}
	};
	const handleUserDisconnected = (clientId: string) => {
		if (peers[clientId]) {
			const video = document.querySelector(`[data-client-id='${clientId}']`);

			video?.remove();

			peers[clientId].chat.close();
			peers[clientId].close();
			delete peers[clientId];
		}
	};

	const toggleVideoInput = () => {
		const enabled = localStreamRef.current.getVideoTracks()[0].enabled;

		if (enabled) {
			localStreamRef.current.getVideoTracks()[0].enabled = false;
		} else {
			localStreamRef.current.getVideoTracks()[0].enabled = true;
		}

		dispatch({type: actionTypes.TOGGLE_VIDEO_INPUT});
	};
	const toggleAudioInput = () => {
		const enabled = localStreamRef.current.getAudioTracks()[0].enabled;

		if (enabled) {
			localStreamRef.current.getAudioTracks()[0].enabled = false;
		} else {
			localStreamRef.current.getAudioTracks()[0].enabled = true;
		}

		dispatch({type: actionTypes.TOGGLE_AUDIO_INPUT});
	};

	const handleAddMessage = (text: string) => {
		const message: types.TextMessage = {
			text,
			type: 'text',
			user: MY_ID,
			date: Date.now(),
		};

		dispatch({
			type: actionTypes.NEW_MESSAGE_FROM_ME,
			payload: {
				message,
			},
		});

		for (const peer in peers) {
			peers[peer].chat.send(JSON.stringify(message));
		}
	};
	const handleAddFile = async (file: File) => {
		const messageData: types.FileMessage = {
			type: 'file',
			file: {
				name: file.name,
				size: formatBytes(file.size),
				url: '',
			},
			user: MY_ID,
			date: Date.now(),
		};

		const arrayBuffer = await file.arrayBuffer();

		const blob = new Blob([arrayBuffer]);
		const url = window.URL.createObjectURL(blob);

		dispatch({
			type: actionTypes.NEW_MESSAGE_FROM_ME,
			payload: {
				message: {
					...messageData,
					file: {
						...messageData.file,
						url,
					},
				},
			},
		});

		for (const peer in peers) {
			const dataChannel = peers[peer].createDataChannel(JSON.stringify(messageData));
			dataChannel.binaryType = 'arraybuffer';

			dataChannel.onopen = () => {
				dataChannel.send(arrayBuffer);
			};
		}
	};
	const handleCopyLink = async () => {
		await navigator.clipboard.writeText(location.toString());

		setLinkSnackbar(true);
	};

	return (
		<section
			className={classes.root}
			onDragOver={(e) => e.preventDefault()}
			onDrop={(e) => e.preventDefault()}
		>
			<Head>
				<title>{roomId}</title>

				<meta name='robots' content='noindex,follow' />
				<meta name='googlebot' content='noindex,follow' />
			</Head>

			<Context.Provider value={state}>
				<div
					className={classNames(classes.mainBlock, {
						[classes.mainBlockShift]: state.chat,
					})}
				>
					<Header
						handleCopyLink={handleCopyLink}
						handleOpenChat={() => dispatch({type: actionTypes.TOGGLE_CHAT})}
					/>

					{deviceAlert && (
						<Alert severity='info' color='warning' variant='outlined'>
							Found a new device. Try reloading the page.
						</Alert>
					)}

					<div className={classes.videos} ref={videosRef}></div>

					<Footer toggleVideo={toggleVideoInput} toggleAudio={toggleAudioInput} />
				</div>

				<Chat
					handleAddFile={handleAddFile}
					handleAddMessage={handleAddMessage}
					closeChat={() => dispatch({type: actionTypes.TOGGLE_CHAT})}
				/>
			</Context.Provider>

			<ErrorModal open={errorModal} onClose={() => setErrorModal(false)} />

			<Snackbar
				open={linkSnackbar}
				text='Link copied successfully!'
				variant='success'
				onClose={() => setLinkSnackbar(false)}
			/>
		</section>
	);
};

export default Room;
