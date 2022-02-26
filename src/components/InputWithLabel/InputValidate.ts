interface IInputValidate {
	_FIELD_REQUIRED: string;
	_customValidate: Function;
	handleBlur(event: Event): void;
	handleFocus(): void;
}

class InputValidate implements IInputValidate {
	readonly _FIELD_REQUIRED = 'This is feild required';
	readonly _customValidate: Function;

	constructor(customValidate: Function) {
		this._customValidate = customValidate;
	}

	private toggleError = (isActive: boolean, message = ''): void => {
		const err = (<HTMLInputElement>event?.target).nextElementSibling;
		if (isActive) {
			err!.classList.add('auth__error_active');
			err!.textContent = message;
		} else {
			err!.classList.remove('auth__error_active');
			err!.textContent = message;
		}
	};

	handleBlur = (event: Event): void => {
		if((<HTMLInputElement>event?.target).validity.valueMissing) {
			this.toggleError(true, this._FIELD_REQUIRED);
			return;
		}
		this._customValidate(<HTMLInputElement>event.target, this.toggleError);
	};

	handleFocus = () => this.toggleError(false);
}

export { InputValidate, IInputValidate };
