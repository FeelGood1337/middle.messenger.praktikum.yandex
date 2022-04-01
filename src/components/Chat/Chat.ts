/* eslint-disable indent */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { IChats } from '../../API/chat-api';
import { Block } from '../../utils/Block/Block';
import isEqual from '../../utils/isEqualProps';
import { Templator } from '../../utils/Template-engine/templater';
import { template } from './Chat.tmpl';
import avatarIcon from '../../../static/images/Avatar.svg';

import { AvatarMini, Button, Title, MessageList, Element } from '..';
import { AVATAR_URL } from '../../constants';

import kebabIcon from '../../../static/images/kebab-menu.svg';
import addUserIcon from '../../../static/images/addUser.svg';
import removeUserIcon from '../../../static/images/remove.svg';
import clipIcon from '../../../static/images/clip.svg';
import sendIcon from '../../../static/images/send-btn.svg';
import { chatController, userController, messageController } from '../../controllers';
import { Input, SerchedUsersList } from '..';
import { STP } from '../SerchedUsersList/SerchedUsersList';
import store, { IUser } from '../../utils/Store/Store';
import router from '../../router';

type TProps = {
	chat: IChats;
	mainDisplay: string;
	messages: any[];
};

const chatTmpl = new Templator(template);

class Chat extends Block {
	props: TProps;
	private searchUserList: any[];
	private inputsValue: Record<string, string>;

	constructor(props: TProps) {
		super(props);
	}

	protected initChildren(): void {
		const { chat, messages } = this.props;
		const { user } = store.getState() as { user: IUser };

		this.children = {
			avatarMini: new AvatarMini({
				imgPath:
					chat !== undefined && chat.avatar
						? `${AVATAR_URL}${chat.avatar}`
						: avatarIcon,
				width: '32',
				height: '32',
			}),
			chatName: new Title({
				tag: 'h2',
				className: 'message-header__name',
				text: chat !== undefined ? chat.title : '',
			}),
			addUserKebab: new Button({
				text: `<img class="kebab-img" src="${kebabIcon}" alt="kebab menu"/>`,
				className: 'message-header__menu',
				isDisabled: false,
				events: {
					click: (e: Event) => this.handleOpenModal(e, 'kebabMenuModal'),
				},
			}),
			addUser: new Button({
				text: `
					<img class="add-user__img" src="${addUserIcon}" alt="add user"/>
					<span class="text">Добавить пользователя</span>
				`,
				className: 'add-user__btn',
				isDisabled: false,
				events: {
					click: (e: Event) => this.handleOpenModal(e, 'searchUserModal'),
				},
			}),
			removeUser: new Button({
				text: `
					<img class="remove-user__img" src="${removeUserIcon}" alt="remove user"/>
					<span class="text">Удалить пользователя</span>
				`,
				className: 'remove-user__btn',
				isDisabled: false,
				events: {
					click: (e: Event) =>
						this.handleOpenModal(e, 'searchForRemoveUserModal'),
				},
			}),
			modalInputSearch: new Input({
				name: 'login',
				className: 'modal-chat-input',
				attributes: `
					type="text"
					id="login"
					placeholder="Введите логин"
					required
				`,
				value: '',
				events: {
					input: (e: Event) => {
						e.preventDefault();
						this.inputsValue = {
							[(e.target as HTMLInputElement).name]: (
								e.target as HTMLInputElement
							).value,
						};
						this.handleSearchUsers(e);
					},
				},
			}),
			modalInputSearchRemove: new Input({
				name: 'loginRemove',
				className: 'modal-chat-input',
				attributes: `
					type="text"
					id="loginRemove"
					placeholder="Введите логин"
					required
				`,
				value: '',
				events: {
					input: (e: Event) => {
						e.preventDefault();
						this.inputsValue = {
							login: (e.target as HTMLInputElement).value,
						};
						this.handleSearchUsersForRemove(e);
					},
				},
			}),
			modalAddUsetToChatBtn: new Button({
				text: 'Добавить в чат',
				className: 'btn btn-modal btn-modal__add-to-chat',
				isDisabled: false,
				events: {
					click: async (e: Event) => {
						e.preventDefault();
						const _usersArr = (this.children.serchedUserList as any).usersArr;
						await chatController.addUserToChat({
							users: _usersArr,
							chatId: chat !== undefined ? chat.id : 0,
						});
					},
				},
			}),
			modalRemoveUsetToChatBtn: new Button({
				text: 'Удалить из чата',
				className: 'btn btn-modal btn-modal__remove-from-chat',
				isDisabled: false,
				events: {
					click: async (e: Event) => {
						e.preventDefault();
						const _usersArr = (this.children.serchedUserListRemove as any)
							.usersArr;
						await chatController.removeUserFromChat({
							users: _usersArr,
							chatId: chat !== undefined ? chat.id : 0,
						});
					},
				},
			}),
			clipBtn: new Button({
				text: `<img class="clip-img" src="${clipIcon}" alt="clip btn"/>`,
				className: 'message-form__clip',
				isDisabled: false,
			}),
			input: new Input({
				className: 'input control-panel__input',
				name: 'message',
				value: '',
				attributes: `
				type="text"
				id="message"
				placeholder="Сообщение"
				required
			`,
				events: {
					input: (e: Event) => {
						e.preventDefault();
						this.inputsValue = {
							[(e.target as HTMLInputElement).name]: (
								e.target as HTMLInputElement
							).value,
						};
					},
				},
			}),
			sendBtn: new Button({
				text: `<img class="send-img" src="${sendIcon}" alt="send message"/>`,
				className: 'message-form__send',
				isDisabled: false,
				events: {
					click: (e: Event) => {
						e.preventDefault();
						messageController.sendMessage(this.inputsValue.message as string);
					},
				},
			}),
			serchedUserList: new SerchedUsersList({
				users: this.searchUserList,
			}),
			serchedUserListRemove: new SerchedUsersList({
				users: this.searchUserList,
			}),
			messageList:
				messages === undefined || !messages.length
					? new Element({ tag: 'div', className: 'hide', content: ' ' })
					: new MessageList({
							messages,
							userId: user.id,
					  }),
		};
	}

	private async handleSearchUsers(event: Event): Promise<any> {
		event.preventDefault();

		const { element } = this;
		const modal: HTMLElement = element.querySelector(
			'#searchUserModal',
		) as HTMLElement;
		const modalFly: HTMLElement = element.querySelector(
			'#kebabMenuModal',
		) as HTMLElement;

		modalFly.style.display = 'none';
		modal.style.display = 'flex';

		await userController
			.searchUser(this.inputsValue)
			.then((res) => (this.searchUserList = res))
			.finally(() => {
				this.inputsValue = {};
			});

		(this.children.serchedUserList as Block).setProps<Pick<STP, 'users'>>({
			users: this.searchUserList,
		});
	}

	private async handleSearchUsersForRemove(event: Event): Promise<any> {
		event.preventDefault();

		const { element } = this;
		const modal: HTMLElement = element.querySelector(
			'#searchForRemoveUserModal',
		) as HTMLElement;
		const modalFly: HTMLElement = element.querySelector(
			'#kebabMenuModal',
		) as HTMLElement;

		modalFly.style.display = 'none';
		modal.style.display = 'flex';

		await userController
			.searchUser(this.inputsValue)
			.then((res) => (this.searchUserList = res))
			.finally(() => {
				this.inputsValue = {};
			});

		(this.children.serchedUserListRemove as Block).setProps<Pick<STP, 'users'>>({
			users: this.searchUserList,
		});
	}

	private handleOpenModal(event: Event, elementId: string) {
		event.preventDefault();
		const { element } = this;
		const modal: HTMLElement = element.querySelector(`#${elementId}`) as HTMLElement;

		modal.style.display = 'flex';
		window.onclick = (event: Event) => {
			if (event.target === modal) {
				modal.style.display = 'none';
			}
		};
	}

	componentDidMount(): void {
		const { chatId } = router.getParams();
		const { user } = store.getState() as { user: IUser };
		const token = localStorage.getItem('token') as string;
		if (token !== undefined) {
			messageController.connect({
				userId: user.id,
				chatId: parseInt(chatId),
				token,
			});
		}
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
