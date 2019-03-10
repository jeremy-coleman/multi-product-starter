import execa from 'execa'
import webpack from 'webpack'
import {config} from "./webpack.desktop"
import logSymbols from 'log-symbols'
import {write} from 'fs-jetpack'


const args = process.argv.slice(1);
args.forEach(arg => console.info(arg));
args.some(arg => arg === '--sayhi') && console.log('hi');


const compiler = webpack(config);
let electronStarted = false;

console.info(logSymbols.info, 'Bundling');

const watching = compiler.watch({}, (err, stats) => {

  if (!err && !stats.hasErrors() && !electronStarted) {
    electronStarted = true;

    execa('electron', ["."], { stdio: "inherit" })
      .on("close", () => {
        console.info(logSymbols.success, 'Desktop exiting safely')
        watching.close(process.exit(0))
      });
    console.info(logSymbols.success, 'Opening desktop shell');
    // if (stats){
    //   const jsonStats = stats.toString()
    //   write('stats.json', jsonStats)
    //   console.info(stats.toJson())
    // }
  if (err){console.warn(err)}
  }
})


//build only
//compiler.run((err, stats) => {})
