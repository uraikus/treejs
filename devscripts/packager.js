const {exec} = require('child_process')
const {readFileSync, writeFileSync} = require('fs')
const pack = JSON.parse(readFileSync('./package.json'))

exec('parcel build src/tree.js -d ./ --out-file tree.js', () => {
  let data = getFile('./src/tree.js') + getFile('./src/templates.js') + getFile('./src/state.js')
  writeFileSync(`./versions/tree.v${pack.version}.js`, data)
  writeFileSync('./versions/~tree.js', data)
})

function getFile (filepath) {
  return readFileSync(filepath, 'utf8').replace(/(import|export)[^\n]+/g, '').replace(/\n +/g, '\n').replace(/\n+/g, '\n')
}
