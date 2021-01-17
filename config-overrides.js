const { override, fixBabelImports, addLessLoader } = require("customize-cra");

module.exports = override(
  // antd essential packages, only rely on import
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    // automate all relate style
    style: true,
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: { "@primary-color": "#1DA57A" },
    },
  })
);
