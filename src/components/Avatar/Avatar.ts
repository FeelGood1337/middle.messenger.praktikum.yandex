import { Block } from '../../utils/Block/Block';
import { Templator } from '../../utils/Template-engine/templater';
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

const avatarTmpl = new Templator(template);

class Avatar extends Block implements IAvatar {
	props: TProps;

	constructor(props: TProps) {
		super('div', props);
		this.props = props;
	}

	render() {
		const { link, imgPath } = this.props;

		return avatarTmpl.compile({
			link,
			imgPath,
		}).getNode();
	}

}

export { Avatar };
