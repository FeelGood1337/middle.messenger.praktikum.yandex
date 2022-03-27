import { Block } from '../../utils/Block/Block';
import { Templator } from '../../utils/Template-engine/templater';
import { template } from './title.tmpl';

type TProps = {
	text: string;
	className: string;
	tag: string;
};

interface ITitle {
	props: TProps;
	render(): ChildNode | HTMLElement;
}

const titleTmpl = new Templator(template);

class Title extends Block implements ITitle {
	props: TProps;
	constructor(props: TProps) {
		super(props);
	}

	render(): any {
		// return titleTmpl.compile({ ...this.props });
		return this.compile(titleTmpl, { ...this.props });
	}
}

export { Title };
