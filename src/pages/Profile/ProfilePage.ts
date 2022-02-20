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


function getTextElement(tag: string, className: string, content: any) {
	return new Element({
		tag,
		className,
		content,
	})
}

function getLinkButton(text: string, className: string, link: string) {
	return new LinkButton({
		text,
		className,
		link,
	});
}

function getTextItems() {
	return itemsProps.map(el => el.map(({
		tag,
		className,
		content
	}) =>
		new Items({
			className: 'fields-items__item',
			items: getTextElement(tag, className, content),
		})
	));

	// return itemsProps.map(({
	// 	tag,
	// 	className,
	// 	content
	// }) =>
	// 	new Items({
	// 		className: 'fields-items__item',
	// 		items: getTextElement(tag, className, content),
	// 	})
	// );
}

function getBtnItems() {
	return btnsProps.map(({
		text,
		className,
		link,
	}) =>
		new Items({
			className: 'fields-items__item item-btn',
			items: getLinkButton(text, className, link),
		})
	);
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
			items: getTextItems(),
			btnItems: getBtnItems(),
		});
	}

	render() {
		const {
			profileSvgClass,
			title,
			avatar,
			items,
			btnItems
		} = this.props;

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
