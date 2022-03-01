import { 
	passwordValidator, 
	simpleTextValidator, 
	emailValidator, 
	phoneValidator 
} from '../../../utils/validators';

export const inputsProps = [
	{
		name: 'email',
		className: 'auth__input signup-input signup__input-email',
		labelClassName: 'signup-label',
		labelText: 'Почта',
		labelId: 'email',
		attributes: `
			type="text"
			id="email"
			placeholder="example@example.ru"
			pattern="^.{1,}@([-0-9A-Za-z]{1,}\\.){1,3}[-A-Za-z]{2,}$"
			autocomplete="on"
			required
		`,
		handleBlur: emailValidator,
	},
	{
		name: 'login',
		className: 'auth__input signup-input signup__input-login',
		labelClassName: 'signup-label',
		labelText: 'Логин',
		labelId: 'login',
		attributes: `
			type="text"
			id="login"
			placeholder="login"
			autocomplete="on"
			minlength="3"
        	maxlength="20"
			required
		`,
		handleBlur: simpleTextValidator,
	},
	{
		name: 'first_name',
		className: 'auth__input signup-input signup__input-first_name',
		labelClassName: 'signup-label',
		labelText: 'Имя',
		labelId: 'first_name',
		attributes: `
			type="text"
			id="first_name"
			placeholder="Сергей"
			pattern: '[-A-Za-zА-Яа-я.\\s]*',
			minlength="3"
        	maxlength="20"
			autocomplete="on"
			required
		`,
		handleBlur: simpleTextValidator,
	},
	{
		name: 'second_name',
		className: 'auth__input signup-input signup__input-second_name',
		labelClassName: 'signup-label',
		labelText: 'Фамилия',
		labelId: 'second_name',
		attributes: `
			type="text"
			id="second_name"
			placeholder="Власов"
			pattern: '[-A-Za-zА-Яа-я.\\s]*',
			minlength="3"
        	maxlength="20"
			autocomplete="on"
			required
		`,
		handleBlur: simpleTextValidator,
	},
	{
		name: 'phone',
		className: 'auth__input signup-input signup__input-phone',
		labelClassName: 'signup-label',
		labelText: 'Телефон',
		labelId: 'phone',
		attributes: `
			type="text"
			id="phone"
			placeholder="+7"
			pattern="^(7|8)\\d{10}$"
        	maxlength="11"
			autocomplete="on"
			required
		`,
		handleBlur: phoneValidator,
	},
	{
		name: 'password',
		className: 'auth__input signup-input signup__input-password',
		labelClassName: 'signup-label',
		labelText: 'Пароль',
		labelId: 'password',
		attributes: `
			type="password"
			id="password"
			placeholder="pasword"
			pattern="(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).*"
			minlength="8"
			maxlength="20"
			autocomplete="new-password"
			required
		`,
		handleBlur: passwordValidator,
	},
];