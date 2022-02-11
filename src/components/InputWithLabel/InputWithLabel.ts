import { Templator } from '../../utils/Template-engine/templater';
import { template } from './inputWithLabel.tmpl';

import './inputWithLabel.css';

const input = new Templator(template);

type TProps = {
	[key: string]: string;
}

interface IInputWithLabel {
	props: TProps;
	render(): ChildNode | HTMLElement; 
}

class InputWithLabel implements IInputWithLabel {

	props: TProps;
	
	constructor(props: TProps = {}) {
		this.props = props;
	}

	render() {
		const {
			className,
			labelClassName,
			labelText,
			labelId,
			attributes,
			name,
			value,
		} = this.props;

		return input.compile({
			className,
			labelClassName,
			labelText,
			labelId,
			attributes,
			name,
			value,
		}).getNode() as HTMLElement;
	} 
}

export {
	InputWithLabel
};