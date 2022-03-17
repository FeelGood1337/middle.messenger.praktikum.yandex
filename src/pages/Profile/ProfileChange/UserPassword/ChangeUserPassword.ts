/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Block } from '../../../../utils/Block/Block';
import { Templator } from '../../../../utils/Template-engine/templater';
import { template } from './userPassword.tmpl';
import { inputsProps } from './inputProps';

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

import { IUser } from '../../../../utils/Store/Store';
import router from '../../../../router';
import { userController } from '../../../../controllers';

const userPasswordTmpl = new Templator(template);
class ChangeUserPassword extends Block {
	private inputsValue: Record<string, string>;
	private validate: IInputValidate[];
	private form: IForm;

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

	componentDidMount(): void {
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
		const { state }: Record<string, IUser> = this.props;
		const { avatar } = state;

		return userPasswordTmpl
			.compile({
				profileSvgClass: 'profile-svg',
				title: new Title({
					tag: 'h2',
					className: 'auth__title signup__title',
					text: 'Изменить пароль',
				}).render(),
				avatar: new Avatar({
					imgPath: `${AVATAR_URL}${avatar}`,
				}).render(),
				button: new Button({
					text: 'Сохранить',
					className: 'signup__btn',
					isDisabled: true,
				}).render(),
				inputs: this.getInputs(),
			})
			.getNode();
	}
}

export { ChangeUserPassword };
