import { Block } from '../../../../utils/Block/Block';
import { Templator } from '../../../../utils/Template-engine/templater';
import { template } from './userInfo.tmpl';
import { inputsProps } from './inputProps';

import { Form, IForm } from '../../../../utils/form';
import { InputValidate, IInputValidate } from '../../../../components/InputWithLabel/InputValidate';
import { Avatar } from '../../../../components/Avatar/Avatar';
import { Title } from '../../../../components/Title/Title';
import { InputWithLabel } from '../../../../components/InputWithLabel/InputWithLabel';
import { Button } from '../../../../components/Button/Button';

import avatar from '../../../../../static/images/Avatar.svg';

const userInfoTmpl = new Templator(template);
class ChangeUserInfo extends Block {
	inputsValue: { [key: string]: string };
	validate: IInputValidate[];
	form: IForm;

	constructor() {
		super({
			profileSvgClass: 'profile-svg',
			title: new Title({
				tag: 'h2',
				className: 'auth__title signup__title',
				text: 'Изменить данные',
			}).render(),
			avatar: new Avatar({
				link: 'profile.html',
				imgPath: avatar,
			}).render(),
			button: new Button({
				text: 'Сохранить',
				className: 'signup__btn',
				isDisabled: true,
			}).render(),
		});

		this.inputsValue;
		this.form;
		this.validate = [];
	}

	private getInputs() {
		this.inputsValue = this.inputsValue || {};
		this.validate = this.validate || [];

		return inputsProps.map(({
			className,
			labelClassName,
			labelText,
			labelId,
			attributes,
			name,
			handleBlur
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

	private getInputsValue(): void {
		this.form.saveValue(<HTMLInputElement>event?.target, this.inputsValue);
	}

	private handleClick(event: Event): void {
		event.preventDefault();
		console.log(this.inputsValue);
	}

	componentDidMount(): void {
		this.eventBus().on(Block.EVENTS.FLOW_RENDER, () => {
			const { element, validate, getInputsValue, handleClick } = this;

			const formContainer: HTMLFormElement = element.querySelector('.auth__form')!;
			const formButton: HTMLButtonElement = element.querySelector('.signup__btn')!;
			const inputs: NodeListOf<HTMLInputElement> = element.querySelectorAll('.input');

			this.form = new Form(formContainer, formButton);

			inputs.forEach((input, index) => {
				(input as HTMLInputElement).onfocus = validate[index].handleFocus;
				(input as HTMLInputElement).onblur = validate[index].handleBlur;
			});

			formContainer.onchange = getInputsValue.bind(this);
			formContainer.oninput = this.form.formIsValid;
			formButton.onclick = handleClick.bind(this);
		});
	}

	render() {
		const { profileSvgClass, title, avatar, button } = this.props;
		return userInfoTmpl.compile({
			profileSvgClass,
			title,
			avatar,
			button,
			inputs: this.getInputs(),
		}).getNode();
	}
}

export { ChangeUserInfo }
