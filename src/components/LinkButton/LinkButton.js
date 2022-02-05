import {
	Templator
} from '../../utils/Template-engine/templater';
import {
	template
} from './linkButton.tmpl';

import './linkButton.css';

const linkButton = new Templator(template);

class LinkButton {
	constructor(props) {
		this.props = props;
	}

	render() {
		const {
			text,
			className
		} = this.props;

		return linkButton.getNode({
			text,
			className
		});
	}
}

export {
	LinkButton
};