import { Templator } from '../../utils/Template-engine/templater';
import { template } from './inputWithLabel.tmpl';

import './inputWithLabel.css';

const input = new Templator(template);

class InputWithLabel {
	constructor(props) {
		this.props = props;
	}

	render() {
		const {
			className,
			labelClassName,
			labelText,
			labelId,
			attributes,
			name,
			value,
		} = this.props;



		return input.compile({
			className,
			labelClassName,
			labelText,
			labelId,
			attributes,
			name,
			value,
		}).getNode();
	}
}

export {
	InputWithLabel
};