export default {
    entry: 'lib/main.js',
    dest: 'parallax-background-image.js',
    format: 'iife',
    external: ['mobx'],
    globals: {
        mobx: 'mobx'
    }
}