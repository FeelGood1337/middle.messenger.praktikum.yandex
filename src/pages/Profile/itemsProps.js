const itemsProps = [
		[
			{
				tag: 'p',
				className: 'profile-text profile-label__email',
				content: 'Почта'
			},
			{
				tag: 'p',
				className: 'profile-text profile-text_grey  profile-content__email',
				content: 'exaple@example.com'
			},
		],
		[
			{
				tag: 'p',
				className: 'profile-text profile-label__login',
				content: 'Логин'
			},
			{
				tag: 'p',
				className: 'profile-text profile-text_grey  profile-contents__login',
				content: 'svlasov'
			},
		],
		[
			{
				tag: 'p',
				className: 'profile-text profile-label__name',
				content: 'Имя'
			},
			{
				tag: 'p',
				className: 'profile-text profile-text_grey  profile-content__name',
				content: 'Сергей'
			},
		],
		[
			{
				tag: 'p',
				className: 'profile-text profile-label__second-name',
				content: 'Фамилия'
			},
			{
				tag: 'p',
				className: 'profile-text profile-text_grey  profile-content__second-name',
				content: 'Власов'
			},
		],
		[
			{
				tag: 'p',
				className: 'profile-text profile-label__chat-name',
				content: 'Имя в чате'
			},
			{
				tag: 'p',
				className: 'profile-text profile-text_grey  profile-content__chat-name',
				content: 'svlasov'
			},
		],
		[
			{
				tag: 'p',
				className: 'profile-text profile-label__phone',
				content: 'Телефон'
			},
			{
				tag: 'p',
				className: 'profile-text profile-text_grey  profile-content__phone',
				content: '+7 (999) 999 99 99'
			},
		],
];


const btnsProps = [
	{
		className: 'btn-item btn-item_accent',
		text: 'Изменить данные',
		link: 'use-info_change.html'
	},
	{
		className: 'btn-item btn-item_accent',
		text: 'Изменить пароль',
		link: 'user-password_change.html'
	},
	{
		className: 'btn-item btn-item_red',
		text: 'Выйти',
		link: 'index.html'
	},
];

export { itemsProps, btnsProps };
