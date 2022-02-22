import { Block } from '../../../utils/Block/Block';
import { template } from './signin.tmpl';
import { inputsProps } from './inputProps';

import { LinkButton } from '../../../components/LinkButton/LinkButton';
import { InputWithLabel } from '../../../components/InputWithLabel/InputWithLabel';
import { Title } from '../../../components/Title/Title';

import './signin.css';

class SigninPage extends Block {

	constructor() {
		super({
			title: new Title({
				tag: 'h2',
				className: 'auth__title',
				text: 'Вход',
			}),
			button: new LinkButton({
				text: 'Войти',
				className: 'btn auth__btn',
				link: 'profile.html',
			}),
			linkButton: new LinkButton({
				text: 'Регистрация',
				className: 'auth__btn-link',
				link: 'signup.html',
			}),
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
				})
			),

		});
	}

	render() {
		return this.compile(template, { ...this.props });
	}
}

export {
	SigninPage
};