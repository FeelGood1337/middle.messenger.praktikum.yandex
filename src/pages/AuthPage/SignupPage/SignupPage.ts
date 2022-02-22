import { Block } from '../../../utils/Block/Block';
import { template } from './signup.tmpl';
import { inputsProps } from './inputProps';

import { Title } from '../../../components/Title/Title';
import { Button } from '../../../components/Button/Button';
import { LinkButton } from '../../../components/LinkButton/LinkButton';
import { InputWithLabel } from '../../../components/InputWithLabel/InputWithLabel';

import './signup.css';

class SignupPage extends Block {

	constructor() {
		super({
			title: new Title({
				tag: 'h2',
				className: 'auth__title signup__title',
				text: 'Регистрация',
			}),
			button: new Button({
				text: 'Зарегистрировать',
				className: 'signup__btn',
				isDisabled: 'true',
			}),
			linkButton: new LinkButton({
				text: 'Войти',
				className: 'signup__btn-link',
				link: 'index.html',
			}),
			inputs: inputsProps.map(({
				className,
				labelClassName,
				labelText,
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
	SignupPage
};