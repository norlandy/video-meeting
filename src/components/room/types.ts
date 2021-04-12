export type TextMessage = {
	type: 'text';
	user: string;
	text: string;
	date: number;
};

export type FileMessage = {
	type: 'file';
	user: string;
	file: {
		name: string;
		size: string;
		url: string;
	};
	date: number;
};

export type Message = TextMessage | FileMessage;
