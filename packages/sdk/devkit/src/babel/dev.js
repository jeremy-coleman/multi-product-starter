module.exports = {
  presets: [
    ["@babel/env", {
          targets: {browsers: "last 2 Chrome versions", node: "current"},
          modules: false
    }]
  ],
  plugins: [
            "react-hot-loader/babel",
            ["@babel/plugin-transform-typescript", {isTSX: true,}],
            ["@babel/plugin-proposal-decorators", {legacy: true}],
            ["@babel/plugin-syntax-object-rest-spread"],
            ["@babel/plugin-proposal-class-properties", {loose: true}],
            ["@babel/transform-react-jsx", {useBuiltIns: true}],
            //['@babel/plugin-transform-modules-commonjs'],
        ],
    sourceMaps: false
}