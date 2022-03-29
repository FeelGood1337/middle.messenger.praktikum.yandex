/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Block } from '../../utils/Block/Block';
import isEqual from '../../utils/isEqualProps';
import { IUser } from '../../utils/Store/Store';
import { Templator } from '../../utils/Template-engine/templater';
import { UsersList, AvatarMini, Element } from '..';
import avatarIcon from '../../../static/images/Avatar.svg';
import { template } from './SerchedUsersList.tmpl';
import { AVATAR_URL } from '../../constants';

export type TProps = {
	users: IUser[];
};

export interface ISerchedUsersList {
	usersArr: number[];
}

const searchedUsersListTmpl = new Templator(template);

class SerchedUsersList extends Block implements ISerchedUsersList {
	props: TProps;
	public usersArr: number[];
	constructor(props: TProps) {
		super(props);
		this.usersArr = [];
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
							imgPath: user.avatar
								? `${AVATAR_URL}${user.avatar}`
								: avatarIcon,
							width: '32',
							height: '32',
						}),
						login: user.login,
						events: {
							click: (e: Event) => {
								e.preventDefault();
								this.usersArr.push(user.id);
							},
						},
					}),
			);
		} else {
			return new Element({
				tag: 'div',
				className: 'hiden',
				content: ' ',
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

export { SerchedUsersList as default, TProps as STP, ISerchedUsersList as IST };
