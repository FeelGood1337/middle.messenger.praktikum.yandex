const itemsProps = [
	[
		{
			tag: 'p',
			className: 'profile-text profile-label__email',
			content: 'Почта',
		},
		{
			tag: 'p',
			className: 'profile-text profile-text_grey  profile-content__email',
			content: 'exaple@example.com',
		},
	],
	[
		{
			tag: 'p',
			className: 'profile-text profile-label__login',
			content: 'Логин',
		},
		{
			tag: 'p',
			className: 'profile-text profile-text_grey  profile-contents__login',
			content: 'svlasov',
		},
	],
	[
		{
			tag: 'p',
			className: 'profile-text profile-label__name',
			content: 'Имя',
		},
		{
			tag: 'p',
			className: 'profile-text profile-text_grey  profile-content__name',
			content: 'Сергей',
		},
	],
	[
		{
			tag: 'p',
			className: 'profile-text profile-label__second-name',
			content: 'Фамилия',
		},
		{
			tag: 'p',
			className: 'profile-text profile-text_grey  profile-content__second-name',
			content: 'Власов',
		},
	],
	[
		{
			tag: 'p',
			className: 'profile-text profile-label__chat-name',
			content: 'Имя в чате',
		},
		{
			tag: 'p',
			className: 'profile-text profile-text_grey  profile-content__chat-name',
			content: 'svlasov',
		},
	],
	[
		{
			tag: 'p',
			className: 'profile-text profile-label__phone',
			content: 'Телефон',
		},
		{
			tag: 'p',
			className: 'profile-text profile-text_grey  profile-content__phone',
			content: '+7 (999) 999 99 99',
		},
	],
];

const avatarProps = [
	{
		attributes: `
      type="file"
	  id="avatarInput"
      required
    `,
		name: 'avatar',
		className: 'auth__input_avatar',
	},
];

const btnsProps = [
	{
		className: 'btn-item btn-user-info btn-item_accent',
		text: 'Изменить данные',
		href: '/settings/change-user-info',
		hasSvgIcon: false,
	},
	{
		className: 'btn-item btn-user-password btn-item_accent',
		text: 'Изменить пароль',
		href: '/settings/change-user-password',
		hasSvgIcon: false,
	},
	{
		className: 'btn-item btn-logout btn-item_red',
		text: 'Выйти',
		href: '/',
		hasSvgIcon: false,
	},
];

export { itemsProps, btnsProps, avatarProps };
