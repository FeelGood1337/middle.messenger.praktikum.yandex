import { Block } from '../../utils/Block/Block';
import { template } from './avatar.tmpl';

import './avatar.css';

type TProps = {
	link: string;
	imgPath: string;
}

interface IAvatar {
	props: TProps;
	render(): ChildNode | HTMLElement;
}

class Avatar extends Block implements IAvatar {
	props: TProps;

	constructor(props: TProps) {
		super(props);
		this.props = props;
	}

	render() {
		return this.compile(template, { ...this.props });
	}

}

export { Avatar };
