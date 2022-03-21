/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Block } from '../../utils/Block/Block';
import router from '../../router';
import { Templator } from '../../utils/Template-engine/templater';
import { template } from './chat.tmpl';

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
import addIcon from '../../../static/images/add.svg';
import { IUser } from '../../utils/Store/Store';
import { AVATAR_URL, EMPTY_CHATS, NO_SELECTED_CHAT } from '../../constants';
import { chatController } from '../../controllers';
import { Form, IForm } from '../../utils/form';
import { IChats } from '../../API/chat-api';

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
class Chat extends Block {
	private static inputsValue: Record<string, string>;
	private static form: IForm;
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
				(el: IChats) => `
			<li class="chat-item" data-chat-id="${el.id}">
				<img 
					class="avatar-svg__item" 
					src="${AVATAR_URL}${el.avatar}"
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
		Chat.inputsValue = Chat.inputsValue || {};

		return inputsProps
			.map(
				({ className, labelText, labelClassName, labelId, attributes, name }) => {
					const value = Chat.inputsValue[name]
						? `value="${Chat.inputsValue[name]}"`
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

		await chatController.createChat(Chat.inputsValue).finally(() => {
			Chat.inputsValue = {};
		});

		modal.style.display = 'none';
	}

	private getInputsValue(): void {
		Chat.form.saveValue(<HTMLInputElement>event?.target, Chat.inputsValue);
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

			Chat.form = new Form(formContainer, createChatBtn);

			const listLi = [
				...(element
					.querySelector('#chats-wrapper')
					?.getElementsByTagName('li') as HTMLCollectionOf<HTMLLIElement>),
			];

			listLi.map((el: HTMLLIElement) => {
				el.addEventListener('click', (event) => {
					const { currentTarget } = event;
					const chatId = (currentTarget as HTMLElement).dataset.chatId;
					console.log(chatId);
				});
			});

			formContainer.onchange = getInputsValue.bind(this);
			createChatBtn.onclick = handleClickCreateChat.bind(this);

			linkBtn.onclick = goToProfile;
			addChatBtn.onclick = () => handleClickModal(modal);
		});
	}

	render() {
		const { state }: Record<string, IUser> = this.props;
		const { avatar, chats } = state;

		console.log(state);

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
				avaChatPath: `${AVATAR_URL}${avatar}`,
				name: 'Segey Vlasov',
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

export { Chat };
