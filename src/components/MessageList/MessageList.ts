import { Block } from '../../utils/Block/Block';
import isEqual from '../../utils/isEqualProps';
import { Templator } from '../../utils/Template-engine/templater';
import { Items } from '..';
import { template } from './MessageList.tmpl';
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
	messages: IMessage[];
	userId: number;
};

const messageListTmpl = new Templator(template);

class MessageList extends Block {
	props: TProps;
	constructor(props: TProps) {
		super(props);
	}

	protected initChildren(): void {
		const { messages, userId: id } = this.props;

		if (messages !== undefined) {
			this.children = {
				children: messages
					.slice(0)
					.reverse()
					.map((msg: IMessage) => {
						const { content, time, userId } = msg;
						const positionClass = userId === id ? 'right' : 'left';
						const dateMsg = new Date(time).toLocaleTimeString([], {
							hour: '2-digit',
							minute: '2-digit',
						});
						return new Items({
							className: `message-body_msg ${positionClass}`,
							items: `
							<div class="content">${content}</div>
							<div class="time">${dateMsg}</div>
						`,
						});
					}),
			};
		}
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
