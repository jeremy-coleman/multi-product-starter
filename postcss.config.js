module.exports = {
  plugins: {
        'postcss-easy-import': {},
        'postcss-preset-env': { browsers: 'last 2 Chrome version' },
        'postcss-svgo': {},
        'postcss-csso': { restructure: false }
  }
}
