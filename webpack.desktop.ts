process.setMaxListeners(100)
import webpack, {Configuration} from 'webpack'
import path from 'path'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import nodeExternals from "webpack-node-externals";
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import TsPathAliasPlugin from 'tsconfig-paths-webpack-plugin'
import { WebpackPluginServe } from 'webpack-plugin-serve'
//import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';

const DIST_CLIENT = path.resolve(__dirname, 'dist/client') as "__dirname/dist/client";

var pkgJson =  require('./package.json')

//var deps = Object.keys(pkgJson.dependencies || {}).filter(pkg => pkg.indexOf('mobx'))

const containsFilter = (...values) => (filename) => values.some(value => filename.indexOf(value) >= 0);
const isNodeModuleFile = containsFilter("node_modules");
const endsWithFilter = (...extensions) => (filename) =>  extensions.some(ext =>filename.endsWith(ext));

//divide by 2 bc hyperthreads
const CPU_COUNT = ((require('os').cpus().length / 2) - 1)

export const appConfig: Configuration = {

mode: 'development',
target: "electron-renderer",
//externals: deps,
//externals: [nodeExternals()],

node: {
  __dirname: false,
  __filename: false
},

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



entry: ['./src/client/main.tsx', 'webpack-plugin-serve/client'],
//entry: {'main': "./src/client/main.tsx"}, for prod

output: {
    path: DIST_CLIENT,
    filename: 'main.js',
    //libraryTarget: 'commonjs2',
    //libraryTarget: 'jsonp'
  },

module: { 
  rules: [
      
      //{test: /\.(sa|sc|c)ss$/, use: [MiniCssExtractPlugin.loader,'css-loader', 'postcss-loader','sass-loader']},
      {
          test: /\.tsx?$/,
          //use: ["react-hot-loader/webpack", {loader: 'ts-loader' , options: {transpileOnly: true}}],
          use: ["react-hot-loader/webpack", "babel-loader"],
          //use: ["react-hot-loader/webpack", "babel-loader", {loader: 'ts-loader' , options: {transpileOnly: true}}],
          exclude: [/node_modules/,  /\$raw.jsx?$/, /\$.d.ts$/, path.join(__dirname, 'src/client/_samples/tfjs/som-designer/assets')]
      },
      
      //{test: /\.(glsl|frag|vert)$/, loader: 'raw-loader', exclude: /node_modules/ },
      //{test: /\.(glsl|frag|vert)$/, loader: 'glslify-loader', exclude: /node_modules/ },
      //{test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,loader: 'file-loader'}

  ]},

plugins:[

  //call me mayb
  //new FriendlyErrorsWebpackPlugin({ clearConsole: true }),
  //new webpack.optimize.ModuleConcatenationPlugin(),
  
  new webpack.NamedModulesPlugin(),
  //@ts-ignore
  new HtmlWebpackPlugin({template: 'src/client/index.html'}),
  new CleanWebpackPlugin(),
  new MiniCssExtractPlugin(),

  //new HardSourceWebpackPlugin(),
  new WebpackPluginServe({
    hmr: true,
    log: { level: 'debug', timestamp: false},
    progress: false, //'minimal',
    host: "localhost",
    historyFallback: true,
    static: [DIST_CLIENT]
  })
  ],

  optimization: {
    //minimize: true,
    //portableRecords: true,
    //usedExports: true,
    //sideEffects: true,
    //flagIncludedChunks: true,
    //concatenateModules: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
}


export const desktopConfig: Configuration = {

mode: 'production',

node: {
  __dirname: false,
  __filename: false
},

resolve:{ 
    extensions: [".ts", ".tsx", ".js", ".jsx", ".mjs"],
    mainFields: ['module', 'browser', 'main'],
},

externals: [nodeExternals()],

target: "node",

entry: "./src/desktop/main.ts",

output: {
    path: path.join(__dirname, 'dist', 'desktop'),
    //pathinfo: true,
    filename: 'main.js',
    libraryTarget: 'commonjs2',
    publicPath: ''
},


module: { 
      rules:[
        {test: /\.[tj]sx?$/, use: [{loader: 'ts-loader' , options: {transpileOnly: true}}]}
    ]
}

}

export const config = [appConfig, desktopConfig]
