import nodeResolve from 'rollup-plugin-node-resolve'
import buble from 'rollup-plugin-buble'

export default {
  input: 'lib/main.js',
  plugins: [nodeResolve(), buble({ objectAssign: true })],
  output: {
    format: 'iife',
    file: 'parallax-background-image.js',
    name: 'parallax'
  }
}
