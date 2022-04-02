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
import {
	Input,
	Form as MainForm,
	LinkButton,
	BackBtn,
	Avatar,
	Title,
	InputWithLabel,
	Button,
} from '../../../../components';

import { IUser } from '../../../../utils/Store/Store';
import avaIcon from '../../../../../static/images/Avatar.svg';
import router from '../../../../router';
import { userController } from '../../../../controllers';

const userPasswordTmpl = new Templator(template);
class ChangeUserPassword extends Block {
	private inputsValue: Record<string, string>;
	private validate: IInputValidate[];
	private form: IForm;

	protected initChildren(): void {
		const { state }: Record<string, IUser> = this.props;
		const { avatar } = state;

		const avaImg = avatar ? `${AVATAR_URL}${avatar}` : avaIcon;

		this.children = {
			title: new Title({
				tag: 'h2',
				className: 'auth__title signup__title',
				text: 'Изменить пароль',
			}),
			avatar: new Avatar({
				imgPath: avaImg,
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
			backBtn: new BackBtn({
				href: '/settings',
				events: {
					click: (e: Event) => this.goToSettings(e),
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
		try {
			await userController.changePassword(this.inputsValue);
		} catch (error: any) {
			if (error.status > 200 && error.status !== 500) {
				this.inputsValue = {};
				const { inputs } = (this.children.form as Block).getChild() as {
					inputs: Block[];
				};
				inputs.forEach((el) => {
					(el.getChild().input as Block).setProps({
						value: '',
					});
				});
			} else if (error.status === 500) {
				router.go('/error');
			}
		}
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
