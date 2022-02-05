export const inputsProps = [
	{
		name: 'login',
		className: 'auth__input-login',
		attributes: `
			type="text"
			placeholder="login"
			required
		`,
		value: 'value=""'
	},
	{
		name: 'password',
		className: 'auth__input-password',
		attributes: `
			type="password"
			placeholder="pasword"
			autocomplete="new-password"
			required
		`,
		value: 'value=""'
	}
];