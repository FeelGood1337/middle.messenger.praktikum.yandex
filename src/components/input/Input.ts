import { Block } from '../../utils/Block/Block';
import { Templator } from '../../utils/Template-engine/templater';
import { template } from './input.tmpl';

import './input.css';
import isEqual from '../../utils/isEqualProps';

type TProps = {
	attributes: string;
	className: string;
	name: string;
	value: string;
	events?: {
		input?: (args: any) => any;
		focus?: (args: any) => any;
		blur?: (args: any) => any;
	};
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
	}

	componentDidUpdate(
		oldProps: Record<string, any>,
		newProps: Record<string, any>,
	): boolean {
		return !isEqual(oldProps, newProps);
	}

	render() {
		return this.compile(input, { ...this.props });
	}
}

export { Input };
