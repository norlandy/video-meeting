import React from 'react';

import * as types from '@/components/room/types';
import FileMessage from './FileMessage';
import TextMessage from './TextMessage';

type Props = {
	message: types.Message;
	info?: boolean;
};

const Message: React.FC<Props> = ({message, info = true}) => {
	return message.type === 'file' ? (
		<FileMessage message={message} info={info} />
	) : (
		<TextMessage message={message} info={info} />
	);
};

export default Message;
