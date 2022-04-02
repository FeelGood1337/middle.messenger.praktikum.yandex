import { Block } from './Block/Block';

interface IForm {
	formIsValid: () => void;
	saveValue(input: HTMLInputElement, obj: Record<string, string>): void;
}

class Form implements IForm {
	private form: Block;
	private button: Block;

	constructor(form: Block, button: Block) {
		this.form = form;
		this.button = button;
	}

	saveValue(input: HTMLInputElement, obj: Record<string, string>): void {
		obj[input.name] = input.value;
	}

	private toggleButton(isActive: boolean): void {
		if (isActive) {
			this.button.setProps({
				isDisabled: false,
			});
		} else {
			this.button.setProps({
				isDisabled: true,
			});
		}
	}

	formIsValid = (): void => {
		if ((this.form.getContent() as HTMLFormElement).checkValidity()) {
			this.toggleButton(true);
			return;
		}
		this.toggleButton(false);
	};
}

export { Form, IForm };
