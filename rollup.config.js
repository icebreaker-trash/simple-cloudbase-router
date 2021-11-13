import typescript from '@rollup/plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import alias from '@rollup/plugin-alias'

/** @type {import('rollup').RollupOptions} */
const config = {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
    sourcemap: true
  },

  plugins: [alias({
    entries: {
      '#types': './types'
    }
  }),
  nodeResolve(), commonjs(), typescript({ tsconfig: './tsconfig.json' })]
}

export default config
