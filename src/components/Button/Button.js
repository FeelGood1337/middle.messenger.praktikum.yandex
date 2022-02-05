import {
	Templator
} from '../../utils/Template-engine/templater';
import {
	template
} from './button.tmpl';

import './button.css';

const button = new Templator(template);

// const context = {
// 	text: 
// };

class Button {
	constructor(props) {
		this.props = props;
	}

	render() {
		const {
			text,
			className,
			disabled
		} = this.props;

		return button.getNode({
			text,
			className,
			disabled
		});
	}

}

export {
	Button
};