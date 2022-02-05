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
	Input
} from "../../../components/Input/Input";

import './signin.css';

const signinPageTmpl = new Templator(template);

class SigninPage {

	constructor() {
		
	}

	getInputs() {
		return inputsProps.map(({
				name,
				className,
				attributes,
				value
			}) =>
			new Input({
				name,
				className,
				attributes,
				value
			}).render().outerHTML
		).join('');
	}

	getButton() {
		return new Button({
			text: 'Войти',
			className: 'auth__btn',
			disabled: "disabled=false"
		}).render();
	}


	getLinkButton() {
		return new LinkButton({
			text: 'Регистрация',
			className: 'auth__btn-link',
			link: 'sigup'
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