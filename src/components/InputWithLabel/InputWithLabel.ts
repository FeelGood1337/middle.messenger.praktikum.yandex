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
}

interface IInputWithLabel {
	props: TProps;
	render(): ChildNode | HTMLElement;
}

const input = new Templator(template);
class InputWithLabel implements IInputWithLabel {

	props: TProps;

	constructor(props: TProps) {
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