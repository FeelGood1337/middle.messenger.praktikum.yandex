import { Block } from '../../../utils/Block/Block';
import { Templator } from '../../../utils/Template-engine/templater';
import { template } from './signup.tmpl';
import { inputsProps } from './inputProps';

import { Form, IForm } from '../../../utils/form';
import { InputValidate, IInputValidate } from '../../../components/InputWithLabel/InputValidate';
import { Title } from '../../../components/Title/Title';
import { Button } from '../../../components/Button/Button';
import { LinkButton } from '../../../components/LinkButton/LinkButton';
import { InputWithLabel } from '../../../components/InputWithLabel/InputWithLabel';

import './signup.css';


const signUpTmpl = new Templator(template);
class SignupPage extends Block {
	inputsValue: { [key: string]: string };
	validate: IInputValidate[];
	form: IForm;

	constructor() {
		super({
			title: new Title({
				tag: 'h2',
				className: 'auth__title signup__title',
				text: 'Регистрация',
			}).render(),
			button: new Button({
				text: 'Зарегистрировать',
				className: 'signup__btn',
				isDisabled: true,
			}).render(),
			linkButton: new LinkButton({
				text: 'Войти',
				className: 'signup__btn-link',
				link: 'index.html',
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
			labelClassName,
			labelText,
			labelId,
			attributes,
			name,
			handleBlur
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
			}).render().outerHTML
		}).join('');
	}

	private getInputsValue(): void {
		this.form.saveValue(<HTMLInputElement>event?.target, this.inputsValue);
	}

	private handleClick(event: Event): void {
		event.preventDefault();
		console.log(this.inputsValue);
	}

	componentDidMount(): void {
		this.eventBus().on(Block.EVENTS.FLOW_RENDER, () => {
			const { element, validate, getInputsValue, handleClick } = this;

			const formContainer: HTMLFormElement = element.querySelector('.auth__form')!;
			const formButton: HTMLButtonElement = element.querySelector('.signup__btn')!;
			const inputs: NodeListOf<HTMLInputElement> = element.querySelectorAll('.input');

			this.form = new Form(formContainer, formButton);

			inputs.forEach((input, index) => {
				(input as HTMLInputElement).onfocus = validate[index].handleFocus;
				(input as HTMLInputElement).onblur = validate[index].handleBlur;
			});

			formContainer.onchange = getInputsValue.bind(this);
			formContainer.oninput = this.form.formIsValid;
			formButton.onclick = handleClick.bind(this);
		});
	}

	render() {
		const { title, button, linkButton } = this.props;

		return signUpTmpl.compile({
			title,
			button,
			linkButton,
			inputs: this.getInputs(),
		}).getNode();
	}
}

export {
	SignupPage
};