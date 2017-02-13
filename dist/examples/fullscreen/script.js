var opts = {
    html: '/examples/fullscreen/demo/demo.html',
    css: '/examples/fullscreen/demo/style.css',
    js:  '/examples/fullscreen/demo/script.js',
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
