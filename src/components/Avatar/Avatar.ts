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

class Avatar implements IAvatar {

	props: TProps;

	constructor(props: TProps) {
		this.props = props;
	}

	render() {
		const { link, imgPath } = this.props;

		return avatarTmpl.compile({
			link,
			imgPath,
		}).getNode() as HTMLElement;
	}

}

export { Avatar };
