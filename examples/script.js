var opts = {
    html: true,
    css: true,
    js: true,
    height: 500,
    width: 1000,
    layout: 'half',
    style: 'tabs',
    initialTab: 'html',
    topbar: true,
    title: 'test'
};
var codeground = new Codeground('codeground', opts);
codeground.preset('<h1>test</h1>', 'h1{color:red}', 'console.log("test")');
