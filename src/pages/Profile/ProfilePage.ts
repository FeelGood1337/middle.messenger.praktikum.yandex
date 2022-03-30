/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
// import isEqual from '../../utils/isEqualProps';
import { IUser } from '../../utils/Store/Store';
import { Block } from '../../utils/Block/Block';
import router from '../../router';
import { Templator } from '../../utils/Template-engine/templater';
import { template } from './profile.tmpl';
import { btnsProps, avatarProps } from './itemsProps';

import { userController, authController } from '../../controllers';
import { AVATAR_URL } from '../../constants';
import { Title, Input, Avatar, Items, LinkButton, Button } from '../../components';

import './profile.css';
import isEqual from '../../utils/isEqualProps';

const profileTmpl = new Templator(template);

function getTextItems(state: IUser) {
	const { email, login, first_name, second_name, display_name, phone } = state;
	const obj = [
		{
			content: email,
			contentName: 'Почта',
			forClass: 'email',
		},
		{
			content: login,
			contentName: 'Логин',
			forClass: 'login',
		},
		{
			content: first_name,
			contentName: 'Имя',
			forClass: 'name',
		},
		{
			content: second_name,
			contentName: 'Фамилия',
			forClass: 'second_name',
		},
		{
			content: display_name === null ? 'Нет данных' : display_name,
			contentName: 'Имя в чате',
			forClass: 'chat-name',
		},
		{
			content: phone,
			contentName: 'Телефон',
			forClass: 'phone',
		},
	];
	return obj.map(
		(el) =>
			new Items({
				className: 'fields-items__item',
				items: `
					<p class="profile-text profile-label__${el.forClass}">${el.contentName}</p>
					<p class="profile-text profile-text_grey  profile-content__${el.forClass}">${el.content}</p>
				`,
			}),
	);
}

class ProfilePage extends Block {
	protected initChildren(): void {
		const { state }: Record<string, IUser> = this.props;
		console.log(state);
		const { avatar, first_name, second_name } = state;

		this.children = {
			title: new Title({
				tag: 'h2',
				className: 'profile-title',
				text: `${first_name} ${second_name}`,
			}),
			avatar: new Avatar({
				imgPath: `${AVATAR_URL}${avatar}`,
				events: {
					click: () => this.handleClickModal(),
				},
			}),
			modalTitle: new Title({
				tag: 'h2',
				className: 'modal-title',
				text: 'Загрузите файл',
			}),
			modalInputAvatar: new Input({
				className: avatarProps[0].className,
				attributes: avatarProps[0].attributes,
				name: avatarProps[0].name,
				value: ' ',
				events: {
					change: (e: Event) => this.handleChangeAvatarInput(e),
				},
			}),
			modalBtn: new Button({
				text: 'Загрузить',
				className: 'btn btn-modal',
				isDisabled: false,
				events: {
					click: (e: Event) => this.handleUploadAvatar(e),
				},
			}),
			items: getTextItems(state),
			btnChangeInfo: new LinkButton({
				text: 'Изменить данные',
				className: 'btn-item btn-user-info btn-item_accent',
				href: '/settings/change-user-info',
				hasSvgIcon: false,
				events: {
					click: (e: Event) => this.handleUserInfoChange(e),
				},
			}),
			btnChangePassword: new LinkButton({
				className: 'btn-item btn-user-password btn-item_accent',
				text: 'Изменить пароль',
				href: '/settings/change-user-password',
				hasSvgIcon: false,
				events: {
					click: (e: Event) => this.handleUserPasswordChange(e),
				},
			}),
			btnLogout: new LinkButton({
				className: 'btn-item btn-logout btn-item_red',
				text: 'Выйти',
				href: '/',
				hasSvgIcon: false,
				events: {
					click: (e: Event) => this.logoutClick(e),
				},
			}),
		};
	}

	private goToChat(event: Event): void {
		event?.preventDefault();
		router.go('/messenger');
	}

	private async logoutClick(event: Event): Promise<void> {
		event?.preventDefault();
		await authController.logout();
	}

	private handleUserInfoChange(event: Event): void {
		event?.preventDefault();
		router.go('/settings/change-user-info');
	}

	private handleUserPasswordChange(event: Event): void {
		event?.preventDefault();
		router.go('/settings/change-user-password');
	}

	private handleClickModal(): void {
		const modal: HTMLElement = document.querySelector('#avatarModal') as HTMLElement;
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

	private async handleUploadAvatar(event: Event): Promise<void> {
		event?.preventDefault();
		const avatarInput: HTMLInputElement = document.querySelector(
			'#avatarInput',
		) as HTMLInputElement;
		const modal: HTMLElement = document.querySelector('#avatarModal') as HTMLElement;
		const formData = new FormData();
		formData.append('avatar', avatarInput.files![0]);

		await userController.updateAvatar(formData);

		modal.style.display = 'none';
	}

	componentDidUpdate(
		oldProps: Record<string, any>,
		newProps: Record<string, any>,
	): boolean {
		return !isEqual(oldProps, newProps);
	}

	render() {
		this.initChildren();
		return this.compile(profileTmpl, {
			...this.props,
			profileSvgClass: 'profile-svg',
		});
	}
}

export { ProfilePage };
