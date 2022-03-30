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
import { Input, Form as MainForm, LinkButton } from '../../../../components';

const userPasswordTmpl = new Templator(template);
class ChangeUserPassword extends Block {
	private inputsValue: Record<string, string>;
	private validate: IInputValidate[];
	private form: IForm;

	protected initChildren(): void {
		const { state }: Record<string, IUser> = this.props;
		const { avatar } = state;

		this.children = {
			title: new Title({
				tag: 'h2',
				className: 'auth__title signup__title',
				text: 'Изменить пароль',
			}),
			avatar: new Avatar({
				imgPath: `${AVATAR_URL}${avatar}`,
			}),
			form: new MainForm({
				button: new Button({
					text: 'Сохранить',
					className: 'btn signup__btn',
					isDisabled: true,
					events: {
						click: (e: Event) => this.handleClick(e),
					},
				}),
				linkButton: new LinkButton({
					text: ' ',
					className: 'hiden',
					href: ' ',
					hasSvgIcon: false,
				}),
				inputs: this.getInputs(),
				events: {
					change: () => this.getInputsValue(),
					input: () => this.form.formIsValid(),
				},
			}),
		};
	}

	private getInputs() {
		this.inputsValue = this.inputsValue || {};
		this.validate = this.validate || [];

		return inputsProps.map(
			(
				{
					className,
					labelText,
					labelClassName,
					labelId,
					attributes,
					name,
					handleBlur,
				},
				index: number,
			) => {
				const value = this.inputsValue[name]
					? `value="${this.inputsValue[name]}"`
					: ' ';
				this.validate.push(new InputValidate(handleBlur));
				const vlArr = [...this.validate];

				return new InputWithLabel({
					labelClassName,
					labelText,
					labelId,
					input: new Input({
						className,
						attributes,
						name,
						value,
						events: {
							blur: (e: Event) => vlArr[index].handleBlur(e),
							focus: () => vlArr[index].handleFocus(),
						},
					}),
				});
			},
		);
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
		this.form = new Form(
			this.children.form as Block,
			(this.children.form as any).children.button,
		);
	}

	render() {
		return this.compile(userPasswordTmpl, {
			...this.props,
			profileSvgClass: 'profile-svg',
		});
	}
}

export { ChangeUserPassword };
