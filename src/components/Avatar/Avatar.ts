import { Block } from '../../utils/Block/Block';
import { Templator } from '../../utils/Template-engine/templater';
import { template } from './avatar.tmpl';

import './avatar.css';
import isEqual from '../../utils/isEqualProps';

type TProps = {
	link?: string;
	imgPath: string;
};

interface IAvatar {
	props: TProps;
	render(): ChildNode | HTMLElement;
}

const avatarTmpl = new Templator(template);
class Avatar extends Block implements IAvatar {
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
		return this.compile(avatarTmpl, { ...this.props });
	}
}

export { Avatar };
