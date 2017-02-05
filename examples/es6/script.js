let opts = {
    html: true,
    css: true,
    js: true,
    height: 500,
    width: '100%',
    layout: 'half',
    initialFull: 'editor',
    style: 'tabs',
    initialTab: 'css',
    fullscreen: false,
    topbar: true,
    title: 'test'
};
let codeground = new Codeground(opts);

codeground.initCodeground('codeground');
codeground.preset('<h1>test</h1>', 'h1{color:red}', 'console.log("test")');
