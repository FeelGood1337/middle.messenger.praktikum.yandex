import { Block } from '../../utils/Block/Block';
import { Templator } from '../../utils/Template-engine/templater';
import { template } from './inputWithLabel.tmpl';

import './inputWithLabel.css';

type TProps = {
	className: string;
	labelClassName: string;
	labelText: string;
	labelId: string;
	attributes: string;
	name: string;
	value: string;
	events?: {
		input: (args: any) => any;
	};
};

interface IInputWithLabel {
	props: TProps;
	render(): ChildNode | HTMLElement;
}

const inputTmplt = new Templator(template);
class InputWithLabel extends Block implements IInputWithLabel {
	props: TProps;

	constructor(props: TProps) {
		super(props);
	}

	render() {
		return this.compile(inputTmplt, { ...this.props });
	}
}

export { InputWithLabel };
