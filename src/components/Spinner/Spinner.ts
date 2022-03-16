import { Block } from '../../utils/Block/Block';
import { Templator } from '../../utils/Template-engine/templater';
import { template } from './Spinner.tmpl';

const spinnerTmpl = new Templator(template);

class Spinner extends Block {
	constructor() {
		super({
			className: 'spinner',
		});
	}

	render() {
		return spinnerTmpl.compile({ ...this.props }).getNode();
	}
}

export default Spinner;
