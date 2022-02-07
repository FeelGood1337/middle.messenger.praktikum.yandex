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

		const arrRegKey = [];
		const arrData = [];

		while ((key = regExp.exec(tmpl))) {
			if (key[1]) {
				const tmplValue = key[1].trim();
				const data = this.get(ctx, tmplValue);

				if (typeof data === "object") {
					const element = document.createElement('div');
					if (Array.isArray(data)) {
						data.map(el => {
							element.insertAdjacentHTML('beforeend', el.outerHTML);
						});
						tmpl = tmpl.replace(new RegExp(key[0], "gi"), element.outerHTML);
					}
					tmpl = tmpl.replace(new RegExp(key[0], "gi"), data.outerHTML);
				}

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

				arrRegKey.push(key[0]);
				arrData.push(data);
			}
			continue;
		}

		arrData.map((el, i) => tmpl = tmpl.replace(new RegExp(arrRegKey[i], "gi"), el));

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
		return result ?? defaultValue;
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