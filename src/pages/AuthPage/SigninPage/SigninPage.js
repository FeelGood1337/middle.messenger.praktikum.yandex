import { Templator } from "../../../utils/Template-engine/templater";
import { template } from "./signin.tmpl";
import { inputsProps } from "./inputProps";

import { LinkButton } from "../../../components/LinkButton/LinkButton";
import { InputWithLabel } from "../../../components/InputWithLabel/InputWithLabel";

import './signin.css';

const signinPageTmpl = new Templator(template);

class SigninPage {
	getInputs() {
		return inputsProps.map(({
				className,
				labelText,
				labelClassName,
				labelId,
				attributes,
				name,
				value
			}) =>
			new InputWithLabel({
				className,
				labelClassName,
				labelText,
				labelId,
				attributes,
				name,
				value
			}).render().outerHTML
		).join('');
	}

	getButton() {
		return new LinkButton({
			text: 'Войти',
			className: 'btn auth__btn',
			link: 'profile.html'
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