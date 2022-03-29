/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable indent */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { IChats } from '../../API/chat-api';
import { template } from './chatsList.tmpl';
import { AVATAR_URL } from '../../constants';
import router from '../../router';
import { Block } from '../../utils/Block/Block';
import isEqual from '../../utils/isEqualProps';
import { Items } from '../Items/Items';
import avatarIcon from '../../../static/images/Avatar.svg';
import { Templator } from '../../utils/Template-engine/templater';
import store, { IUser } from '../../utils/Store/Store';
import { chatController, messageController } from '../../controllers';

type TProps = {
	chats: IChats[];
};

const chatListTmpl = new Templator(template);

class ChatsList extends Block {
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

	private async handleGetToken(id: number): Promise<void> {
		await chatController.getToken(id);
	}

	render() {
		this.children.chatItems =
			this.props.chats === undefined
				? new Items({
						className: '',
						items: ' ',
				  })
				: this.props.chats.map((el: IChats): Items => {
						const { avatar, id, last_message, created_by } = el;
						return new Items({
							className: 'chat-item',
							items: `<img
								class="avatar-svg__item"
								src="${!avatar ? avatarIcon : AVATAR_URL + avatar}"
								alt="avatar chat list"
								width="32px"
								height="32px"
							/>
							<div class="item__content-wrapper">
								<div class="item__name">${el.title}</div>
								<p class="item__para">
									${last_message ? last_message : ''}
								</p>
							</div>
							<div class="item__date-wrapper">
								<div class="date">${created_by}</div>
							</div>`,
							events: {
								click: async (e: Event) => {
									e.preventDefault();
									await this.handleGetToken(id);
									const { user }: Record<string, IUser> =
										store.getState();
									await messageController.connect({
										userId: user.id,
										chatId: id,
										token: user.token!,
									});
									router.go(`/messenger/${id}`);
								},
							},
						});
				  });
		return this.compile(chatListTmpl, {});
	}
}

export { ChatsList as default };
