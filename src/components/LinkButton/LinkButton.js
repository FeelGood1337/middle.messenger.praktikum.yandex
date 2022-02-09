import { Templator } from '../../utils/Template-engine/templater';
import { template } from './linkButton.tmpl';

import './linkButton.css';

const linkButton = new Templator(template);

class LinkButton {
	constructor(props) {
		this.props = props;
	}

	render() {
		const {
			text,
			className,
			link,
		} = this.props;

		return linkButton.compile({
			text,
			className,
			link,
		}).getNode();
	}
}

export {
	LinkButton
};