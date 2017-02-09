import nodeResolve from 'rollup-plugin-node-resolve'

export default {
    entry: 'lib/main.js',
    dest: 'parallax-background-image.js',
    format: 'iife',
    external: ['mobx'],
    globals: {
        mobx: 'mobx'
    },
    plugins: [
        nodeResolve({
            skip: ['mobx']
        })
    ]
}