import { Block } from '../../utils/Block/Block';
import isEqual from '../../utils/isEqualProps';
import { Templator } from '../../utils/Template-engine/templater';
import { template } from './Form.tmpl';

type TProps = {
	inputs: Block[];
	button: Block;
	linkButton: Block;
	events?: {
		onchange?: (arg: any) => any;
		oninput?: (arg: any) => any;
		click?: (arg: any) => any;
	};
};

const formTmpl = new Templator(template);

class Form extends Block {
	props: TProps;
	constructor(props: TProps) {
		super(props);
	}

	componentDidMount(): void {
		// const fromData = new FormData(this.getContent() as HTMLFormElement);
		// console.log(fromData);
		// console.log(this.children);
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
