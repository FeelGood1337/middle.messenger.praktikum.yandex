import { withStore } from './WithStor';

export const withUserAndChats = withStore((state) => ({ ...state.user }));
