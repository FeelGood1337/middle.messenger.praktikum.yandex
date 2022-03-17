/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Block } from '../../../../utils/Block/Block';
import { Templator } from '../../../../utils/Template-engine/templater';
import { template } from './userPassword.tmpl';
import { inputsProps } from './inputProps';

import { AuthAPI } from '../../../../API/auth-api';
import { UserAPI } from '../../../../API/user-api';
import { AVATAR_URL } from '../../../../constants';
import { Form, IForm } from '../../../../utils/form';
import {
	InputValidate,
	IInputValidate,
} from '../../../../components/InputWithLabel/InputValidate';
import { Avatar } from '../../../../components/Avatar/Avatar';
import { Title } from '../../../../components/Title/Title';
import { InputWithLabel } from '../../../../components/InputWithLabel/InputWithLabel';
import { Button } from '../../../../components/Button/Button';

import avatar from '../../../../../static/images/Avatar.svg';
import router from '../../../../router';
import { userController } from '../../../../controllers';
import store, { IUser } from '../../../../utils/Store/Store';

const userPasswordTmpl = new Templator(template);
const authApi = new AuthAPI();
const userApi = new UserAPI();
class ChangeUserPassword extends Block {
	inputsValue: { [key: string]: string };
	validate: IInputValidate[];
	form: IForm;

	constructor() {
		super({
			profileSvgClass: 'profile-svg',
			title: new Title({
				tag: 'h2',
				className: 'auth__title signup__title',
				text: 'Изменить пароль',
			}).render(),
			avatar: new Avatar({
				link: 'profile.html',
				imgPath: avatar,
			}).render(),
			button: new Button({
				text: 'Сохранить',
				className: 'signup__btn',
				isDisabled: true,
			}).render(),
		});
	}

	private getInputs() {
		this.inputsValue = this.inputsValue || {};
		this.validate = this.validate || [];

		return inputsProps
			.map(
				({
					className,
					labelClassName,
					labelText,
					labelId,
					attributes,
					name,
					handleBlur,
				}) => {
					const value = this.inputsValue[name]
						? `value="${this.inputsValue[name]}"`
						: ' ';
					this.validate.push(new InputValidate(handleBlur));

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

	private getInputsValue(): void {
		this.form.saveValue(<HTMLInputElement>event?.target, this.inputsValue);
	}

	private async handleClick(event: Event): Promise<void> {
		event.preventDefault();
		await userController.changePassword(this.inputsValue).finally(() => {
			this.inputsValue = {};
		});
	}

	private goToSettings(event: Event): void {
		event?.preventDefault();
		router.go('/settings');
	}

	private async renderUpdateOnMount(): Promise<void> {
		const { user }: Record<string, IUser> = await store.getState();
		const { avatar } = user;
		if (avatar) {
			this.setProps({
				avatar: new Avatar({
					imgPath: `${AVATAR_URL}${avatar}`,
				}).render(),
			});
		} else {
			this.eventBus().emit(Block.EVENTS.FLOW_CDU);
		}
	}

	componentDidMount(): void {
		this.renderUpdateOnMount();
		this.eventBus().on(Block.EVENTS.FLOW_RENDER, () => {
			const { element, validate, getInputsValue, handleClick, goToSettings } = this;

			const formContainer: HTMLFormElement = element.querySelector('.auth__form')!;
			const formButton: HTMLButtonElement = element.querySelector('.signup__btn')!;
			const inputs: NodeListOf<HTMLInputElement> =
				element.querySelectorAll('.input');

			const linkBtn: HTMLButtonElement = element.querySelector(
				'.profile-section-link',
			) as HTMLButtonElement;

			this.form = new Form(formContainer, formButton);

			inputs.forEach((input, index) => {
				(input as HTMLInputElement).onfocus = validate[index].handleFocus;
				(input as HTMLInputElement).onblur = validate[index].handleBlur;
			});

			formContainer.onchange = getInputsValue.bind(this);
			formContainer.oninput = this.form.formIsValid;
			formButton.onclick = handleClick.bind(this);
			linkBtn.onclick = goToSettings;
		});
	}

	render() {
		const { profileSvgClass, title, avatar, button } = this.props;
		return userPasswordTmpl
			.compile({
				profileSvgClass,
				title,
				avatar,
				button,
				inputs: this.getInputs(),
			})
			.getNode();
	}
}

export { ChangeUserPassword };
