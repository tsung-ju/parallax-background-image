import nodeResolve from 'rollup-plugin-node-resolve'
import buble from 'rollup-plugin-buble'

const globals = {
  ['@ray851107/dom-scheduler']: 'domScheduler'
}

export default {
  input: 'src/main.js',
  external: Object.keys(globals),
  plugins: [nodeResolve(), buble({ objectAssign: true })],
  output: {
    format: 'iife',
    file: 'parallax-background-image.js',
    name: 'parallax',
    globals
  }
}
