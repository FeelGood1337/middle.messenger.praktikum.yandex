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
			autocomplete="new-password"
			required
		`,
		value: '""'
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
			autocomplete="new-password"
			required
		`,
		value: '""'
	},
	{
		name: 'newPassword',
		className: 'auth__input signup-input signup__input-newPassword',
		labelClassName: 'signup-label',
		labelText: 'Ещё раз',
		labelId: 'newPassword',
		attributes: `
			type="newPassword"
			id="newPassword"
			placeholder="Confirm new pasword"
			autocomplete="new-password"
			required
		`,
		value: '""'
	}
];