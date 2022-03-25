import Spinner from '../components/Spinner/Spinner';

const spinner = new Spinner();

export const showSpinner = (): void => {
	// render('#Chat-app', spinner);
	spinner.getContent().style.display = 'flex';
};

export const hideSpinner = (): void => {
	spinner.getContent().style.display = 'none';
};
