export const inputsProps = [
	{
		name: 'email',
		className: 'auth__input signup__input-email',
		labelText: 'Почта',
		labelId: 'email',
		attributes: `
			type="text"
			id="email"
			placeholder="example@example.ru"
			autocomplete="on"
			required
		`,
		value: 'value=""'
	},
	{
		name: 'login',
		className: 'auth__input signup__input-login',
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
		name: 'first_name',
		className: 'auth__input signup__input-first_name',
		labelText: 'Имя',
		labelId: 'first_name',
		attributes: `
			type="text"
			id="first_name"
			placeholder="Сергей"
			autocomplete="on"
			required
		`,
		value: 'value=""'
	},
	{
		name: 'second_name',
		className: 'auth__input signup__input-second_name',
		labelText: 'Фамилия',
		labelId: 'second_name',
		attributes: `
			type="text"
			id="second_name"
			placeholder="Власов"
			autocomplete="on"
			required
		`,
		value: 'value=""'
	},
	{
		name: 'phone',
		className: 'auth__input signup__input-phone',
		labelText: 'Телефон',
		labelId: 'phone',
		attributes: `
			type="text"
			id="phone"
			placeholder="+7"
			autocomplete="on"
			required
		`,
		value: 'value=""'
	},
	{
		name: 'password',
		className: 'auth__input signup__input-password',
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
	},
	{
		name: 'newPassword',
		className: 'auth__input signup__input-newPassword',
		labelText: 'Пароль (ещё раз)',
		labelId: 'newPassword',
		attributes: `
			type="newPassword"
			id="newPassword"
			placeholder="pasword"
			autocomplete="new-password"
			required
		`,
		value: 'value=""'
	}
];