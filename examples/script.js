var opts = {
    html: true,
    css: true,
    js: true
};
var codeground = new Codeground('codeground', opts);
codeground.preset('<h1>test</h1>', 'h1{color:red}', 'console.log("test")');
