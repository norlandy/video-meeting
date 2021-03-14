import * as types from './types';

export const initialState = {
	video: true,
	audio: false,
	linkSnackbar: false,
	chat: true,
	messages: [],
	scrollDown: false,
};

const reducer = (state, action) => {
	switch (action.type) {
		case types.TOGGLE_VIDEO:
			return {
				...state,
				video: !state.video,
			};
		case types.TOGGLE_AUDIO:
			return {
				...state,
				audio: !state.audio,
			};
		case types.TOGGLE_LINK_SNACKBAR:
			return {
				...state,
				linkSnackbar: !state.linkSnackbar,
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
