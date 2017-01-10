var htmlEditor = document.querySelector('#html textarea'),
    cssEditor = document.querySelector('#css textarea'),
    jsEditor = document.querySelector('#js textarea');

var editors = [htmlEditor, cssEditor, jsEditor];

editors.forEach(function(editor, i, arr) {
   editor.addEventListener('keyup', function() {
       render();
   }, false);
});


var baseTemplate =
    "<!doctype html>\n" +
    "<html>\n\t" +
    "<head>\n\t\t" +
    "<meta charset=\"utf-8\">\n\t\t" +
    "<title>Test</title>\n\n\t\t\n\t" +
    "</head>\n\t" +
    "<body>\n\t\n\t" +
    "</body>\n" +
    "</html>";

var prepareSource = function() {
    var html = htmlEditor.value,
        css = cssEditor.value,
        js = jsEditor.value,
        src = '';

    src = baseTemplate.replace('</body>', html + '</body>');

    css = '<style>' + css + '</style>';
    src = src.replace('</head>', css + '</head>');

    js = '<script>' + js + '</script>';
    src = src.replace('</body>', js + '</body>');

    return src;
};
var render = function() {
    var source = prepareSource();

    var iframe = document.querySelector('#output iframe'),
        iframe_doc = iframe.contentDocument;

    iframe_doc.open();
    iframe_doc.write(source);
    iframe_doc.close();
};

var preset = function(presetHTML, presetCSS, presetJS) {
    if(presetHTML)
        htmlEditor.value += presetHTML;
    if(presetCSS)
        cssEditor.value += presetCSS;
    if(presetJS)
        jsEditor.value += presetJS;
    render();
}
preset('<h1>test</h1>', 'h1{color:red}', 'console.log("test")');

function codeground() {
    var codeground = document.getElementById('codeground');

    var editorsDiv = document.createElement("div");
    editorsDiv.className += "editors half";
    var outputDiv = document.createElement("div");
    outputDiv.className += "output half";

    codeground.appendChild(editorsDiv);
    codeground.appendChild(outputDiv);

    // Create Editors
    var htmlDiv = document.createElement("div");
    htmlDiv.className += "html lang";
    editorsDiv.appendChild(htmlDiv);

    // Create Editors
    var cssDiv = document.createElement("div");
    cssDiv.className += "css lang";
    editorsDiv.appendChild(cssDiv);

    // Create Editors
    var jsDiv = document.createElement("div");
    jsDiv.className += "js lang";
    editorsDiv.appendChild(jsDiv);
}

codeground();
