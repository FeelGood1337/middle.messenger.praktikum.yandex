interface IForm {
	formIsValid: () => void;
	saveValue(input: HTMLInputElement, obj: Record<string, string>): void;
}

class Form implements IForm {
	private form: HTMLFormElement;
	private button: HTMLButtonElement;
	// private _customeValidator?: () => boolean;

	constructor(form: HTMLFormElement, button: HTMLButtonElement) {
		this.form = form;
		this.button = button;
		// this._customeValidator = customeValidator;
	}

	saveValue(input: HTMLInputElement, obj: Record<string, string>): void {
		obj[input.name] = input.value;
	}

	private toggleButton(isActive: boolean): void {
		if (isActive) {
			this.button.removeAttribute('disabled');
		} else {
			this.button.setAttribute('disabled', 'true');
		}
	}

	formIsValid = (): void => {
		if (this.form.checkValidity()) {
			this.toggleButton(true);
			return;
		}
		this.toggleButton(false);
	};
}

export { Form, IForm };
