import { Block } from '../../utils/Block/Block';
import router from '../../router';
import { Templator } from '../../utils/Template-engine/templater';
import { template } from './profile.tmpl';
import { itemsProps, btnsProps } from './itemsProps';

import { AuthAPI } from '../../API/auth-api';
import { Title } from '../../components/Title/Title';
import { Avatar } from '../../components/Avatar/Avatar';
import { Items } from '../../components/Items/Items';
import { Element } from '../../components/Element/Element';
import { LinkButton } from '../../components/LinkButton/LinkButton';

import avatar from '../../../static/images/Avatar.svg';

import './profile.css';

const profileTmpl = new Templator(template);
const authApi = new AuthAPI();

function getLinkButton(text: string, className: string, href: string) {
	return new LinkButton({
		text,
		className,
		href,
	}).render();
}

function getBtnItems() {
	return btnsProps.map(({ text, className, href }) =>
		new Items({
			className: 'fields-items__item item-btn',
			items: getLinkButton(text, className, href),
		}).render(),
	);
}

function getTextElement() {
	return itemsProps.map((arr) =>
		arr
			.map((el) => {
				return new Element({
					tag: el.tag,
					className: el.className,
					content: el.content,
				}).render().outerHTML;
			})
			.join(''),
	);
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

	private goToChat(event: Event): void {
		event?.preventDefault();
		router.go('/messenger');
	}

	private logoutClick(event: Event): void {
		event?.preventDefault();

		authApi
			.logout()
			.then(() => router.go('/'))
			.catch(() => router.go('/error'));
	}

	componentDidMount(): void {
		this.eventBus().on(Block.EVENTS.FLOW_RENDER, () => {
			const { element, goToChat, logoutClick } = this;

			const linkBtn: HTMLButtonElement = element.querySelector(
				'.profile-section-link',
			) as HTMLButtonElement;
			const logOutBtn: HTMLButtonElement = element.querySelector(
				'.btn-item_red',
			) as HTMLButtonElement;

			linkBtn.onclick = goToChat;
			logOutBtn.onclick = logoutClick;
		});
	}

	render() {
		return profileTmpl.compile({ ...this.props }).getNode();
	}
}

export { ProfilePage };
