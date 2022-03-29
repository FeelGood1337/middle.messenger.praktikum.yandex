/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Block } from '../../utils/Block/Block';
import router from '../../router';
import { Templator } from '../../utils/Template-engine/templater';
import { template } from './chatList.tmpl';

import {
	Button,
	Chat,
	ChatsList,
	Input,
	InputWithLabel,
	LinkButton,
	Title,
} from '../../components/index';

import backArrowIcon from '../../../static/images/linkButton.svg';
import addIcon from '../../../static/images/add.svg';
import store, { IUser } from '../../utils/Store/Store';
import { chatController } from '../../controllers';
import isEqual from '../../utils/isEqualProps';
import Message from '../../components/Message/Message';

const chatTmpl = new Templator(template);
class ChatList extends Block {
	private inputsValue: Record<string, string>;

	protected initChildren(): void {
		const isChatSelected = Object.keys(router.getParams()).length !== 0;

		this.children = {
			btnAddChat: new Button({
				text: `<img class="chat-add-btn__img" src="${addIcon}" alt="add new chat"/>`,
				className: 'chat-add-btn',
				isDisabled: false,
				events: {
					click: (e: Event) => this.handleOpenModal(e),
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
				labelClassName: 'chat-label',
				labelText: 'Чат',
				labelId: 'title',
				input: new Input({
					className: 'modal-chat-input',
					name: 'title',
					value: '',
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
				? new Message({ chats: this.props.chats, msgDisplay: 'none' })
				: new Message({ chats: this.props.chats, msgDisplay: 'flex' }),
			currentChat: isChatSelected
				? new Chat({ chat: this.props.chat, mainDisplay: 'flex' })
				: new Chat({ chat: this.props.chat, mainDisplay: 'none' }),
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
				(this.children.chatItems as Block).setProps({
					chats,
				});
				(this.children.startMessage as Block).setProps({
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

	render() {
		this.initChildren();

		return this.compile(chatTmpl, {
			...this.props,
		});
	}
}

export { ChatList };
