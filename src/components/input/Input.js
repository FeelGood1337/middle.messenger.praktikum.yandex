import {
	Templator
} from '../../utils/Template-engine/templater';
import {
	template
} from './input.tmpl';

import './style.css';

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
			value
		} = this.props;

		return input.getNode({
			className,
			attributes,
			name,
			value
		});
	}
}

export {
	Input
};