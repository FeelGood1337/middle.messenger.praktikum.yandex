/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Block } from '../../utils/Block/Block';
import router from '../../router';
import { Templator } from '../../utils/Template-engine/templater';
import { template } from './chatList.tmpl';

import {
	AvatarMini,
	Button,
	InputWithLabel,
	LinkButton,
	Title,
} from '../../components/index';

import kebabIcon from '../../../static/images/kebab-menu.svg';
import clipIcon from '../../../static/images/clip.svg';
import sendIcon from '../../../static/images/send-btn.svg';
import backArrowIcon from '../../../static/images/linkButton.svg';
import avatarIcon from '../../../static/images/Avatar.svg';
import addIcon from '../../../static/images/add.svg';
import { IUser } from '../../utils/Store/Store';
import { AVATAR_URL, EMPTY_CHATS, NO_SELECTED_CHAT } from '../../constants';
import { chatController } from '../../controllers';
import { Form, IForm } from '../../utils/form';
import { IChats } from '../../API/chat-api';
import { hideSpinner, showSpinner } from '../../utils/spinner';

interface IProps {
	state: IUser;
	router: typeof router;
}

const inputsProps = [
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

const chatTmpl = new Templator(template);
class ChatList extends Block {
	private inputsValue: Record<string, string>;
	private form: IForm;

	private goToProfile(event: Event): void {
		event?.preventDefault();
		router.go('/settings');
	}

	private handleClickModal(modal: HTMLElement): void {
		modal.style.display = 'flex';
		window.onclick = (event: Event) => {
			if (event.target === modal) {
				modal.style.display = 'none';
			}
		};
	}

	private getChatsList(chats: IChats[]) {
		return chats
			.map(
				(el: IChats, index: number) => `
			<li class="chat-item" data-chat-id="${el.id}" data-chat-index="${index}">
				<img 
					class="avatar-svg__item" 
					src="${!el.avatar ? avatarIcon : AVATAR_URL + el.avatar}"
					alt="avatar chat list"
					width="32px"
					height="32px"
				/>
				<div class="item__content-wrapper">
					<div class="item__name">${el.title}</div>
					<p class="item__para">
						${el.last_message}
					</p>
				</div>
				<div class="item__date-wrapper">
					<div class="date">${el.created_by}</div>
				</div>
			</li>
		`,
			)
			.join('');
	}

	private getInputs(): string {
		this.inputsValue = this.inputsValue || {};

		return inputsProps
			.map(
				({ className, labelText, labelClassName, labelId, attributes, name }) => {
					const value = this.inputsValue[name]
						? `value="${this.inputsValue[name]}"`
						: ' ';

					return new InputWithLabel({
						className,
						labelClassName,
						labelText,
						labelId,
						attributes,
						name,
						value,
					}).render().outerHTML;
				},
			)
			.join('');
	}

	private async handleClickCreateChat(event: Event): Promise<any> {
		event.preventDefault();

		const { element } = this;
		const modal: HTMLElement = element.querySelector(
			'#createChatModal',
		) as HTMLElement;

		modal.style.display = 'flex';

		await chatController.createChat(this.inputsValue).finally(() => {
			this.inputsValue = {};
		});

		modal.style.display = 'none';
	}

	private getInputsValue(): void {
		this.form.saveValue(<HTMLInputElement>event?.target, this.inputsValue);
	}

	private async handleGetToken(id: string): Promise<void> {
		// showSpinner();
		await chatController.getToken(id);
		// hideSpinner();
	}

	private handleSelectChat(chatIndex: string) {
		const { state }: Record<string, IUser> = this.props;
		const { chats } = state;
		const { id } = chats![parseInt(chatIndex)];

		router.go(`/messenger/${id}`);

		const messageMain: HTMLElement = document.querySelector(
			'.message-main',
		) as HTMLElement;
		const emptyMessage: HTMLElement = document.querySelector(
			'.message__wrapper',
		) as HTMLElement;
		emptyMessage.style.display = 'none';
		messageMain.style.display = 'flex';
	}

	componentDidMount(): void {
		this.eventBus().on(Block.EVENTS.FLOW_RENDER, () => {
			const {
				element,
				goToProfile,
				getInputsValue,
				handleClickCreateChat,
				handleClickModal,
			} = this;

			const modal: HTMLElement = element.querySelector(
				'#createChatModal',
			) as HTMLElement;
			const linkBtn: HTMLButtonElement = element.querySelector(
				'.section-caht-list__link-btn',
			) as HTMLButtonElement;
			const addChatBtn: HTMLButtonElement = element.querySelector(
				'.chat-add-btn',
			) as HTMLButtonElement;

			const createChatBtn: HTMLButtonElement = element.querySelector(
				'.btn-modal__create-chat',
			) as HTMLButtonElement;
			const formContainer: HTMLFormElement = element.querySelector(
				'.auth__form',
			) as HTMLFormElement;

			this.form = new Form(formContainer, createChatBtn);

			const listLi = [
				...(element
					.querySelector('#chats-wrapper')
					?.getElementsByTagName('li') as HTMLCollectionOf<HTMLLIElement>),
			];

			listLi.map((el: HTMLLIElement) => {
				el.addEventListener('click', async (event) => {
					const { currentTarget } = event;
					const chatId = (currentTarget as HTMLLIElement).dataset.chatId;
					const chatIndex = (currentTarget as HTMLLIElement).dataset.chatIndex;
					await this.handleGetToken(chatId as string);
					this.handleSelectChat(chatIndex as string);
				});
			});

			formContainer.onchange = getInputsValue.bind(this);
			createChatBtn.onclick = handleClickCreateChat.bind(this);

			linkBtn.onclick = goToProfile;
			addChatBtn.onclick = () => handleClickModal(modal);
		});
	}

	render() {
		const { state, router }: IProps = this.props as IProps;
		const { avatar, chats } = state;
		const { chatId } = router.getParams();
		const currentChat = chats?.filter((el: IChats) => el.id === parseInt(chatId));
		const [chat] = currentChat as IChats[];

		console.log(chatId);

		return chatTmpl
			.compile({
				linkButtonAddChat: addIcon,
				linkButton: new LinkButton({
					text: 'Профиль',
					className: 'section-caht-list__link-btn',
					href: '/settings',
					svgIcon: backArrowIcon,
					hasSvgIcon: true,
				}).render(),
				avatarMini: new AvatarMini({
					imgPath: `${AVATAR_URL}${avatar}`,
					width: '32',
					height: '32',
				}).render(),
				name: chat !== undefined ? chat.title : '<div class="hiden"></div>',
				kebab: kebabIcon,
				clip: clipIcon,
				send: sendIcon,
				startMessage:
					chats === undefined || !chats.length ? EMPTY_CHATS : NO_SELECTED_CHAT,
				modalTitle: new Title({
					tag: 'h2',
					className: 'modal-title',
					text: 'Укажите название чата',
				}).render(),
				modalInput: this.getInputs(),
				modalBtn: new Button({
					text: 'Создать',
					className: 'btn-modal btn-modal__create-chat',
					isDisabled: false,
				}).render(),
				chatItems: chats?.length
					? this.getChatsList(chats)
					: '<div class="hiden"></div>',
			})
			.getNode();
	}
}

export { ChatList };
