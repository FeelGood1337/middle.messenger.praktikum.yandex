const TO_SHORT_PASSWORD = 'Must be from 8 to 40 characters';
const PASSWORD_REGISTER = 'Need two letters in different registers';
const PASSWORD_UNDEFINE = 'Password must contain latin letters and numbers';
const PASSWORD_NUMBER = 'Password must contain at least one number';
const INCORRECT_TEXT = 'Must be from 3 to 20 characters';
const INCORRECT_EMAIL = 'Incorrect email';
const INCORRECT_PHONE = 'Phone must start with 8 or 7 and have 11 numbs';

const passwordValidator = (element: HTMLInputElement, callback: Function): void => {
	if (element.validity.tooShort) {
		callback(true, TO_SHORT_PASSWORD);
		return;
	}

	if (!element.validity.valid) {
		if (!/[A-Z]/g.test(element.value)) {
			callback(true, PASSWORD_REGISTER);
			return;
		}

		if (!/[a-z]/g.test(element.value)) {
			callback(true, PASSWORD_REGISTER);
			return;
		}

		if (!/[W_]/g.test(element.value)) {
			callback(true, PASSWORD_UNDEFINE);
			return;
		}

		if (!/[\d]/g.test(element.value)) {
			callback(true, PASSWORD_NUMBER);
			return;
		}
	}
};

const simpleTextValidator = (element: HTMLInputElement, callback: Function): void => {
	if (element.validity.tooLong || element.validity.tooShort) {
		callback(true, INCORRECT_TEXT);
		return;
	}
};

const emailValidator = (element: HTMLInputElement, callback: Function) => {
	if (!element.validity.valid) {
		callback(true, INCORRECT_EMAIL);
		return;
	}
};

const phoneValidator = (element: HTMLInputElement, callback: Function) => {
	if (!element.validity.valid) {
		callback(true, INCORRECT_PHONE);
		return;
	}
};

export { passwordValidator, simpleTextValidator, emailValidator, phoneValidator };
