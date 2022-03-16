import Spinner from '../components/Spinner/Spinner';
import { render } from './renderDOM';

const spinner = new Spinner();

export const showSpinner = (): void => {
	render('#Chat-app', spinner);
};

export const hideSpinner = (): void => {
	spinner.hide();
};
