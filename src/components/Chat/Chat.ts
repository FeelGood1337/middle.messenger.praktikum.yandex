/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { IChats } from '../../API/chat-api';
import { Block } from '../../utils/Block/Block';
import isEqual from '../../utils/isEqualProps';
import { Templator } from '../../utils/Template-engine/templater';
import { template } from './Chat.tmpl';
import avatarIcon from '../../../static/images/Avatar.svg';

import { AvatarMini, Title } from '..';
import { AVATAR_URL } from '../../constants';

import kebabIcon from '../../../static/images/kebab-menu.svg';
import addUserIcon from '../../../static/images/addUser.svg';
import removeUserIcon from '../../../static/images/remove.svg';
import clipIcon from '../../../static/images/clip.svg';
import sendIcon from '../../../static/images/send-btn.svg';

type TProps = {
	chat: IChats;
	mainDisplay: string;
};

const chatTmpl = new Templator(template);

class Chat extends Block {
	props: TProps;
	constructor(props: TProps) {
		super(props);
	}

	protected initChildren(): void {
		const { chat } = this.props;
		this.children = {
			avatarMini: new AvatarMini({
				imgPath: chat.avatar ? `${AVATAR_URL}${chat.avatar}` : avatarIcon,
				width: '32',
				height: '32',
			}),
			chatName: new Title({
				tag: 'h2',
				className: 'message-header__name',
				text: chat.title,
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
		return this.compile(chatTmpl, { ...this.props });
	}
}

export { Chat as default };
