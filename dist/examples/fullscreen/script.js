var opts = {
    html: true,
    css: true,
    js: true,
    layout: 'half',
    initialFull: 'editor',
    style: 'rows',
    initialTab: 'html',
    fullscreen: true,
    topbar: true,
    title: 'test'
};
var codeground = new Codeground(opts);

codeground.initCodeground('codeground');
codeground.preset('/examples/es5/demo/demo.html', '/examples/es5/demo/style.css', '/examples/es5/demo/script.js');
