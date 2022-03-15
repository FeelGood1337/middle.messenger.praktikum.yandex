/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Block } from '../../utils/Block/Block';
import router from '../../router';
import { Templator } from '../../utils/Template-engine/templater';
import { template } from './profile.tmpl';
import { itemsProps, btnsProps, avatarProps } from './itemsProps';

import { AVATAR_URL } from '../../constants';
import { AuthAPI } from '../../API/auth-api';
import { UserAPI } from '../../API/user-api';
import { Title } from '../../components/Title/Title';
import { Input } from '../../components';
import { Avatar } from '../../components/Avatar/Avatar';
import { Items } from '../../components/Items/Items';
import { Element } from '../../components/Element/Element';
import { LinkButton } from '../../components/LinkButton/LinkButton';
import { Button } from '../../components';

import avatar from '../../../static/images/Avatar.svg';

import './profile.css';

const profileTmpl = new Templator(template);
const authApi = new AuthAPI();
const userApi = new UserAPI();

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

function getTextElement() {
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

function getTextItems() {
	const items = getTextElement();
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
			items: getTextItems(),
			btnItems: getBtnItems(),
		});
	}

	private goToChat(event: Event): void {
		event?.preventDefault();
		router.go('/messenger');
	}

	private logoutClick(event: Event): void {
		event?.preventDefault();

		authApi
			.logout()
			.then(() => router.go('/'))
			.catch(() => router.go('/error'));
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

		userApi
			.avatar(formData)
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
		authApi
			.getUser()
			.then(({ avatar }) => ({
				avatar,
			}))
			.then(({ avatar }) => {
				if (avatar) {
					this.setProps({
						avatar: new Avatar({
							imgPath: `${AVATAR_URL}${avatar}`,
						}).render(),
					});
				} else {
					this.eventBus().emit(Block.EVENTS.FLOW_CDU);
				}
			})
			.catch((err) => {
				const { status } = err;

				if (status === 401) {
					router.go('/');
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
