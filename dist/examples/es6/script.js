let opts = {
    html: true,
    css: true,
    js: true,
    layout: 'half',
    initialFull: 'editor',
    style: 'tabs',
    initialTab: 'html',
    fullscreen: false,
    topbar: true,
    title: 'test'
};
let codeground = new Codeground(opts);

codeground.initCodeground('codeground');
codeground.preset('/examples/es5/demo/demo.html', '/examples/es5/demo/style.css', '/examples/es5/demo/script.js');
