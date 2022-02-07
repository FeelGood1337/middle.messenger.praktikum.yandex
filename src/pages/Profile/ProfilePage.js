import { Templator } from "../../utils/Template-engine/templater";
import { template } from "./profile.tmpl";
import { itemsProps, btnsProps } from "./itemsProps";

import { Title } from "../../components/Title/Title";
import { Avatar } from "../../components/Avatar/Avatar";
import { Items } from "../../modules/Items/Items";
import { Element } from "../../modules/Element/Element";
import { LinkButton } from "../../components/LinkButton/LinkButton";

import avatar from '../../../static/images/Avatar.svg';

import './profile.css';

const profileTmpl = new Templator(template);

class ProfilePage {

	getTitle() {
		return new Title({
			tag: 'h2',
			className: 'profile-title',
			text: 'Сергей'
		}).render();
	}

	getAvatar() {
		return new Avatar({
			link: '#',
			imgPath: avatar,
		}).render();
	}

	getTextElement() {
		return itemsProps.map(arr => arr.map(el => {
			return new Element({
				tag: el.tag,
				className: el.className,
				content: el.content
			}).render().outerHTML
		}).join(''));
	}

	getTextItems() {
		const items = this.getTextElement();
		return new Items({
			className: 'fields-items__item',
			items
		}).render();
	}

	getLinkButton(text, className, link) {
		return new LinkButton({
			text,
			className,
			link
		}).render();
	}

	getBtnItems() {
		return btnsProps.map(({
			className,
			text,
			link
		}) => 
		new Items({
			className: 'fields-items__item item-btn',
			items: this.getLinkButton(text, className, link)
		}).render());
	}

	render() {
		return profileTmpl.getNode({
			profileSvgClass: 'profile-svg',
			title: this.getTitle(),
			avatar: this.getAvatar(),
			items: [...this.getTextItems()],
			btnItems: [...this.getBtnItems()]
		});
	}
}

export { ProfilePage };
