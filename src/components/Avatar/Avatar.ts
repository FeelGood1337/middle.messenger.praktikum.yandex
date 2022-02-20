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
		super('div', props);
		this.props = props;
	}

	render() {
		const { link, imgPath } = this.props;

		return this.compile(template, {
			link,
			imgPath,
		});
	}

}

export { Avatar };
