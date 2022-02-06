import { Templator } from "../../../utils/Template-engine/templater";
import { template } from "./serverError.tmpl";
import { Button } from "../../../components/Button/Button";

import './serverError.css';

const serverErrorTmpl = new Templator(template);

class ServerErrorPage {

	getButton() {
		return new Button({
			text: "Назад к чатам",
			className: "server-error__btn",
			isDisabled: false
		}).render();
	}

	render() {
		return serverErrorTmpl.getNode({
			title: '500',
			subTitle: 'Internal Server Error',
			button: this.getButton()
		});
	}
}

export { ServerErrorPage };
