import { Block } from '../../utils/Block/Block';
import { Templator } from '../../utils/Template-engine/templater';
import { template } from './BackBtn.tmpl';

type TProps = {
	href: string;
	events?: {
		click?: (arg: any) => any;
	};
};

const backBtnTmpl = new Templator(template);

class BackBtn extends Block {
	props: TProps;
	constructor(props: TProps) {
		super(props);
	}

	render() {
		return this.compile(backBtnTmpl, { ...this.props });
	}
}

export default BackBtn;
