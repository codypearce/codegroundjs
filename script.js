var opts = {
    htmlStr: '<div>foo</div>',
    cssStr: '* { color: black}',
    jsStr: 'console.log("test")', 
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
var codeground = new Codeground('codeground', opts);
