import { Block } from '../../../utils/Block/Block';
import { Templator } from '../../../utils/Template-engine/templater';
import { template } from './serverError.tmpl';

import { Title } from '../../../components/Title/Title';
import { LinkButton } from '../../../components/LinkButton/LinkButton';

import './serverError.css';

const serverErrorTmpl = new Templator(template);
class ServerErrorPage extends Block {
	constructor() {
		super({
			title: new Title({
				tag: 'h1',
				className: 'http-error__title',
				text: '500',
			}).render(),
			subTitle: new Title({
				tag: 'h2',
				className: 'http-error__subtitle',
				text: 'Internal Server Error',
			}).render(),
			linkButton: new LinkButton({
				text: 'Назад к чатам',
				className: 'http-error__btn btn',
				href: '/messenger',
				hasSvgIcon: false,
			}).render(),
		});
	}

	render() {
		return serverErrorTmpl.compile({ ...this.props }).getNode();
	}
}

export { ServerErrorPage };
