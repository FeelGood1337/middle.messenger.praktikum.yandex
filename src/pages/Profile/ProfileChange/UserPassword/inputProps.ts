import { passwordValidator } from "../../../../utils/validators";

export const inputsProps = [
	{
		name: 'password',
		className: 'auth__input signup-input signup__input-password',
		labelClassName: 'signup-label',
		labelText: 'Старый',
		labelId: 'password',
		attributes: `
			type="password"
			id="password"
			placeholder="pasword"
			pattern="(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).*"
			minlength="8"
			autocomplete="new-password"
			required
		`,
		handleBlur: passwordValidator,
	},
	{
		name: 'newPassword',
		className: 'auth__input signup-input signup__input-password',
		labelClassName: 'signup-label',
		labelText: 'Новый',
		labelId: 'newPassword',
		attributes: `
			type="password"
			id="newPassword"
			placeholder="pasword"
			pattern="(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).*"
			minlength="8"
			autocomplete="new-password"
			required
		`,
		handleBlur: passwordValidator,
	},
	{
		name: 'newPasswordConfirm',
		className: 'auth__input signup-input signup__input-newPassword',
		labelClassName: 'signup-label',
		labelText: 'Ещё раз',
		labelId: 'newPasswordConfirm',
		attributes: `
			type="password"
			id="newPasswordConfirm"
			placeholder="Confirm new pasword"
			pattern="(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).*"
			minlength="8"
			autocomplete="new-password"
			required
		`,
		handleBlur: passwordValidator,
	}
];