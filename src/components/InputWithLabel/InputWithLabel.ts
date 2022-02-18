import { Block } from '../../utils/Block/Block';
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
class InputWithLabel extends Block implements IInputWithLabel {
	props: TProps;

	constructor(props: TProps) {
		super('div', props);
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

		return this.compile(template, {
			className,
			labelClassName,
			labelText,
			labelId,
			attributes,
			name,
			value,
		});
	}
}

export {
	InputWithLabel
};