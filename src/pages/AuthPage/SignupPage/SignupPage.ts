/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Block } from '../../../utils/Block/Block';
import router from '../../../router';
import { Templator } from '../../../utils/Template-engine/templater';
import { template } from './signup.tmpl';
import { inputsProps } from './inputProps';

import { authController } from '../../../controllers';
import { Form, IForm } from '../../../utils/form';
import {
	InputValidate,
	IInputValidate,
} from '../../../components/InputWithLabel/InputValidate';
import {
	Title,
	Form as MainForm,
	Button,
	LinkButton,
	InputWithLabel,
	Input,
} from '../../../components';
import backArrowIcon from '../../../../static/images/linkButton.svg';

import './signup.css';

const signUpTmpl = new Templator(template);

class SignupPage extends Block {
	inputsValue: Record<string, string>;
	validate: IInputValidate[];
	form: IForm;

	constructor() {
		super();

		this.inputsValue;
		this.form;
		this.validate = [];
	}

	protected initChildren(): void {
		this.children = {
			title: new Title({
				tag: 'h2',
				className: 'auth__title signup__title',
				text: 'Регистрация',
			}),
			form: new MainForm({
				button: new Button({
					text: 'Зарегистрировать',
					className: 'btn signup__btn',
					isDisabled: true,
					events: {
						click: (e: Event) => this.handleClick(e),
					},
				}),
				linkButton: new LinkButton({
					text: 'Войти',
					className: 'signup__btn-link',
					href: '/',
					svgIcon: backArrowIcon,
					hasSvgIcon: true,
					events: {
						click: (e: Event) => this.goToSignin(e),
					},
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
		await authController.signUp(this.inputsValue).finally(() => {
			this.inputsValue = {};
		});
	}

	private goToSignin(event: Event): void {
		event?.preventDefault();
		router.go('/');
	}

	componentDidMount(): void {
		this.form = new Form(this.children.form, this.children.form.children.button);
	}

	render() {
		return this.compile(signUpTmpl, {});
	}
}

export { SignupPage };
