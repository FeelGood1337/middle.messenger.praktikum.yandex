/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Block } from '../../utils/Block/Block';
import router from '../../router';
import { Templator } from '../../utils/Template-engine/templater';
import { template } from './chatList.tmpl';

import {
	AvatarMini,
	Button,
	ChatsList,
	InputWithLabel,
	Items,
	LinkButton,
	Title,
} from '../../components/index';

import kebabIcon from '../../../static/images/kebab-menu.svg';
import addUserIcon from '../../../static/images/addUser.svg';
import removeUserIcon from '../../../static/images/remove.svg';
import clipIcon from '../../../static/images/clip.svg';
import sendIcon from '../../../static/images/send-btn.svg';
import backArrowIcon from '../../../static/images/linkButton.svg';
import avatarIcon from '../../../static/images/Avatar.svg';
import addIcon from '../../../static/images/add.svg';
import store, { IUser } from '../../utils/Store/Store';
import { AVATAR_URL } from '../../constants';
import { chatController, userController } from '../../controllers';
import { Form, IForm } from '../../utils/form';
import { IChats } from '../../API/chat-api';
import isEqual from '../../utils/isEqualProps';
import Message from '../../components/Message/Message';

interface IProps {
	state: IUser;
	router: typeof router;
}

const inputsPropsAddChat = [
	{
		name: 'title',
		className: 'modal-chat-input',
		labelClassName: 'chat-label',
		labelText: 'Чат',
		labelId: 'title',
		attributes: `
			type="text"
			id="title"
			placeholder="Введите имя чата"
			required
		`,
	},
];

const inputsPropsAddUser = [
	{
		name: 'login',
		className: 'modal-chat-input',
		labelClassName: 'chat-label',
		labelText: 'Логин',
		labelId: 'login',
		attributes: `
			type="text"
			id="login"
			placeholder="Введите логин"
			required
		`,
	},
];

const chatTmpl = new Templator(template);
class ChatList extends Block {
	private inputsValue: Record<string, string>;
	private form: IForm;
	private formSearch: IForm;
	private searchUserList: any[];

	// private goToProfile(event: Event): void {
	// 	event?.preventDefault();
	// 	router.go('/settings');
	// }

	// private handleClickModal(modal: HTMLElement): void {
	// 	event?.preventDefault();
	// 	modal.style.display = 'flex';
	// 	window.onclick = (event: Event) => {
	// 		if (event.target === modal) {
	// 			modal.style.display = 'none';
	// 		}
	// 	};
	// }

	// private getChatsList(chats: IChats[]) {
	// 	return chats
	// 		.map((el: IChats, index: number): string => {
	// 			const { avatar, id, last_message, created_by } = el;
	// 			return `
	// 				<li class="chat-item" data-chat-id="${id}" data-chat-index="${index}">
	// 					<img
	// 						class="avatar-svg__item"
	// 						src="${!avatar ? avatarIcon : AVATAR_URL + avatar}"
	// 						alt="avatar chat list"
	// 						width="32px"
	// 						height="32px"
	// 					/>
	// 					<div class="item__content-wrapper">
	// 						<div class="item__name">${el.title}</div>
	// 						<p class="item__para">
	// 							${last_message ? last_message : ''}
	// 						</p>
	// 					</div>
	// 					<div class="item__date-wrapper">
	// 						<div class="date">${created_by}</div>
	// 					</div>
	// 				</li>
	// 			`;
	// 		})
	// 		.join('');
	// }

	// private getInputs(): string {
	// 	this.inputsValue = this.inputsValue || {};

	// 	return inputsPropsAddChat
	// 		.map(
	// 			({ className, labelText, labelClassName, labelId, attributes, name }) => {
	// 				const value = this.inputsValue[name]
	// 					? `value="${this.inputsValue[name]}"`
	// 					: ' ';

	// 				return new InputWithLabel({
	// 					className,
	// 					labelClassName,
	// 					labelText,
	// 					labelId,
	// 					attributes,
	// 					name,
	// 					value,
	// 				}).render().outerHTML;
	// 			},
	// 		)
	// 		.join('');
	// }

	// private getInputsAddUser(): string {
	// 	this.inputsValue = this.inputsValue || {};

	// 	return inputsPropsAddUser
	// 		.map(
	// 			({ className, labelText, labelClassName, labelId, attributes, name }) => {
	// 				const value = this.inputsValue[name]
	// 					? `value="${this.inputsValue[name]}"`
	// 					: ' ';

	// 				return new InputWithLabel({
	// 					className,
	// 					labelClassName,
	// 					labelText,
	// 					labelId,
	// 					attributes,
	// 					name,
	// 					value,
	// 				}).render().outerHTML;
	// 			},
	// 		)
	// 		.join('');
	// }

	// private async handleClickCreateChat(event: Event): Promise<any> {
	// 	event.preventDefault();

	// 	const { element } = this;
	// 	const modal: HTMLElement = element.querySelector(
	// 		'#createChatModal',
	// 	) as HTMLElement;

	// 	modal.style.display = 'flex';

	// 	await chatController.createChat(this.inputsValue).finally(() => {
	// 		this.inputsValue = {};
	// 	});

	// 	modal.style.display = 'none';
	// }

	// private async handleSearchUsers(event: Event): Promise<any> {
	// 	event.preventDefault();

	// 	const { element } = this;
	// 	const modal: HTMLElement = element.querySelector(
	// 		'#searchUserModal',
	// 	) as HTMLElement;
	// 	const modalFly: HTMLElement = element.querySelector(
	// 		'#kebabMenuModal',
	// 	) as HTMLElement;

	// 	modal.style.display = 'flex';

	// 	await userController
	// 		.searchUser(this.inputsValue)
	// 		.then((res) => (this.searchUserList = res))
	// 		.finally(() => {
	// 			this.inputsValue = {};
	// 		});

	// 	console.log(this.searchUserList);

	// 	modalFly.style.display = 'none';
	// }

	// private getInputsValue(): void {
	// 	this.form.saveValue(<HTMLInputElement>event?.target, this.inputsValue);
	// }

	// private getSearchInputsValue(): void {
	// 	this.formSearch.saveValue(<HTMLInputElement>event?.target, this.inputsValue);
	// }

	// private async handleGetToken(id: string): Promise<void> {
	// 	await chatController.getToken(id);
	// }

	// private handleSelectChat(chatIndex: string) {
	// 	const { state }: Record<string, IUser> = this.props;
	// 	const { chats } = state;
	// 	const { id } = chats![parseInt(chatIndex)];

	// 	router.go(`/messenger/${id}`);
	// }

	// componentDidMount(): void {
	// 	this.eventBus().on(Block.EVENTS.FLOW_RENDER, () => {
	// 		const {
	// 			element,
	// 			goToProfile,
	// 			getInputsValue,
	// 			getSearchInputsValue,
	// 			handleClickCreateChat,
	// 			handleSearchUsers,
	// 			handleClickModal,
	// 		} = this;

	// 		const modal: HTMLElement = element.querySelector(
	// 			'#createChatModal',
	// 		) as HTMLElement;
	// 		const modalFly: HTMLElement = element.querySelector(
	// 			'#kebabMenuModal',
	// 		) as HTMLElement;
	// 		const modalAddUser: HTMLElement = element.querySelector(
	// 			'#searchUserModal',
	// 		) as HTMLElement;
	// 		const linkBtn: HTMLButtonElement = element.querySelector(
	// 			'.section-caht-list__link-btn',
	// 		) as HTMLButtonElement;
	// 		const addChatBtn: HTMLButtonElement = element.querySelector(
	// 			'.chat-add-btn',
	// 		) as HTMLButtonElement;

	// 		const headerMenuBtn: HTMLButtonElement = element.querySelector(
	// 			'.message-header__menu',
	// 		) as HTMLButtonElement;
	// 		const addUseruBtn: HTMLButtonElement = element.querySelector(
	// 			'.add-user__btn',
	// 		) as HTMLButtonElement;
	// 		const searchBtn: HTMLButtonElement = element.querySelector(
	// 			'.btn-modal__add-to-chat',
	// 		) as HTMLButtonElement;
	// 		const createChatBtn: HTMLButtonElement = element.querySelector(
	// 			'.btn-modal__create-chat',
	// 		) as HTMLButtonElement;
	// 		const formContainer: HTMLFormElement = element.querySelector(
	// 			'.auth__form',
	// 		) as HTMLFormElement;
	// 		const formContainerSearch: HTMLFormElement = element.querySelector(
	// 			'.auth__form_search',
	// 		) as HTMLFormElement;
	// 		const searchInput: HTMLInputElement = element.querySelector(
	// 			'#login',
	// 		) as HTMLInputElement;

	// 		this.form = new Form(formContainer, createChatBtn);
	// 		this.formSearch = new Form(formContainerSearch, addUseruBtn);

	// 		const listLi = [
	// 			...(element
	// 				.querySelector('#chats-wrapper')
	// 				?.getElementsByTagName('li') as HTMLCollectionOf<HTMLLIElement>),
	// 		];

	// 		listLi.map((el: HTMLLIElement) => {
	// 			el.addEventListener('click', async (event) => {
	// 				const { currentTarget } = event;
	// 				const chatId = (currentTarget as HTMLLIElement).dataset.chatId;
	// 				const chatIndex = (currentTarget as HTMLLIElement).dataset.chatIndex;
	// 				await this.handleGetToken(chatId as string);
	// 				this.handleSelectChat(chatIndex as string);
	// 			});
	// 		});

	// 		formContainer.onchange = getInputsValue.bind(this);
	// 		formContainerSearch.onchange = getSearchInputsValue.bind(this);
	// 		searchBtn.onclick = handleSearchUsers.bind(this);
	// 		createChatBtn.onclick = handleClickCreateChat.bind(this);

	// 		linkBtn.onclick = goToProfile;
	// 		addChatBtn.onclick = () => handleClickModal(modal);
	// 		headerMenuBtn.onclick = () => handleClickModal(modalFly);
	// 		addUseruBtn.onclick = () => handleClickModal(modalAddUser);
	// 	});
	// }

	protected initChildren(): void {
		const isChatSelected = Object.keys(router.getParams()).length === 0;

		this.children = {
			btnAddChat: new Button({
				text: `<img class="chat-add-btn__img" src="${addIcon}" alt="add new chat"/>`,
				className: 'chat-add-btn',
				isDisabled: false,
				events: {
					click: (e: Event) => this.handleOpenModal(e),
				},
			}),
			modalAddUsetToChatBtn: new Button({
				text: 'Добавить в чат',
				className: 'btn-modal btn-modal__add-to-chat',
				isDisabled: false,
				events: {
					click: (e: Event) => this.handleSearchUsers(e),
				},
			}),
			linkButton: new LinkButton({
				text: 'Профиль',
				className: 'section-caht-list__link-btn',
				href: '/settings',
				svgIcon: backArrowIcon,
				hasSvgIcon: true,
				events: {
					click: (e: Event) => {
						e.preventDefault();
						router.go('/settings');
					},
				},
			}),
			modalTitle: new Title({
				tag: 'h2',
				className: 'modal-title',
				text: 'Укажите название чата',
			}),
			modalInput: new InputWithLabel({
				name: 'title',
				value: '',
				className: 'modal-chat-input',
				labelClassName: 'chat-label',
				labelText: 'Чат',
				labelId: 'title',
				attributes: `
					type="text"
					id="title"
					placeholder="Введите имя чата"
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
			modalBtn: new Button({
				text: 'Создать',
				className: 'btn btn-modal btn-modal__create-chat',
				isDisabled: false,
				events: {
					click: (e: Event) => this.handleClickCreateChat(e),
				},
			}),
			chatItems: new ChatsList({ chats: this.props.chats }),
			startMessage: isChatSelected
				? new Message({ chats: this.props.chats, msgDisplay: 'flex' })
				: new Message({ chats: this.props.chats, msgDisplay: 'none' }),
		};
	}

	private async handleClickCreateChat(event: Event): Promise<any> {
		event.preventDefault();

		const { element } = this;
		const modal: HTMLElement = element.querySelector(
			'#createChatModal',
		) as HTMLElement;

		await chatController
			.createChat(this.inputsValue)
			.then(() => {
				const { user }: Record<string, IUser> = store.getState();
				const { chats } = user;
				this.children.chatItems.setProps({
					chats,
				});
				this.children.startMessage.setProps({
					chats,
				});
			})
			.finally(() => {
				this.inputsValue = {};
			});

		modal.style.display = 'none';
	}

	private handleOpenModal(event: Event) {
		event.preventDefault();
		const { element } = this;
		const modal: HTMLElement = element.querySelector(
			'#createChatModal',
		) as HTMLElement;

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

	private async handleSearchUsers(event: Event): Promise<any> {
		event.preventDefault();
		await userController
			.searchUser({ login: 'vv' })
			.then((res) => {
				this.searchUserList = res;
			})
			.finally(() => {
				this.inputsValue = {};
			});
		console.log(this.searchUserList);
	}

	render() {
		// const { state, router }: IProps = this.props as IProps;
		// const { chats } = state;
		// const { chatId } = router.getParams();
		// const currentChat = chats?.filter((el: IChats) => el.id === parseInt(chatId));
		// const [chat] = currentChat as IChats[];

		this.initChildren();

		return this.compile(chatTmpl, {
			...this.props,
		});

		// if (chat !== undefined) {
		// 	return chatTmpl
		// 		.compile({
		// 			msgDisplay: 'none',
		// 			mainDisplay: 'flex',
		// 			linkButtonAddChat: addIcon,
		// 			linkButton: new LinkButton({
		// 				text: 'Профиль',
		// 				className: 'section-caht-list__link-btn',
		// 				href: '/settings',
		// 				svgIcon: backArrowIcon,
		// 				hasSvgIcon: true,
		// 			}).render(),
		// 			avatarMini: new AvatarMini({
		// 				imgPath: chat.avatar ? `${AVATAR_URL}${chat.avatar}` : avatarIcon,
		// 				width: '32',
		// 				height: '32',
		// 			}).render(),
		// 			name: chat.title,
		// 			kebab: kebabIcon,
		// 			clip: clipIcon,
		// 			send: sendIcon,
		// 			modalTitle: new Title({
		// 				tag: 'h2',
		// 				className: 'modal-title',
		// 				text: 'Укажите название чата',
		// 			}).render(),
		// 			modalInputSearch: this.getInputsAddUser(),
		// 			modalAddUsetToChatBtn: new Button({
		// 				text: 'Добавить в чат',
		// 				className: 'btn-modal btn-modal__add-to-chat',
		// 				isDisabled: false,
		// 			}).render(),
		// modalInput: this.getInputs(),
		// modalBtn: new Button({
		// 	text: 'Создать',
		// 	className: 'btn-modal btn-modal__create-chat',
		// 	isDisabled: false,
		// }).render(),
		// 			modalAddBtn: addUserIcon,
		// 			modalRemoveBtn: removeUserIcon,
		// 			chatItems: chats?.length
		// 				? this.getChatsList(chats)
		// 				: '<div class="hiden"></div>',
		// 		})
		// 		.getNode();
		// } else {
		// 	return chatTmpl
		// 		.compile({
		// 			modalAddUsetToChatBtn: new Button({
		// 				text: 'Добавить в чат',
		// 				className: 'btn-modal btn-modal__add-to-chat',
		// 				isDisabled: false,
		// 			}).render(),
		// 			msgDisplay: 'flex',
		// 			mainDisplay: 'none',
		// 			linkButtonAddChat: addIcon,
		// 			linkButton: new LinkButton({
		// 				text: 'Профиль',
		// 				className: 'section-caht-list__link-btn',
		// 				href: '/settings',
		// 				svgIcon: backArrowIcon,
		// 				hasSvgIcon: true,
		// 			}).render(),
		// 			startMessage:
		// 				chats === undefined || !chats.length
		// 					? EMPTY_CHATS
		// 					: NO_SELECTED_CHAT,
		// 			modalTitle: new Title({
		// 				tag: 'h2',
		// 				className: 'modal-title',
		// 				text: 'Укажите название чата',
		// 			}).render(),
		// 			modalInput: this.getInputs(),
		// 			modalBtn: new Button({
		// 				text: 'Создать',
		// 				className: 'btn-modal btn-modal__create-chat',
		// 				isDisabled: false,
		// 			}).render(),
		// 			chatItems: chats?.length
		// 				? this.getChatsList(chats)
		// 				: '<div class="hiden"></div>',
		// 		})
		// 		.getNode();
		// }
	}
}

export { ChatList };
