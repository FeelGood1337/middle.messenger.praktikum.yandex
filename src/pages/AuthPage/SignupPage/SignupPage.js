import {
	Templator
} from "../../../utils/Template-engine/templater";

import {
	template
} from './signup.tmpl';

import {
	inputsProps
} from "./inputProps";

import {
	Button
} from "../../../components/Button/Button";

import {
	LinkButton
} from "../../../components/LinkButton/LinkButton";

import {
	InputWithLabel
} from "../../../components/InputWithLabel/InputWithLabel";

import './signup.css';

const signupPageTmpl = new Templator(template);

class SignupPage {
	getInputs() {
		return inputsProps.map(({
				className,
				labelText,
				labelId,
				attributes,
				name,
				value
			}) =>
			new InputWithLabel({
				className,
				labelText,
				labelId,
				attributes,
				name,
				value
			}).render().outerHTML
		).join('');
	}

	getButton() {
		return new Button({
			text: 'Зарегистрировать',
			className: 'signup__btn',
			isDisabled: true
		}).render();
	}


	getLinkButton() {
		return new LinkButton({
			text: 'Войти',
			className: 'signup__btn-link',
			link: 'index.html'
		}).render();
	}

	render() {
		return signupPageTmpl.getNode({
			titleText: 'Регистрация',
			inputs: this.getInputs(),
			button: this.getButton(),
			linkButton: this.getLinkButton()
		});
	}
}

export {
	SignupPage
};