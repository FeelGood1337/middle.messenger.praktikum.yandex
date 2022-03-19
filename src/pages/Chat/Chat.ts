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

	private async handleClickCreateChat(event: Event) {
		event.preventDefault();
		// await chatController.createChat();
		console.log(Chat.inputsValue);
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

	private handleClickOpenAddChatModal() {
		const { element, handleClickCreateChat, getInputsValue } = this;
		const modal: HTMLElement = element.querySelector(
			'#createChatModal',
		) as HTMLElement;
		modal.style.display = 'flex';

		const createChatBtn: HTMLButtonElement = element.querySelector(
			'.btn-modal__create-chat',
		) as HTMLButtonElement;
		const formContainer: HTMLFormElement = element.querySelector(
			'.auth__form',
		) as HTMLFormElement;

		Chat.form = new Form(formContainer, createChatBtn);

		formContainer.onchange = getInputsValue.bind(this);
		createChatBtn.onclick = handleClickCreateChat;

		window.onclick = (event: Event) => {
			if (event.target === modal) {
				modal.style.display = 'none';
			}
		};
	}

	private getInputsValue(): void {
		Chat.form.saveValue(<HTMLInputElement>event?.target, Chat.inputsValue);
	}

	componentDidMount(): void {
		this.eventBus().on(Block.EVENTS.FLOW_RENDER, () => {
			const { element, goToProfile, handleClickOpenAddChatModal } = this;

			const linkBtn: HTMLButtonElement = element.querySelector(
				'.section-caht-list__link-btn',
			) as HTMLButtonElement;
			const addChatBtn: HTMLButtonElement = element.querySelector(
				'.chat-add-btn',
			) as HTMLButtonElement;

			linkBtn.onclick = goToProfile;
			addChatBtn.onclick = handleClickOpenAddChatModal.bind(this);
		});
	}

	render() {
		const { state }: Record<string, IUser> = this.props;
		const { avatar, display_name } = state;

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
				startMessage: display_name === 'svlasov' ? EMPTY_CHATS : NO_SELECTED_CHAT,
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
			})
			.getNode();
	}
}

export { Chat };
