// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { execSync } = require('child_process')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { sync: rimraf } = require('rimraf')

const rootPath = path.join(__dirname, '..')
const srcPath = path.join(rootPath, 'src')
const libPath = path.join(rootPath, 'lib')

rimraf(libPath)

const sources = fs.readdirSync(srcPath).filter(fileName => {
  const stats = fs.lstatSync(path.join(srcPath, fileName))
  return (stats.isDirectory() || stats.isFile()) && !['__tests__', '__mocks__'].includes(fileName)
})

for (const source of sources) {
  const importPath = `./lib/${path.basename(source, path.extname(source))}`
  const exportPath = path.join(rootPath, `${path.basename(source, path.extname(source))}.js`)
  fs.writeFileSync(exportPath, `module.exports = require(${JSON.stringify(importPath)})`)
}

try {
  execSync(`tsc`, { stdio: 'inherit' })
} catch (error) {
  process.exit(1)
}
