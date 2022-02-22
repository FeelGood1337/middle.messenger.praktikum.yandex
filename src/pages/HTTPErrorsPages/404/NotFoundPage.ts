import { Block } from '../../../utils/Block/Block';
import { template } from './notFound.tmpl';

import { Title } from '../../../components/Title/Title';
import { LinkButton } from '../../../components/LinkButton/LinkButton';

import './notFound.css'

class NotFoundPage extends Block {

	constructor() {
		super({
			title: new Title({
				tag: 'h1',
				className: 'http-error__title',
				text: '404',
			}),
			subTitle: new Title({
				tag: 'h2',
				className: 'http-error__subtitle',
				text: 'Page not found',
			}),
			linkButton: new LinkButton({
				text: "Назад к чатам",
				className: "http-error__btn btn",
				link: 'index.html',
			}),
		});
	}


	render() {
		return this.compile(template, { ...this.props });
	}
}

export { NotFoundPage }
