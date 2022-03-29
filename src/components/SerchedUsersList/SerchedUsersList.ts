import { Block } from '../../utils/Block/Block';
import isEqual from '../../utils/isEqualProps';
import { IUser } from '../../utils/Store/Store';
import { Templator } from '../../utils/Template-engine/templater';
import { template } from './SerchedUsersList.tmpl';

export type TProps = {
	users: IUser[];
};

const searchedUsersListTmpl = new Templator(template);

class SerchedUsersList extends Block {
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
		console.log(this.props);
		return this.compile(searchedUsersListTmpl, {});
	}
}

export { SerchedUsersList as default, TProps as STP };
