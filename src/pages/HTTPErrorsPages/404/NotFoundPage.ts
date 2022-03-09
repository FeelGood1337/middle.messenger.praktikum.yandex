import { Block } from '../../../utils/Block/Block';
import { Templator } from '../../../utils/Template-engine/templater';
import { template } from './notFound.tmpl';

import { Title } from '../../../components/Title/Title';
import { LinkButton } from '../../../components/LinkButton/LinkButton';

import './notFound.css'

const notFoundTmpl = new Templator(template);
class NotFoundPage extends Block {

	constructor() {
		super({
			title: new Title({
				tag: 'h1',
				className: 'http-error__title',
				text: '404',
			}).render(),
			subTitle: new Title({
				tag: 'h2',
				className: 'http-error__subtitle',
				text: 'Page not found',
			}).render(),
			linkButton: new LinkButton({
				text: "Назад к чатам",
				className: "http-error__btn btn",
			}).render(),
		});
	}


	render() {
		return notFoundTmpl.compile({ ...this.props }).getNode();
	}
}

export { NotFoundPage }
