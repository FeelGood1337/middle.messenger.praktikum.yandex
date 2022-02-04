import { Templator } from '../../utils/Template-engine/templater';
import { template } from './button.tmpl';

const button = new Templator(template);

// const context = {
// 	text: 
// };

class Button {
	constructor(props) {
		this.props = props;
	}
	
	render() {
		const { text, className } = this.props;
		return button.getNode({
			text,
			className
		});
	}

}

export { Button };
