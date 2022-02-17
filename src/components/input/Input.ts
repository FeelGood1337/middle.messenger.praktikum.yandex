import { Block } from '../../utils/Block/Block';
import { Templator } from '../../utils/Template-engine/templater';
import { template } from './input.tmpl';

import './input.css';

type TProps = {
	attributes: string;
	className: string;
	name: string;
	value: string;
}

interface IInput {
	props: TProps;
	render(): ChildNode | HTMLElement;
}

const input = new Templator(template);

class Input extends Block implements IInput {
	props: TProps;

	constructor(props: TProps) {
		super('input', props);
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