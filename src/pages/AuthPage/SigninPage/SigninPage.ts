import { Block } from '../../../utils/Block/Block';
import { Templator } from '../../../utils/Template-engine/templater';
import { template } from './signin.tmpl';
// import { inputsProps } from './inputProps';

import { Button } from '../../../components/Button/Button';
import { LinkButton } from '../../../components/LinkButton/LinkButton';
// import { InputWithLabel } from '../../../components/InputWithLabel/InputWithLabel';
import { Title } from '../../../components/Title/Title';
import { Element } from '../../../components/Element/Element';

import './signin.css';

const signInTmpl = new Templator(template);
class SigninPage extends Block {
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
				events: {
					onClick: (event: Event) => this.validate(event),
				},
			}).render(),
			validateError: new Element({
				tag: 'span',
				className: 'validate__error',
				content: 'Incorrect login',
			}).render(),
			linkButton: new LinkButton({
				text: 'Регистрация',
				className: 'auth__btn-link',
				link: 'signup.html',
			}).render(),
			// inputs: inputsProps.map(({
			// 	className,
			// 	labelText,
			// 	labelClassName,
			// 	labelId,
			// 	attributes,
			// 	name,
			// 	value,
			// }) =>
			// 	new InputWithLabel({
			// 		className,
			// 		labelClassName,
			// 		labelText,
			// 		labelId,
			// 		attributes,
			// 		name,
			// 		value,
			// 	})
			// ),
		});

		this.validate = this.validate.bind(this);
	}

	validate(event: Event) {
		event.preventDefault();
		// this.children.validateError.show()
	}

	componentDidMount(): void {
		this.eventBus().on(Block.EVENTS.FLOW_RENDER, () => {
			// this.children.validateError.hide()
			const { element } = this;
			const inputs = element.querySelectorAll('.input');
			const formButton: any = element.querySelector('.auth__btn');
			formButton.onclick = this.validate.bind(this);
			console.log(inputs);
		})
	}

	render() {
		// return this.compile(template, { ...this.props });
		return signInTmpl.compile({ ...this.props }).getNode();
	}
}

export {
	SigninPage
};