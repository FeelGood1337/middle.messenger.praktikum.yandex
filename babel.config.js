module.exports = (api) => {
	// Cache configuration is a required option
	api.cache(false);

	const presets = [
		'@babel/preset-typescript',
		'@parcel/babel-preset-env',
	];

	return {
		presets
	};
};