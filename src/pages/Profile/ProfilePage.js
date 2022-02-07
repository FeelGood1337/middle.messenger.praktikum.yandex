import { Templator } from "../../utils/Template-engine/templater";
import { template } from "./profile.tmpl";
import { itemsProps } from "./itemsProps";

import { Title } from "../../components/Title/Title";
import { Avatar } from "../../components/Avatar/Avatar";
import { Items } from "../../modules/Items/Items";
import { Element } from "../../modules/Element/Element";

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

	getElement() {
		return itemsProps.map(arr => arr.map(el => {
			return new Element({
				tag: el.tag,
				className: el.className,
				content: el.content
			}).render().outerHTML
		}).join(''));
	}

	getItems() {
		const items = this.getElement();
		return new Items({
			className: 'item',
			items
		}).render();
	}

	render() {
		// debugger
		return profileTmpl.getNode({
			profileSvgClass: 'profile-svg',
			title: this.getTitle(),
			avatar: this.getAvatar(),
			items: [...this.getItems()]
		});
	}
}

export { ProfilePage };
