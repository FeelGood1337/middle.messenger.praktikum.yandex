module.exports = {
  parser: 'sugarss',
  map: false,
  plugins: [
    require("autoprefixer"),
    require("postcss-nested"),
    require("postcss-calc"),
  ]
};