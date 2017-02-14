import nodeResolve from 'rollup-plugin-node-resolve'

const globals = {
    mobx: 'mobx',
    ['dom-scheduler']: 'domScheduler'
}

export default {
    entry: 'lib/main.js',
    dest: 'parallax-background-image.js',
    format: 'iife',
    moduleName: 'Parallax',
    globals,
    external: Object.keys(globals),
    plugins: [
        nodeResolve({
            skip: Object.keys(globals)
        })
    ]
}