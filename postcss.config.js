// module.exports = {
//   parser: 'sugarss',
//   map: false,
//   plugins: [
//     require("autoprefixer"),
//     require("postcss-nested"),
//     require("postcss-calc"),
//     require("postcss-import"),
//     require("postcss-url")({
//       url: "inline"
//     }),
//     require("cssnano")({
//       preset: "default",
//     }),
//   ]
// };
module.exports = {
  plugins: [
    require("autoprefixer"),
    require("cssnano")({
      preset: "default",
    }),
    require("postcss-url")({
      url: "inline"
    }),
  ],
};