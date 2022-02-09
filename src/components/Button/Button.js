import { Templator } from '../../utils/Template-engine/templater';
import { template } from './button.tmpl';

import './button.css';

const button = new Templator(template);

class Button {
	constructor(props) {
		this.props = props;
	}

	render() {
		const {
			text,
			className,
			isDisabled,
		} = this.props;

		return button.compile({
			text,
			className,
			disabled: isDisabled ? 'disabled' : '',
		}).getNode();
	}

}

export {
	Button
};