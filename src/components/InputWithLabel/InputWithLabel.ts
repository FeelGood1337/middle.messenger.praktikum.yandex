import { Block } from '../../utils/Block/Block';
import { Templator } from '../../utils/Template-engine/templater';
import { template } from './inputWithLabel.tmpl';

import './inputWithLabel.css';
import isEqual from '../../utils/isEqualProps';

type TProps = {
	labelClassName: string;
	labelText: string;
	labelId: string;
	input: Block;
};

interface IInputWithLabel {
	props: TProps;
	render(): DocumentFragment;
}

const inputTmplt = new Templator(template);
class InputWithLabel extends Block implements IInputWithLabel {
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
		return this.compile(inputTmplt, { ...this.props });
	}
}

export { InputWithLabel };
