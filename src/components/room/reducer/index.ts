import * as actionTypes from './types';

export const initialState: actionTypes.State = {
	videoDisabled: true,
	audioDisabled: true,
	videoInput: true,
	audioInput: true,
	chat: true,
	messages: [],
	scrollDown: false,
};

const reducer = (state: actionTypes.State, action: actionTypes.Action): actionTypes.State => {
	switch (action.type) {
		case actionTypes.ENABLE_VIDEO:
			return {
				...state,
				videoDisabled: false,
			};
		case actionTypes.ENABLE_AUDIO:
			return {
				...state,
				audioDisabled: false,
			};
		case actionTypes.TOGGLE_VIDEO_INPUT:
			return {
				...state,
				videoInput: !state.videoInput,
			};
		case actionTypes.TOGGLE_AUDIO_INPUT:
			return {
				...state,
				audioInput: !state.audioInput,
			};
		case actionTypes.TOGGLE_CHAT:
			return {
				...state,
				chat: !state.chat,
			};
		case actionTypes.NEW_MESSAGE:
			return {
				...state,
				messages: state.messages.concat(action.payload.message),
				scrollDown: false,
			};
		case actionTypes.NEW_MESSAGE_FROM_ME:
			return {
				...state,
				messages: state.messages.concat(action.payload.message),
				scrollDown: true,
			};
		default:
			return state;
	}
};

export default reducer;
