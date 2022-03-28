import { Block } from '../../utils/Block/Block';
import isEqual from '../../utils/isEqualProps';
import { Templator } from '../../utils/Template-engine/templater';
import { template } from './Form.tmpl';

type TProps = {
	inputs: Block[];
	button: Block;
	linkButton: Block;
	events?: {
		change?: (arg: any) => any;
		input?: (arg: any) => any;
		click?: (arg: any) => any;
	};
};

const formTmpl = new Templator(template);

class Form extends Block {
	props: TProps;
	constructor(props: TProps) {
		super(props);
	}

	componentDidUpdate(
		oldProps: Record<string, any>,
		newProps: Record<string, any>,
	): boolean {
		return !isEqual(oldProps, newProps);
	}

	render() {
		return this.compile(formTmpl, {});
	}
}

export default Form;
