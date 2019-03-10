module.exports = {
  presets: [
    require('@coglite/devkit/src/babel/dev.js')
  ],
    plugins: [
        ["module-resolver", {
          root: ["."],
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.json'],
          alias: {"@coglite": "./src/packages"} //"underscore": "lodash"
        }],
    ],
}
