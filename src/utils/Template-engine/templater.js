class Templator {
	_TEMPLATE_REGEXP = /\{\%(.*?)\%\}/gi;
	_REGEXP_CTX = /\(\)\(\%(.*?)\%\)/gi;

	constructor(template) {
		this._template = template;
	}

	compile(ctx) {
		const html = this._compileTemplate(ctx)
		return html;
	}

	_compileTemplate = (ctx) => {
		let tmpl = this._template;
		let key = null;
		const regExp = this._TEMPLATE_REGEXP;

		while ((key = regExp.exec(tmpl))) {
			if (key[1]) {
				const tmplValue = key[1].trim();
				const data = this.get(ctx, tmplValue);
				console.log(data);
				// console.log(typeof data);

				if (typeof data === "function") {
					window[tmplValue] = data;
					tmpl = tmpl.replace(
						new RegExp(key[0], "gi"),
						`window.${tmplValue}()`
					);

					const keyCtx = this._REGEXP_CTX.exec(tmpl);
					if (keyCtx) {
						tmpl = tmpl.replace(keyCtx[0], `.${keyCtx[1].trim()}()`);
					}
				}

				tmpl = tmpl.replace(new RegExp(key[0], "gi"), data);
			}
			continue;
		}

		return tmpl;
	}

	get(obj, path, defaultValue) {
		const keys = path.split('.');
		let result = obj;
		for (const key of keys) {
			const value = result[key];

			if (!value) {
				return defaultValue;
			}
			result = value;
		}
		return result || defaultValue;
	}

	getNode(ctx) {
		const element = document.createElement('div');
		element.insertAdjacentHTML('beforeend', this.compile(ctx).trim());

		return element.firstChild;
	}
}

export {
	Templator
};