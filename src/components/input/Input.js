import { Templator } from '../../utils/Template-engine/templater';
import { template } from './input.tmpl';

import './input.css';

const input = new Templator(template);

class Input {
	constructor(props) {
		this.props = props;
	}

	render() {
		const {
			className,
			attributes,
			name,
			value,
		} = this.props;



		return input.compile({
			className,
			attributes,
			name,
			value,
		}).getNode();
	}
}

export {
	Input
};