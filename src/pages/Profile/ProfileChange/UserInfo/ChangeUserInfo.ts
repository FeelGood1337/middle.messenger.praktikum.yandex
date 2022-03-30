/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Block } from '../../../../utils/Block/Block';
import { Templator } from '../../../../utils/Template-engine/templater';
import { template } from './userInfo.tmpl';
import { inputsProps } from './inputProps';

import { IUser } from '../../../../utils/Store/Store';
import { userController } from '../../../../controllers';
import { AVATAR_URL } from '../../../../constants';
import { Form, IForm } from '../../../../utils/form';
import {
	InputValidate,
	IInputValidate,
} from '../../../../components/InputWithLabel/InputValidate';
import {
	Input,
	LinkButton,
	Form as MainForm,
	BackBtn,
	Avatar,
	Title,
	InputWithLabel,
	Button,
} from '../../../../components';

import router from '../../../../router';

const userInfoTmpl = new Templator(template);

class ChangeUserInfo extends Block {
	private inputsValue: Record<string, string>;
	private validate: IInputValidate[] = [];
	private form: IForm;

	protected initChildren(): void {
		const { state }: Record<string, IUser> = this.props;
		const { avatar } = state;

		this.children = {
			title: new Title({
				tag: 'h2',
				className: 'auth__title signup__title',
				text: 'Изменить данные',
			}),
			avatar: new Avatar({
				imgPath: `${AVATAR_URL}${avatar}`,
			}),
			form: new MainForm({
				button: new Button({
					text: 'Сохранить',
					className: 'btn signup__btn',
					isDisabled: true,
					events: {
						click: (e: Event) => this.handleClick(e),
					},
				}),
				linkButton: new LinkButton({
					text: ' ',
					className: 'hiden',
					href: ' ',
					hasSvgIcon: false,
				}),
				inputs: this.getInputs(),
				events: {
					change: () => this.getInputsValue(),
					input: () => this.form.formIsValid(),
				},
			}),
			backBtn: new BackBtn({
				href: '/settings',
				events: {
					click: (e: Event) => this.goToSettings(e),
				},
			}),
		};
	}

	private getInputs() {
		this.inputsValue = this.inputsValue || {};
		this.validate = this.validate || [];

		return inputsProps.map(
			(
				{
					className,
					labelText,
					labelClassName,
					labelId,
					attributes,
					name,
					handleBlur,
				},
				index: number,
			) => {
				const value = this.inputsValue[name]
					? `value="${this.inputsValue[name]}"`
					: ' ';
				this.validate.push(new InputValidate(handleBlur));
				const vlArr = [...this.validate];

				return new InputWithLabel({
					labelClassName,
					labelText,
					labelId,
					input: new Input({
						className,
						attributes,
						name,
						value,
						events: {
							blur: (e: Event) => vlArr[index].handleBlur(e),
							focus: () => vlArr[index].handleFocus(),
						},
					}),
				});
			},
		);
	}

	private getInputsValue(): void {
		this.form.saveValue(<HTMLInputElement>event?.target, this.inputsValue);
	}

	private async handleClick(event: Event): Promise<void> {
		event?.preventDefault();
		await userController.updateProfile(this.inputsValue);
	}

	private goToSettings(event: Event): void {
		event?.preventDefault();
		router.go('/settings');
	}

	componentDidMount(): void {
		this.form = new Form(
			this.children.form as Block,
			(this.children.form as any).children.button,
		);
	}

	// componentDidMount(): void {
	// 	this.eventBus().on(Block.EVENTS.FLOW_RENDER, () => {
	// 		const { element, validate, getInputsValue, handleClick, goToSettings } = this;

	// 		const formContainer: HTMLFormElement = element.querySelector('.auth__form')!;
	// 		const formButton: HTMLButtonElement = element.querySelector('.signup__btn')!;
	// 		const inputs: NodeListOf<HTMLInputElement> =
	// 			element.querySelectorAll('.input');

	// 		const linkBtn: HTMLButtonElement = element.querySelector(
	// 			'.profile-section-link',
	// 		) as HTMLButtonElement;

	// 		this.form = new Form(formContainer, formButton);

	// 		inputs.forEach((input, index) => {
	// 			(input as HTMLInputElement).onfocus = validate[index].handleFocus;
	// 			(input as HTMLInputElement).onblur = validate[index].handleBlur;
	// 		});

	// 		formContainer.onchange = getInputsValue.bind(this);
	// 		formContainer.oninput = this.form.formIsValid;
	// 		formButton.onclick = handleClick.bind(this);
	// 		linkBtn.onclick = goToSettings;
	// 	});
	// }

	render() {
		return this.compile(userInfoTmpl, {
			profileSvgClass: 'profile-svg',
		});
	}
}

export { ChangeUserInfo };
