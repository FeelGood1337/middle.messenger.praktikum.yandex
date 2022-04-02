import { Block } from '../../../utils/Block/Block';
import { Templator } from '../../../utils/Template-engine/templater';
import { template } from './serverError.tmpl';

import { Title } from '../../../components/Title/Title';
import { LinkButton } from '../../../components/LinkButton/LinkButton';

import './serverError.css';
import router from '../../../router';

const serverErrorTmpl = new Templator(template);
class ServerErrorPage extends Block {
	constructor() {
		super();
	}

	protected initChildren(): void {
		this.children = {
			title: new Title({
				tag: 'h1',
				className: 'http-error__title',
				text: '500',
			}),
			subTitle: new Title({
				tag: 'h2',
				className: 'http-error__subtitle',
				text: 'Internal Server Error',
			}),
			linkButton: new LinkButton({
				text: 'Назад к чатам',
				className: 'http-error__btn btn',
				href: '/messenger',
				hasSvgIcon: false,
				events: {
					click: (e: Event) => this.goToChat(e),
				},
			}),
		};
	}

	private goToChat(event: Event): void {
		event?.preventDefault();
		router.go('/messenger');
	}

	render() {
		return this.compile(serverErrorTmpl, {});
	}
}

export { ServerErrorPage };
