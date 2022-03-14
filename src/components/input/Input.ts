import { Block } from '../../utils/Block/Block';
import { Templator } from '../../utils/Template-engine/templater';
import { template } from './input.tmpl';

import './input.css';

type TProps = {
	attributes: string;
	className: string;
	name: string;
	value: string;
};

interface IInput {
	props: TProps;
	render(): ChildNode | HTMLElement;
}

const input = new Templator(template);

class Input extends Block implements IInput {
	props: TProps;

	constructor(props: TProps) {
		super(props);
		this.props = props;
	}

	render() {
		return input.compile({ ...this.props }).getNode();
	}
}

export { Input };
