import { withStore } from './WithStor';

export const withUser = withStore((state) => ({ ...state.user }));
