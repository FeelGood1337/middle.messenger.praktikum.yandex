import { Block } from '../../../utils/Block/Block';
import { Templator } from '../../../utils/Template-engine/templater';
import router from '../../../router';
import { template } from './signin.tmpl';
import { inputsProps } from './inputProps';

import { Form, IForm } from '../../../utils/form';
import { Button } from '../../../components/Button/Button';
import { LinkButton } from '../../../components/LinkButton/LinkButton';
import { InputWithLabel } from '../../../components/InputWithLabel/InputWithLabel';
import { InputValidate, IInputValidate } from '../../../components/InputWithLabel/InputValidate';
import { Title } from '../../../components/Title/Title';

import './signin.css';

const signInTmpl = new Templator(template);
class SigninPage extends Block {
	inputsValue: { [key: string]: string };
	validate: IInputValidate[];
	form: IForm;

	constructor() {
		super({
			title: new Title({
				tag: 'h2',
				className: 'auth__title',
				text: 'Вход',
			}).render(),
			button: new Button({
				text: 'Войти',
				className: 'btn auth__btn',
				isDisabled: true,
			}).render(),
			linkButton: new LinkButton({
				text: 'Регистрация',
				className: 'auth__btn-link',
			}).render(),
		});

		this.inputsValue;
		this.form;
		this.validate = [];
	}

	private getInputs() {
		this.inputsValue = this.inputsValue || {};
		this.validate = this.validate || [];

		return inputsProps.map(({
			className,
			labelText,
			labelClassName,
			labelId,
			attributes,
			name,
			handleBlur,
		}) => {
			const value = this.inputsValue[name] ? `value="${this.inputsValue[name]}"` : ' ';
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
		}).join('');
	}

	private getInputsValue(): void {
		this.form.saveValue(<HTMLInputElement>event?.target, this.inputsValue);
	}

	private handleClick(event: Event): void {
		event?.preventDefault();
		console.log(this.inputsValue);
	}

	private goToSignup(event: Event): void {
		event?.preventDefault();
		router.go('/sign-up');
	}

	componentDidMount(): void {
		this.eventBus().on(Block.EVENTS.FLOW_RENDER, () => {
			const { element, validate, getInputsValue, handleClick } = this;

			const formContainer: HTMLFormElement = element.querySelector('.auth__form')!;
			const formButton: HTMLButtonElement = element.querySelector('.auth__btn')!;
			const inputs: NodeListOf<HTMLInputElement> = element.querySelectorAll('.input');
			const linkBtn: HTMLButtonElement = element.querySelector('.auth__btn-link') as HTMLButtonElement;

			this.form = new Form(formContainer, formButton);

			inputs.forEach((input, index) => {
				(input as HTMLInputElement).onfocus = validate[index].handleFocus;
				(input as HTMLInputElement).onblur = validate[index].handleBlur;
			});

			formContainer.onchange = getInputsValue.bind(this);
			formContainer.oninput = this.form.formIsValid;
			formButton.onclick = handleClick.bind(this);
			linkBtn.onclick = this.goToSignup;
		})
	}

	render() {
		const { title, button, linkButton } = this.props;
		return signInTmpl.compile({
			title,
			button,
			linkButton,
			inputs: this.getInputs(),
		}).getNode();
	}
}

export {
	SigninPage
};