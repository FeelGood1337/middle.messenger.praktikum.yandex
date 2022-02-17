import { Block } from '../../../utils/Block/Block';
import { Templator } from '../../../utils/Template-engine/templater';
import { template } from './signup.tmpl';
import { inputsProps } from './inputProps';

import { Title } from '../../../components/Title/Title';
import { Button } from '../../../components/Button/Button';
import { LinkButton } from '../../../components/LinkButton/LinkButton';
import { InputWithLabel } from '../../../components/InputWithLabel/InputWithLabel';

import './signup.css';

const signupPageTmpl = new Templator(template);

class SignupPage extends Block {

	constructor() {
		super('div', {
			title: new Title({
				tag: 'h2',
				className: 'auth__title signup__title',
				text: 'Регистрация',
			}).render(),
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
				}).render().outerHTML
			).join(''),
			button: new Button({
				text: 'Зарегистрировать',
				className: 'signup__btn',
				isDisabled: false,
			}).render(),
			linkButton: new LinkButton({
				text: 'Войти',
				className: 'signup__btn-link',
				link: 'index.html',
			}).render(),
		});
	}

	// handleSigninClick(event: any) {
	// 	event.preventDefault();
	// 	console.log(event);
	// }

	// handleSigninChange(event: any) {
	// 	console.log(event.target.value);
	// }

	// componentDidMount() {
	// 	this.eventBus().on(Block.EVENTS.FLOW_RENDER, () => {
	// 		const formButton: HTMLButtonElement = this.getContent().querySelector('.signup__btn') as HTMLButtonElement;
	// 		const inputFirstname: HTMLInputElement = this.getContent().querySelector('#first_name') as HTMLInputElement;
	// 		formButton.onclick = this.handleSigninClick.bind(this);
	// 		inputFirstname.onchange = this.handleSigninChange.bind(this);
	// 	})
	// }

	render() {
		const { title, inputs, button, linkButton } = this.props;
		return signupPageTmpl.compile({
			title,
			inputs,
			button,
			linkButton,
		}).getNode();
	}
}

export {
	SignupPage
};