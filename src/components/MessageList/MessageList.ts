import { Block } from '../../utils/Block/Block';
import isEqual from '../../utils/isEqualProps';
import { Templator } from '../../utils/Template-engine/templater';
import { Element } from '..';
import { template } from './MessageList.tmpl';
import { IUser } from '../../utils/Store/Store';

interface IMessage {
	chatId: number;
	content: string;
	file: string;
	id: number;
	isRead: boolean;
	time: string;
	type: string;
	userId: number;
}

type TProps = {
	messages: Record<number, IMessage>[];
	userId: number;
};

const messageListTmpl = new Templator(template);

class MessageList extends Block {
	props: TProps;
	constructor(props: TProps) {
		super(props);
	}

	protected initChildren(): void {
		const { messages, userId } = this.props;
		console.log(messages, userId);
		this.children = {
			children: new Element({
				tag: 'h2',
				className: ' ',
				content: 'Z',
			}),
		};
	}

	componentDidUpdate(
		oldProps: Record<string, any>,
		newProps: Record<string, any>,
	): boolean {
		return !isEqual(oldProps, newProps);
	}

	render() {
		return this.compile(messageListTmpl, {});
	}
}

export default MessageList;
