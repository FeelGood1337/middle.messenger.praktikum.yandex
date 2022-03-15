import { Block } from '../../utils/Block/Block';
import router from '../../router';
import { Templator } from '../../utils/Template-engine/templater';
import { template } from './chat.tmpl';

import { AvatarMini, LinkButton } from '../../components/index';

import avataIcon from '../../../static/images/avatarMini.svg';
import kebabIcon from '../../../static/images/kebab-menu.svg';
import clipIcon from '../../../static/images/clip.svg';
import sendIcon from '../../../static/images/send-btn.svg';

const chatTmpl = new Templator(template);
class Chat extends Block {
	constructor() {
		super({
			linkButton: new LinkButton({
				text: 'Профиль',
				className: 'section-caht-list__link-btn',
				href: '/settings',
			}).render(),
			avatarMini: new AvatarMini({
				imgPath: avataIcon,
				width: '32',
				height: '32',
			}).render(),
			avaChatPath: avataIcon,
			name: 'Segey Vlasov',
			kebab: kebabIcon,
			clip: clipIcon,
			send: sendIcon,
		});
	}

	private goToProfile(event: Event): void {
		event?.preventDefault();
		router.go('/settings');
	}

	componentDidMount(): void {
		this.eventBus().on(Block.EVENTS.FLOW_RENDER, () => {
			const { element, goToProfile } = this;

			const linkBtn: HTMLButtonElement = element.querySelector(
				'.section-caht-list__link-btn',
			) as HTMLButtonElement;
			linkBtn.onclick = goToProfile;
		});
	}

	render() {
		return chatTmpl.compile({ ...this.props }).getNode();
	}
}

export { Chat };
