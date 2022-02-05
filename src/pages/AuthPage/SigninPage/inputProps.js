export const inputsProps = [
	{
		name: 'login',
		className: 'auth__input-login',
		labelClassName: 'auth__label-login',
		labelText: 'Логин',
		labelId: 'login',
		attributes: `
			type="text"
			id="login"
			placeholder="login"
			autocomplete="on"
			required
		`,
		value: 'value=""'
	},
	{
		name: 'password',
		className: 'auth__input-password',
		labelClassName: 'auth__label-password',
		labelText: 'Пароль',
		labelId: 'password',
		attributes: `
			type="password"
			id="password"
			placeholder="pasword"
			autocomplete="new-password"
			required
		`,
		value: 'value=""'
	}
];