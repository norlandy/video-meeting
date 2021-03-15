import * as types from './types';

export const initialState = {
	videoDisabled: true,
	audioDisabled: true,
	videoInput: true,
	audioInput: true,
	chat: true,
	messages: [],
	scrollDown: false,
};

const reducer = (state, action) => {
	switch (action.type) {
		case types.ENABLE_VIDEO:
			return {
				...state,
				videoDisabled: false,
			};
		case types.ENABLE_AUDIO:
			return {
				...state,
				audioDisabled: false,
			};
		case types.TOGGLE_VIDEO_INPUT:
			return {
				...state,
				videoInput: !state.videoInput,
			};
		case types.TOGGLE_AUDIO_INPUT:
			return {
				...state,
				audioInput: !state.audioInput,
			};
		case types.TOGGLE_CHAT:
			return {
				...state,
				chat: !state.chat,
			};
		case types.NEW_MESSAGE:
			return {
				...state,
				messages: state.messages.concat(action.payload.message),
				scrollDown: false,
			};
		case types.NEW_MESSAGE_FROM_ME:
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
