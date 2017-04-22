var css = '#clouds,body,html{height:100%;width:100%}\n *{margin:0;padding:0} \n body,html{overflow:hidden} \n #clouds{padding:100px 0;background:#00e4ff;z-index:-1} \n.cloud{width:200px;height:83px;background:#fff;border-radius:200px;position:relative;z-index:0;margin:20px auto} \n.cloud:after,.cloud:before{content:"";background:#fff;position:absolute;border-radius:100px;transform:rotate(30deg)} \n.cloud:before{width:150px;height:80px;top:-15px;left:10px} \n.cloud:after{width:120px;height:120px;top:-55px;left:auto;right:15px}';
var opts = {
    htmlStr: '<div id="clouds">\n \t<div class="cloud"></div> \n</div>',
    cssStr: css,
    jsStr: 'console.log("This is working!")', 
    htmlShow: true,
    cssShow: true,
    jsShow: true,
    layout: 'half',
    initialFull: 'editor',
    style: 'tabs',
    initialTab: 'html',
    fullscreen: true,
    topbar: true,
    title: 'Demo'
};
var codeground = new Codeground('codeground', opts);
