import { Block } from '../../../utils/Block/Block';
import { template } from './serverError.tmpl';

import { Title } from '../../../components/Title/Title';
import { LinkButton } from '../../../components/LinkButton/LinkButton';

import './serverError.css';


class ServerErrorPage extends Block {

	constructor() {
		super('div', {
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
				text: "Назад к чатам",
				className: "http-error__btn btn",
				link: 'index.html',
			}),
		});
	}

	render() {
		const { title, subTitle, linkButton } = this.props;
		return this.compile(template, {
			title,
			subTitle,
			linkButton,
		});
	}
}

export { ServerErrorPage };
