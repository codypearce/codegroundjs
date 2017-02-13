var opts = {
    html: '/examples/es6/demo/demo.html',
    css: '/examples/es6/demo/style.css',
    js:  '/examples/es6/demo/script.js',
    htmlShow: true,
    cssShow: true,
    jsShow: true,
    layout: 'half',
    initialFull: 'editor',
    style: 'tabs',
    initialTab: 'html',
    fullscreen: false,
    topbar: true,
    title: 'Demo'
};
var codeground = new Codeground(opts);

codeground.initCodeground('codeground');
