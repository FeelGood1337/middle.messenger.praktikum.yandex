import { Block } from '../../utils/Block/Block';
import isEqual from '../../utils/isEqualProps';
import { IUser } from '../../utils/Store/Store';
import { Templator } from '../../utils/Template-engine/templater';
import { UsersList, AvatarMini, Element } from '..';
import { template } from './SerchedUsersList.tmpl';
import { AVATAR_URL } from '../../constants';

export type TProps = {
	users: IUser[];
	chatId: number;
};

const searchedUsersListTmpl = new Templator(template);

class SerchedUsersList extends Block {
	props: TProps;
	constructor(props: TProps) {
		super(props);
	}

	protected initChildren(): void {
		this.children = {
			children: this.getChildrens(),
		};
	}

	private getChildrens() {
		const { users } = this.props;
		if (users !== undefined) {
			return users.map(
				(user: IUser) =>
					new UsersList({
						avatar: new AvatarMini({
							imgPath: `${AVATAR_URL}${user.avatar}`,
							width: '32',
							height: '32',
						}),
						login: user.login,
					}),
			);
		} else {
			return new Element({
				tag: 'div',
				className: '',
				content: '',
			});
		}
	}

	componentDidUpdate(
		oldProps: Record<string, any>,
		newProps: Record<string, any>,
	): boolean {
		return !isEqual(oldProps, newProps);
	}

	render() {
		this.initChildren();
		return this.compile(searchedUsersListTmpl, {});
	}
}

export { SerchedUsersList as default, TProps as STP };
