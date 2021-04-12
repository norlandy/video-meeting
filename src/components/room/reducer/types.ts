import {Message} from '@/components/room/types';

export const ENABLE_VIDEO = 'room/enableVideo';
export const ENABLE_AUDIO = 'room/enableAudio';
export const TOGGLE_VIDEO_INPUT = 'room/toggleVideoInput';
export const TOGGLE_AUDIO_INPUT = 'room/toggleAudioInput';
export const TOGGLE_CHAT = 'room/toggleChat';
export const NEW_MESSAGE = 'room/newMessage';
export const NEW_MESSAGE_FROM_ME = 'room/newMessageFromMe';

export type State = {
	videoDisabled: boolean;
	audioDisabled: boolean;
	videoInput: boolean;
	audioInput: boolean;
	chat: boolean;
	messages: Message[];
	scrollDown: boolean;
};

type EnableVideo = {
	type: typeof ENABLE_VIDEO;
};
type EnableAudio = {
	type: typeof ENABLE_AUDIO;
};
type ToggleVideoInput = {
	type: typeof TOGGLE_VIDEO_INPUT;
};
type ToggleAudioInput = {
	type: typeof TOGGLE_AUDIO_INPUT;
};
type ToggleChat = {
	type: typeof TOGGLE_CHAT;
};
type NewMessage = {
	type: typeof NEW_MESSAGE;
	payload: {
		message: Message;
	};
};
type NewMessageFromMe = {
	type: typeof NEW_MESSAGE_FROM_ME;
	payload: {
		message: Message;
	};
};

export type Action =
	| EnableVideo
	| EnableAudio
	| ToggleVideoInput
	| ToggleAudioInput
	| ToggleChat
	| NewMessage
	| NewMessageFromMe;
