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
		return this.compile(spinnerTmpl, { ...this.props });
	}
}

export default Spinner;
