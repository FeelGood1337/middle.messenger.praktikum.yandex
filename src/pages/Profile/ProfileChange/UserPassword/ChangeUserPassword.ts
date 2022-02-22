import { Block } from '../../../../utils/Block/Block';
import { template } from './userPassword.tmpl';
import { inputsProps } from './inputProps';

import { Avatar } from '../../../../components/Avatar/Avatar';
import { Title } from '../../../../components/Title/Title';
import { InputWithLabel } from '../../../../components/InputWithLabel/InputWithLabel';
import { Button } from '../../../../components/Button/Button';

import avatar from '../../../../../static/images/Avatar.svg';


class ChangeUserPassword extends Block {

	constructor() {
		super({
			profileSvgClass: 'profile-svg',
			title: new Title({
				tag: 'h2',
				className: 'auth__title signup__title',
				text: 'Изменить пароль',
			}),
			avatar: new Avatar({
				link: 'profile.html',
				imgPath: avatar,
			}),
			inputs: inputsProps.map(({
				className,
				labelClassName,
				labelText,
				labelId,
				attributes,
				name,
				value,
			}) =>
				new InputWithLabel({
					className,
					labelClassName,
					labelText,
					labelId,
					attributes,
					name,
					value,
				})
			),
			button: new Button({
				text: 'Сохранить',
				className: 'signup__btn',
				isDisabled: true,
			}),
		});
	}

	render() {
		return this.compile(template, { ...this.props });
	}
}

export { ChangeUserPassword };
