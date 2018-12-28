import buble from 'rollup-plugin-buble'

export default {
  input: 'lib/main.js',
  plugins: [buble({ objectAssign: true })],
  output: {
    format: 'iife',
    file: 'parallax-background-image.js',
    name: 'parallax'
  }
}
