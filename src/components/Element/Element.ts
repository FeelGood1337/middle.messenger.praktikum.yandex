import { Block } from '../../utils/Block/Block';
import { template } from './element.tmpl';

type TProps = {
  tag: string;
  className: string;
  content: string;
}

interface IElement {
  props: TProps;
  render(): ChildNode | HTMLElement;
}

class Element extends Block implements IElement {
  props: TProps;

  constructor(props: TProps) {
    super(props);
    this.props = props;
  }

  componentDidUpdate(oldProps: { [key: string]: any; }, newProps: { [key: string]: any; }): boolean {
		console.log('dadsasaa');
		return super.componentDidUpdate(oldProps, newProps)
	}

  render() {
    return this.compile(template, { ...this.props });
  }
}

export { Element };
