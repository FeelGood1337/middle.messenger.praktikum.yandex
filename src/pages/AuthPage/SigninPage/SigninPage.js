import {
	Templator
} from "../../../utils/Template-engine/templater";
import {
	template
} from "./signin.tmpl";
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

import './signin.css';

const signinPageTmpl = new Templator(template);

class SigninPage {
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
			text: 'Войти',
			className: 'auth__btn',
			isDisabled: true
		}).render();
	}


	getLinkButton() {
		return new LinkButton({
			text: 'Регистрация',
			className: 'auth__btn-link',
			link: 'signup.html'
		}).render();
	}


	render() {
		return signinPageTmpl.getNode({
			titleText: 'Вход',
			inputs: this.getInputs(),
			button: this.getButton(),
			linkButton: this.getLinkButton()
		});
	}
}

export {
	SigninPage
};