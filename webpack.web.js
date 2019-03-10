const { resolve } = require('path');

const webpack = require('webpack');
const { WebpackPluginServe: Serve } = require('webpack-plugin-serve');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsPathAliasPlugin = require('tsconfig-paths-webpack-plugin')
const watch = process.env.NODE_ENV === 'development';
const outputPath = resolve(__dirname, 'dist', 'client');

module.exports = {
  entry: ['./src/client/main.tsx', 'webpack-plugin-serve/client'],
  mode: process.env.NODE_ENV,
  stats:"minimal",
  devtool: 'cheap-eval-source-map',
  resolve:{ 
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json", ".mjs", ".wasm"],
    //mainFields: ['module', 'browser', 'main'],
    plugins: [
      new TsPathAliasPlugin({configFile: './tsconfig.json'})
    ],
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
},

  module: {
    rules: [
      {
        test: /\.([tj]sx?)$/,
        exclude: /node_modules/,
        use: ['react-hot-loader/webpack','babel-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.woff(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'fonts/[name].[ext]',
            mimetype: 'application/font-woff'
          }
        }
      },
      {
        test: /\.woff2(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'fonts/[name].[ext]',
            mimetype: 'application/font-woff2'
          }
        }
      },
      {
        test: /\.(otf)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]'
          }
        }
      },
      {
        test: /\.ttf(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'fonts/[name].[ext]',
            mimetype: 'application/octet-stream'
          }
        }
      },
      {
        test: /\.svg(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'images/[name].[ext]',
            mimetype: 'image/svg+xml'
          }
        }
      },
      {
        test: /\.(png|jpg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'images/[name].[ext]'
          }
        }
      }
    ]
  },
  output: {
    path: outputPath,
    publicPath: '/',
    filename: 'client.js'
  },
  plugins: [
    new HtmlWebpackPlugin({template: 'src/client/index.html'}),
    new webpack.DefinePlugin({'process.env': {NODE_ENV: JSON.stringify(process.env.NODE_ENV)}}),
    new webpack.NamedModulesPlugin(),
    new Serve({
      // note: this value is true by default
      hmr: true,
      host: "localhost",
      progress: false,
      historyFallback: true,
      static: [outputPath]
    })
  ],
    optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },

  watch
};
