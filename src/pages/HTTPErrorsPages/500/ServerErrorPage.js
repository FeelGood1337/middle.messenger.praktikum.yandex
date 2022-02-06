import { Templator } from "../../../utils/Template-engine/templater";
import { template } from "./serverError.tmpl";
import { LinkButton } from '../../../components/LinkButton/LinkButton';

import './serverError.css';

const serverErrorTmpl = new Templator(template);

class ServerErrorPage {

	getButton() {
		return new LinkButton({
			text: "Назад к чатам",
			className: "server-error__btn btn",
			link: 'index.html'
		}).render();
	}

	render() {
		return serverErrorTmpl.getNode({
			title: '500',
			subTitle: 'Internal Server Error',
			linkButton: this.getButton()
		});
	}
}

export { ServerErrorPage };
