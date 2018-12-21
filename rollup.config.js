import nodeResolve from 'rollup-plugin-node-resolve'

const globals = {
  mobx: 'mobx',
  ['@ray851107/dom-scheduler']: 'domScheduler'
}

export default {
  input: 'lib/main.js',
  external: Object.keys(globals),
  plugins: [
      nodeResolve()
  ],
  output: {
    format: 'iife',
    file: 'parallax-background-image.js',
    name: 'Parallax',
    globals,
  }
}
