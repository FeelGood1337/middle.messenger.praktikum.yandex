import { Templator } from '../../../../utils/Template-engine/templater';
import { template } from './userInfo.tmpl';
import { inputsProps } from './inputProps';

import { Avatar } from '../../../../components/Avatar/Avatar';
import { Title } from '../../../../components/Title/Title';
import { InputWithLabel } from '../../../../components/InputWithLabel/InputWithLabel';
import { Button } from '../../../../components/Button/Button';

import avatar from '../../../../../static/images/Avatar.svg';

const changeUserInfoTmpl = new Templator(template);

class ChangeUserInfo {

	getInputs() {
		return inputsProps.map(({
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
			}).render().outerHTML
		).join('');
	}

	getAvatar() {
		return new Avatar({
			link: 'profile.html',
			imgPath: avatar,
		}).render();
	}

	getTitle() {
		return new Title({
			tag: 'h2',
			className: 'profile-title',
			text: 'Изменить данные',
		}).render();
	}

	getButton() {
		return new Button({
			text: 'Сохранить',
			className: 'signup__btn',
			isDisabled: true,
		}).render();
	}

	getTitle() {
		return new Title({
			tag: 'h2',
			className: 'auth__title signup__title',
			text: 'Изменить данные',
		}).render();
	}

	render() {
		return changeUserInfoTmpl.compile({
			profileSvgClass: 'profile-svg',
			title: this.getTitle(),
			avatar: this.getAvatar(),
			inputs: this.getInputs(),
			button: this.getButton(),
		}).getNode();
	}
}

export { ChangeUserInfo }
