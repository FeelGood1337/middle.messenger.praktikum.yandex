/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
// import isEqual from '../../utils/isEqualProps';
import store, { StoreEvents } from '../../utils/Store/Store';
import { Block } from '../../utils/Block/Block';
import router from '../../router';
import { Templator } from '../../utils/Template-engine/templater';
import { template } from './profile.tmpl';
import { itemsProps, btnsProps, avatarProps } from './itemsProps';

import { userController, authController } from '../../controllers';
import { AVATAR_URL } from '../../constants';
import { Title } from '../../components/Title/Title';
import { Input } from '../../components';
import { Avatar } from '../../components/Avatar/Avatar';
import { Items } from '../../components/Items/Items';
import { Element } from '../../components/Element/Element';
import { LinkButton } from '../../components/LinkButton/LinkButton';
import { Button } from '../../components';

import avatar from '../../../static/images/Avatar.svg';

import './profile.css';

interface IUser {
	id: number;
	avatar: string;
	display_name: string;
	email: string;
	first_name: string;
	second_name: string;
	login: string;
	phone: string;
}

type TSpec = {
	tag: string;
	className: string;
	content: string;
};

const profileTmpl = new Templator(template);

function getLinkButton(text: string, className: string, href: string) {
	return new LinkButton({
		text,
		className,
		href,
	}).render();
}

function getBtnItems() {
	return btnsProps.map(({ text, className, href }) =>
		new Items({
			className: 'fields-items__item item-btn',
			items: getLinkButton(text, className, href),
		}).render(),
	);
}

function getSpec({
	email,
	login,
	first_name,
	second_name,
	display_name,
	phone,
}: IUser): TSpec[][] {
	return [
		[
			{
				tag: 'p',
				className: 'profile-text profile-label__email',
				content: 'Почта',
			},
			{
				tag: 'p',
				className: 'profile-text profile-text_grey  profile-content__email',
				content: email,
			},
		],
		[
			{
				tag: 'p',
				className: 'profile-text profile-label__login',
				content: 'Логин',
			},
			{
				tag: 'p',
				className: 'profile-text profile-text_grey  profile-contents__login',
				content: login,
			},
		],
		[
			{
				tag: 'p',
				className: 'profile-text profile-label__name',
				content: 'Имя',
			},
			{
				tag: 'p',
				className: 'profile-text profile-text_grey  profile-content__name',
				content: first_name,
			},
		],
		[
			{
				tag: 'p',
				className: 'profile-text profile-label__second-name',
				content: 'Фамилия',
			},
			{
				tag: 'p',
				className: 'profile-text profile-text_grey  profile-content__second-name',
				content: second_name,
			},
		],
		[
			{
				tag: 'p',
				className: 'profile-text profile-label__chat-name',
				content: 'Имя в чате',
			},
			{
				tag: 'p',
				className: 'profile-text profile-text_grey  profile-content__chat-name',
				content: display_name === null ? 'Нет данных' : display_name,
			},
		],
		[
			{
				tag: 'p',
				className: 'profile-text profile-label__phone',
				content: 'Телефон',
			},
			{
				tag: 'p',
				className: 'profile-text profile-text_grey  profile-content__phone',
				content: phone,
			},
		],
	];
}

function getTextElement(itemsProps: TSpec[][]) {
	return itemsProps.map((arr) =>
		arr
			.map((el) => {
				return new Element({
					tag: el.tag,
					className: el.className,
					content: el.content,
				}).render().outerHTML;
			})
			.join(''),
	);
}

function getTextItems(itemsProps: TSpec[][]) {
	const items = getTextElement(itemsProps);
	return new Items({
		className: 'fields-items__item',
		items,
	}).render();
}

class ProfilePage extends Block {
	constructor() {
		super({
			profileSvgClass: 'profile-svg',
			title: new Title({
				tag: 'h2',
				className: 'profile-title',
				text: 'Сергей',
			}).render(),
			avatar: new Avatar({
				imgPath: avatar,
			}).render(),
			modalTitle: new Title({
				tag: 'h2',
				className: 'modal-title',
				text: 'Загрузите файл',
			}).render(),
			modalInputAvatar: new Input({
				className: avatarProps[0].className,
				attributes: avatarProps[0].attributes,
				name: avatarProps[0].name,
				value: ' ',
			}).render(),
			modalBtn: new Button({
				text: 'Загрузить',
				className: 'btn-modal',
				isDisabled: false,
			}).render(),
			items: getTextItems(itemsProps),
			btnItems: getBtnItems(),
		});

		userController.getUser();

		store.on(StoreEvents.UPDATE, () => {
			this.setProps(store.getState());
		});
	}

	private goToChat(event: Event): void {
		event?.preventDefault();
		router.go('/messenger');
	}

	private logoutClick(event: Event): void {
		event?.preventDefault();
		authController.logout();
	}

	private handleClickModal(modal: HTMLElement): void {
		modal.style.display = 'flex';
		window.onclick = (event: Event) => {
			if (event.target === modal) {
				modal.style.display = 'none';
			}
		};
	}

	private handleChangeAvatarInput(event: Event): void {
		const [file]: any = (<HTMLInputElement>event.target).files;
		const { name: fileName, size } = file;
		const fileSize = (size / Math.pow(1024, 2)).toFixed(2);
		const fileNameAndSize = `${fileName} - ${fileSize} MB`;
		(document.querySelector('.file-name') as HTMLParagraphElement).textContent =
			fileNameAndSize;
	}

	private handleUploadAvatar(event: Event): void {
		event?.preventDefault();
		const avatarInput: HTMLInputElement = document.querySelector(
			'#avatarInput',
		) as HTMLInputElement;
		const modal: HTMLElement = document.querySelector('#avatarModal') as HTMLElement;
		const formData = new FormData();
		formData.append('avatar', avatarInput.files![0]);

		userController
			.updateAvatar(formData)
			.then(({ avatar }) => {
				this.setProps({
					avatar: new Avatar({
						imgPath: `${AVATAR_URL}${avatar}`,
					}).render(),
				});
			})
			.catch((err) => {
				const { status } = err;

				if (status === 500) {
					router.go('/error');
				}
			});

		this.eventBus().emit(Block.EVENTS.FLOW_CDU);
		modal.style.display = 'none';
	}

	private handleUserInfoChange(event: Event): void {
		event?.preventDefault();
		router.go('/change-user-info');
	}

	private handleUserPasswordChange(event: Event): void {
		event?.preventDefault();
		router.go('/change-user-password');
	}

	componentDidMount(): void {
		userController.getUser().then((data: IUser) => {
			const { avatar } = data;
			if (avatar) {
				this.setProps({
					avatar: new Avatar({
						imgPath: `${AVATAR_URL}${avatar}`,
					}).render(),
					items: getTextItems(getSpec(data)),
				});
			} else {
				this.eventBus().emit(Block.EVENTS.FLOW_CDU);
			}
		});

		this.eventBus().on(Block.EVENTS.FLOW_RENDER, () => {
			const {
				element,
				goToChat,
				logoutClick,
				handleClickModal,
				handleChangeAvatarInput,
				handleUploadAvatar,
				handleUserInfoChange,
				handleUserPasswordChange,
			} = this;

			const avatarImg: HTMLImageElement = element.querySelector(
				'.avatar__img',
			) as HTMLImageElement;
			const avatarInput: HTMLInputElement = element.querySelector(
				'#avatarInput',
			) as HTMLInputElement;
			const modal: HTMLElement = element.querySelector(
				'#avatarModal',
			) as HTMLElement;
			const btnUploadAvatar: HTMLButtonElement = element.querySelector(
				'.btn-modal',
			) as HTMLButtonElement;

			const linkBtn: HTMLButtonElement = element.querySelector(
				'.profile-section-link',
			) as HTMLButtonElement;
			const userInfoBtn: HTMLButtonElement = element.querySelector(
				'.btn-user-info',
			) as HTMLButtonElement;
			const userPasswordBtn: HTMLButtonElement = element.querySelector(
				'.btn-user-password',
			) as HTMLButtonElement;
			const logOutBtn: HTMLButtonElement = element.querySelector(
				'.btn-logout',
			) as HTMLButtonElement;

			linkBtn.onclick = goToChat;
			logOutBtn.onclick = logoutClick;
			avatarImg.onclick = () => handleClickModal(modal);
			avatarInput.onchange = handleChangeAvatarInput;
			btnUploadAvatar.onclick = handleUploadAvatar.bind(this);
			userInfoBtn.onclick = handleUserInfoChange;
			userPasswordBtn.onclick = handleUserPasswordChange;
		});
	}

	render() {
		return profileTmpl.compile({ ...this.props }).getNode();
	}
}

export { ProfilePage };
