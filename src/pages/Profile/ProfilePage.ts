import { Block } from '../../utils/Block/Block';
import { Templator } from '../../utils/Template-engine/templater';
import { template } from './profile.tmpl';
import { itemsProps, btnsProps } from './itemsProps';

import { Title } from '../../components/Title/Title';
import { Avatar } from '../../components/Avatar/Avatar';
import { Items } from '../../components/Items/Items';
import { Element } from '../../components/Element/Element';
import { LinkButton } from '../../components/LinkButton/LinkButton';

import avatar from '../../../static/images/Avatar.svg';

import './profile.css';

const profileTmpl = new Templator(template);

function getLinkButton(text: string, className: string) {
	return new LinkButton({
		text,
		className,
	}).render();
}

function getBtnItems() {
	return btnsProps.map(({
		text,
		className,
	}) =>
		new Items({
			className: 'fields-items__item item-btn',
			items: getLinkButton(text, className),
		}).render()
	);
}

function getTextElement() {
	return itemsProps.map(arr => arr.map(el => {
		return new Element({
			tag: el.tag,
			className: el.className,
			content: el.content,
		}).render().outerHTML
	}).join(''));
}

function getTextItems() {
	const items = getTextElement();
	return new Items({
		className: 'fields-items__item',
		items,
	}).render();
}

class ProfilePage extends Block {

	constructor() {
		super({
			profileSvgClass: 'profile-svg',
			title: new Title({
				tag: 'h2',
				className: 'profile-title',
				text: 'Сергей',
			}).render(),
			avatar: new Avatar({
				link: 'profile.html',
				imgPath: avatar,
			}).render(),
			items: getTextItems(),
			btnItems: getBtnItems(),
		});
	}

	render() {
		return profileTmpl.compile({ ...this.props }).getNode();
	}
}

export { ProfilePage };
