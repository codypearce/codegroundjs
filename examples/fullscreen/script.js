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
codeground.preset('<div id="clouds"><div class="cloud"></div></div>', '* {margin: 0;padding: 0;}body,html {overflow: hidden;width: 100%;height: 100%;}#clouds {padding: 100px 0;background: #00e4ff;z-index: -1;height:100%; width:100%}.cloud {width: 200px;height: 83px;background: #fff;border-radius: 200px;position: relative;z-index: 0; margin: 20px auto}.cloud:before {content: "";position: absolute;background: #fff;width: 150px;height: 80px;top: -15px;left: 10px;border-radius: 100px;transform: rotate(30deg);}.cloud:after {content: "";background: #fff;position: absolute;border-radius: 100px;transform: rotate(30deg);width: 120px;height: 120px;top: -55px;left: auto;right: 15px;}', 'console.log("test")');
