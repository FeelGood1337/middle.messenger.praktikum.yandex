import { Block } from '../../utils/Block/Block';
import { Templator } from '../../utils/Template-engine/templater';
import { template } from './title.tmpl';

type TProps = {
	text: string;
	className: string;
	tag: string;
}

interface ITitle {
	props: TProps;
	render(): ChildNode | HTMLElement;
}

const titleTmpl = new Templator(template);

class Title extends Block implements ITitle {
	props: TProps;
	constructor(props: TProps) {
		super(props);
		this.props = props;
	}

	render() {
		// return this.compile(template, { ...this.props });
		return titleTmpl.compile({ ...this.props }).getNode();
	}

}

export { Title };
