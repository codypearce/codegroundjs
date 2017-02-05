var opts = {
    html: true,
    css: true,
    js: true,
    height: 1000,
    width: '100%',
    layout: 'half',
    initialFull: 'editor',
    style: 'rows',
    initialTab: 'css',
    fullscreen: true,
    topbar: true,
    title: 'test'
};
var codeground = new Codeground(opts);

codeground.initCodeground('codeground');
codeground.preset('<h1>test</h1>', 'h1{color:red}', 'console.log("test")');
