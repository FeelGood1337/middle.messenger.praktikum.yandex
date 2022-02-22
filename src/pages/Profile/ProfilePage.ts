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


function getTextElement(tag: string, className: string, content: string) {
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
	const itemsList: Items[] = [];
	Object.values(itemsProps).map(el => {
		const arr: Element[] = [];
		el.map(({
			tag,
			className,
			content,
		}) =>
			arr.push(getTextElement(tag, className, content))
		)
		itemsList.push(new Items({
			className: 'fields-items__item',
			items: arr,
		}));
	});

	return itemsList;
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
		super({
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
		return this.compile(template, { ...this.props });
	}
}

export { ProfilePage };
