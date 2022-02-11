type TObjectKeys = {
	[key: string]: any;
}

interface ITemplator {
	_TEMPLATE_REGEXP: RegExp;
	_REGEXP_CTX: RegExp;
	_template: string;
	_html: string;
	compile(ctx: TObjectKeys): any;
	_compileTemplate(ctx: TObjectKeys): string;
	get(
		obj: TObjectKeys, 
		path: string, 
		defaultValue?: string | boolean | Function | undefined
	): string | boolean | Function | undefined | TObjectKeys;
	getNode(): ChildNode | HTMLElement;
}


class Templator implements ITemplator {
	_TEMPLATE_REGEXP = /\{\%(.*?)\%\}/gi;
	_REGEXP_CTX = /\(\)\(\%(.*?)\%\)/gi;
	_template: string;
	_html: string;

	constructor(template:string) {
		this._template = template;
		this._html = '';
	}

	compile(ctx: TObjectKeys) {
		this._html = this._compileTemplate(ctx)
		return this;
	}

	_compileTemplate(ctx: TObjectKeys) {
		let tmpl = this._template;
		let key = null;
		const regExp = this._TEMPLATE_REGEXP;

		const arrRegKey: string[] = [];
		const arrData: string[] = [];

		while ((key = regExp.exec(tmpl))) {
			if (key[1]) {
				const tmplValue: any = key[1].trim();
				const data: any = this.get(ctx, tmplValue);

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
	
	get(obj: TObjectKeys, path: string, defaultValue?: string | boolean | Function | undefined) {
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

	getNode() {
		const element = document.createElement('div');
		element.insertAdjacentHTML('beforeend', this._html.trim());

		return element.firstChild as HTMLElement;
	}
}

export {
	Templator
};