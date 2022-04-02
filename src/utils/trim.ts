/* eslint-disable @typescript-eslint/strict-boolean-expressions */
function trim(str: string, tmpl?: string) {
	if (!tmpl) {
		return str.trim();
	}
	const re = new RegExp(`^[${tmpl}]+|[${tmpl}]+$`, 'g');
	return str.replace(re, '');
}

export default trim;
