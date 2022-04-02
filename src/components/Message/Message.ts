import { IChats } from '../../API/chat-api';
import { EMPTY_CHATS, NO_SELECTED_CHAT } from '../../constants';
import { Block } from '../../utils/Block/Block';
import isEqual from '../../utils/isEqualProps';
import { Templator } from '../../utils/Template-engine/templater';
import { template } from './Message.tmpl';

type TProps = {
	chats: IChats[];
	msgDisplay: string;
};

const messageTmpl = new Templator(template);

class Message extends Block {
	props: TProps;
	constructor(props: TProps) {
		super(props);
	}

	componentDidUpdate(
		oldProps: Record<string, any>,
		newProps: Record<string, any>,
	): boolean {
		return !isEqual(oldProps, newProps);
	}

	render() {
		const { msgDisplay, chats } = this.props;

		const startMessage = chats !== undefined ? NO_SELECTED_CHAT : EMPTY_CHATS;

		return this.compile(messageTmpl, { msgDisplay, startMessage });
	}
}

export { Message as default };
