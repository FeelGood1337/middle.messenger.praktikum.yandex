import { Block } from '../../utils/Block/Block';
import { template } from './profile.tmpl';
import { itemsProps, btnsProps } from './itemsProps';

import { Title } from '../../components/Title/Title';
import { Avatar } from '../../components/Avatar/Avatar';
import { Items } from '../../components/Items/Items';
import { Element } from '../../components/Element/Element';
import { LinkButton } from '../../components/LinkButton/LinkButton';

import avatar from '../../../static/images/Avatar.svg';

import './profile.css';


function getTextElement() {
	return itemsProps.map(arr => arr.map(el => {
		return new Element({
			tag: el.tag,
			className: el.className,
			content: el.content,
		})
	}));
}

function getTextItems() {
	const items = getTextElement();
	return new Items({
		className: 'fields-items__item',
		items,
	});
}

function getLinkButton(text: string, className: string, link: string) {
	return new LinkButton({
		text,
		className,
		link,
	});
}

function getBtnItems() {
	return btnsProps.map(({
		className,
		text,
		link,
	}) =>
		new Items({
			className: 'fields-items__item item-btn',
			items: getLinkButton(text, className, link),
		}));
}

class ProfilePage extends Block {

	constructor() {
		super('div', {
			profileSvgClass: 'profile-svg',
			title: new Title({
				tag: 'h2',
				className: 'profile-title',
				text: 'Сергей',
			}),
			avatar: new Avatar({
				link: 'profile.html',
				imgPath: avatar,
			}),
			// items: [...getTextItems() as any],
			btnItems: [...getBtnItems()],
		});
	}

	render() {
		const { profileSvgClass, title, avatar, items, btnItems } = this.props;
		return this.compile(template, {
			profileSvgClass,
			title,
			avatar,
			items,
			btnItems,
		});
	}
}

export { ProfilePage };
