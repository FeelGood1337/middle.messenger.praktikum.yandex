import { passwordValidator, simpleTextValidator } from '../../../utils/validators';

export const inputsProps = [
	{
		name: 'login',
		className: 'auth__input auth__input-login',
		labelClassName: 'auth-label',
		labelText: 'Логин',
		labelId: 'login',
		attributes: `
			type="text"
			id="login"
			placeholder="login"
			pattern: '[\\w.]*'
			minlength="2"
        	maxlength="20"
			autocomplete="on"
			required
		`,
		value: '""',
		handleBlur: simpleTextValidator,
	},
	{
		name: 'password',
		className: 'auth__input auth__input-password',
		labelClassName: 'auth-label',
		labelText: 'Пароль',
		labelId: 'password',
		attributes: `
			type="password"
			id="password"
			pattern="(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).*"
			minlength="8"
			placeholder="password"
			autocomplete="new-password"
			required
		`,
		value: '""',
		handleBlur: passwordValidator,
	}
];