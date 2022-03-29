/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { IChats } from '../../API/chat-api';
import { Block } from '../../utils/Block/Block';
import isEqual from '../../utils/isEqualProps';
import { Templator } from '../../utils/Template-engine/templater';
import { template } from './Chat.tmpl';
import avatarIcon from '../../../static/images/Avatar.svg';

import { AvatarMini, Button, Title } from '..';
import { AVATAR_URL } from '../../constants';

import kebabIcon from '../../../static/images/kebab-menu.svg';
import addUserIcon from '../../../static/images/addUser.svg';
import removeUserIcon from '../../../static/images/remove.svg';
import clipIcon from '../../../static/images/clip.svg';
import sendIcon from '../../../static/images/send-btn.svg';
import { userController } from '../../controllers';
import { Input, SerchedUsersList } from '..';
import { STP } from '../SerchedUsersList/SerchedUsersList';

type TProps = {
	chat: IChats;
	mainDisplay: string;
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
		const { chat } = this.props;

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
			modalAddUsetToChatBtn: new Button({
				text: 'Добавить в чат',
				className: 'btn btn-modal btn-modal__add-to-chat',
				isDisabled: false,
				events: {
					click: (e: Event) => this.handleSearchUsers(e),
				},
			}),
			clipBtn: new Button({
				text: `<img class="clip-img" src="${clipIcon}" alt="clip btn"/>`,
				className: 'message-form__clip',
				isDisabled: false,
			}),
			sendBtn: new Button({
				text: `<img class="send-img" src="${sendIcon}" alt="send message"/>`,
				className: 'message-form__send',
				isDisabled: false,
			}),
			serchedUserList: new SerchedUsersList({
				users: this.searchUserList,
				chatId: chat !== undefined ? chat.id : 0,
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
