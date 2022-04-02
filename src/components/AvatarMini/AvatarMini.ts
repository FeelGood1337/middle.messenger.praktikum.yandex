import { Block } from '../../utils/Block/Block';
import isEqual from '../../utils/isEqualProps';
import { Templator } from '../../utils/Template-engine/templater';
import { template } from './avatarMini.tmpl';

// import './avatarMini.css';

type TProps = {
	imgPath: string;
	width: string;
	height: string;
};

interface IAvatarMini {
	props: TProps;
	render(): DocumentFragment;
}

const avatarMiniTmpl = new Templator(template);

class AvatarMini extends Block implements IAvatarMini {
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
		return this.compile(avatarMiniTmpl, { ...this.props });
	}
}

export { AvatarMini };
