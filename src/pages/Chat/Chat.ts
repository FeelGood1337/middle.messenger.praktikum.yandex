import { Block } from '../../utils/Block/Block';
import { Templator } from '../../utils/Template-engine/templater';
import { template } from './chat.tmpl';
import { elements } from './itemsProps';

import { AvatarMini, LinkButton, Items } from '../../components/index';

import avataIcon from '../../../static/images/avatarMini.svg';
import kebabIcon from '../../../static/images/kebab-menu.svg';
import clipIcon from '../../../static/images/clip.svg';
import sendIcon from '../../../static/images/send-btn.svg';

const chatTmpl = new Templator(template);

function getItems() {
	return elements.map(arr => arr.map(el => {
		return new Items({
			className: '',
			items: el,
		}).render()
	}));
}
class Chat extends Block {

	constructor() {
		super({
			linkButton: new LinkButton({
				text: 'Профиль',
				className: 'section-caht-list__link-btn',
				link: 'profile.html',
			}).render(),
			avatarMini: new AvatarMini({
				imgPath: avataIcon,
				width: '32',
				height: '32'
			}).render(),
			items: getItems(),
			name: 'Segey Vlasov',
			kebab: kebabIcon,
			clip: clipIcon,
			send: sendIcon,
		});
	}

	render() {
		console.log(getItems());
		return chatTmpl.compile({ ...this.props }).getNode();
	}
}

export { Chat };
