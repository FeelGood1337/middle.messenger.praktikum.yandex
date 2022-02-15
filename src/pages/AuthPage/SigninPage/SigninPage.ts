import { Block } from '../../../utils/Block/Block';
import { Templator } from '../../../utils/Template-engine/templater';
import { template } from './signin.tmpl';
import { inputsProps } from './inputProps';

import { LinkButton } from '../../../components/LinkButton/LinkButton';
import { InputWithLabel } from '../../../components/InputWithLabel/InputWithLabel';
import { Title } from '../../../components/Title/Title';

import './signin.css';

const signinPageTmpl = new Templator(template);

class SigninPage extends Block {

	constructor() {
		super('div', {
			title: new Title({
				tag: 'h2',
				className: 'auth__title',
				text: 'Вход',
			}).render(),
			button: new LinkButton({
				text: 'Войти',
				className: 'btn auth__btn',
				link: 'profile.html',
			}).render(),
			linkButton: new LinkButton({
				text: 'Регистрация',
				className: 'auth__btn-link',
				link: 'signup.html',
			}).render(),
			inputs: inputsProps.map(({
				className,
				labelText,
				labelClassName,
				labelId,
				attributes,
				name,
				value,
				}) =>
				new InputWithLabel({
					className,
					labelClassName,
					labelText,
					labelId,
					attributes,
					name,
					value,
				}).render().outerHTML
			).join(''),

		});
	}


	render() {
		const { title, button, inputs, linkButton } = this.props;
		return signinPageTmpl.compile({
			title,
			inputs,
			button,
			linkButton,
		}).getNode();
	}
}

export {
	SigninPage
};