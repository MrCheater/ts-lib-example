import fs from 'fs'
import path from 'path'
import builtins from 'builtin-modules'
import nodeResolve from '@rollup/plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import typescript from '@rollup/plugin-typescript'
import replace from '@rollup/plugin-replace'
import cleaner from 'rollup-plugin-cleaner'

import tsconfig from './tsconfig.json'
import pkg from './package.json'

tsconfig.compilerOptions.noEmitOnError = false
delete tsconfig.compilerOptions.declaration
delete tsconfig.compilerOptions.declarationDir
fs.writeFileSync(path.join(__dirname, 'tsconfig.rollup.json'), JSON.stringify(tsconfig, null, 2))

const extensions = ['.ts']
//
const makeExternalPredicate = externalArr => {
  if (externalArr.length === 0) {
    return () => false
  }
  const pattern = new RegExp(`^(${externalArr.join('|')})($|/)`)
  return id => pattern.test(id)
}

const external = makeExternalPredicate([
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
  ...builtins
])

export default [
  // CommonJS
  {
    input: 'src/index.ts',
    output: { file: 'lib/index.js', format: 'cjs', indent: false, sourcemap: true },
    external,
    plugins: [
      nodeResolve({
        extensions
      }),
      typescript({ tsconfig: './tsconfig.rollup.json' }),
      babel({
        extensions
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      cleaner({
        targets: ['./tsconfig.rollup.json']
      })
    ]
  },
  // ES
  {
    input: 'src/index.ts',
    output: { file: 'es/index.js', format: 'es', indent: false, sourcemap: true },
    external,
    plugins: [
      nodeResolve({
        extensions
      }),
      typescript({ tsconfig: './tsconfig.rollup.json' }),
      babel({
        extensions
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      cleaner({
        targets: ['./tsconfig.rollup.json']
      })
    ]
  }
]
