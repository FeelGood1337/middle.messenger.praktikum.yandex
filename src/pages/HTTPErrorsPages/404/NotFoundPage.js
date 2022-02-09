import { Templator } from '../../../utils/Template-engine/templater';
import { template } from './notFound.tmpl';
import { LinkButton } from '../../../components/LinkButton/LinkButton';

import './notFound.css'

const notFoundErrorTmpl = new Templator(template);

class NotFoundPage {
	getButton() {
		return new LinkButton({
			text: "Назад к чатам",
			className: "http-error__btn btn",
			link: 'index.html',
		}).render();
	}

	render() {
		return notFoundErrorTmpl.compile({
			title: '404',
			subTitle: 'Page not found',
			linkButton: this.getButton(),
		}).getNode();
	}
}

export { NotFoundPage }
