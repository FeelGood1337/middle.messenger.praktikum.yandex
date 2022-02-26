import { Block } from '../../../utils/Block/Block';
import { Templator } from '../../../utils/Template-engine/templater';
import { template } from './signin.tmpl';
import { inputsProps } from './inputProps';

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
				disabled: ' ',
			}).render(),
			linkButton: new LinkButton({
				text: 'Регистрация',
				className: 'auth__btn-link',
				link: 'signup.html',
			}).render(),
		});

		this.inputsValue;
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

	componentDidMount(): void {
		this.eventBus().on(Block.EVENTS.FLOW_RENDER, () => {
			const { element } = this;
			const inputs = element.querySelectorAll('.input');
			const formButton: any = element.querySelector('.auth__btn');
		})
	}

	render() {
		// return this.compile(template, { ...this.props });
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