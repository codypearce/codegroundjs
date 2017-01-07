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


// EDITORS

// CM OPTIONS
var codeMirrorOptions = {
    mode: 'text/html',
    gutter: true,
    lineNumbers: true,

    onChange: function (instance, changes) {
        render();
    }
};

// HTML EDITOR
var htmlTextArea = document.querySelector('#html textarea');
var htmlEditor = CodeMirror.fromTextArea(htmlTextArea, codeMirrorOptions);

codeMirrorOptions.mode = 'css';
var cssTextArea = document.querySelector('#css textarea');
var cssEditor = CodeMirror.fromTextArea(cssTextArea, codeMirrorOptions);


codeMirrorOptions.mode = 'javascript';
var jsTextArea = document.querySelector('#js textarea');
var jsEditor = CodeMirror.fromTextArea(jsTextArea, codeMirrorOptions);
