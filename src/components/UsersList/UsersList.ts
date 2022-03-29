import { Block } from '../../utils/Block/Block';
import isEqual from '../../utils/isEqualProps';
import { Templator } from '../../utils/Template-engine/templater';
import { template } from './UsersList.tmpl';

type TProps = {
	avatar: Block;
	login: string;
	events?: {
		click?: (arg: any) => any;
	};
};

const usersListTmpl = new Templator(template);

class UsersList extends Block {
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
		return this.compile(usersListTmpl, { ...this.props });
	}
}

export default UsersList;
