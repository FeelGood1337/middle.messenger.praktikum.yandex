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
			autocomplete="on"
			required
		`,
		value: '""'
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
			placeholder="pasword"
			autocomplete="new-password"
			required
		`,
		value: '""'
	}
];