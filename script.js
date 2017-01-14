function Codeground(id, opts) {
    var codeground;
    if(id) {
        codeground = document.getElementById(id);
    } else {
        codeground = document.getElementById('codeground');
    }

    // Initialize editors
    var editorsDiv = document.createElement("div");
    editorsDiv.className += "editors half";
    codeground.appendChild(editorsDiv);

    // Initialize output
    var outputDiv = document.createElement("div");
    outputDiv.className += "output half";
    codeground.appendChild(outputDiv);

    // Functions
    function createEditor(editor) {
        var div = document.createElement("div");
        div.id = editor;
        div.className += "editor";
        editorsDiv.appendChild(div);

        var header = document.createElement("h2");
        header.textContent = editor
        div.appendChild(header)


        var code = document.createElement("div");
        code.className += "code";
        div.appendChild(code);

        var textarea = document.createElement("textarea");
        code.appendChild(textarea);
    }


    // Default Options
    this.options = {
        html: true,
        css: true,
        js: true
    }
    if(opts) {
        this.options.html = opts.html,
        this.options.css = opts.css,
        this.options.js = opts.js
    }
    if(this.options.html) {
        createEditor('html', editorsDiv);
        htmlEditor = document.querySelector('#html textarea')
     }
    if(this.options.css) {
        createEditor('css', editorsDiv);
        cssEditor = document.querySelector('#css textarea');
    }
    if(this.options.js) {
        createEditor('js', editorsDiv);
        jsEditor = document.querySelector('#js textarea');
    }

    function keyupRender() {
        if(htmlEditor) {
            htmlEditor.addEventListener('keyup', function() {
                render();
            }, false);
        }
        if(this.cssEditor) {
            cssEditor.addEventListener('keyup', function() {
                render();
            }, false);
        }
        if(jsEditor) {
            jsEditor.addEventListener('keyup', function() {
                render();
            }, false);
        }

    }

    this.preset = function(presetHTML, presetCSS, presetJS) {
        if(presetHTML)
            htmlEditor.value += presetHTML;
        if(presetCSS)
            cssEditor.value += presetCSS;
        if(presetJS)
            jsEditor.value += presetJS;
        render();
    }

    function render() {
        var source = prepareSource();

        var iframe = document.querySelector('.output iframe'),
            iframe_doc = iframe.contentDocument;

        iframe_doc.open();
        iframe_doc.write(source);
        iframe_doc.close();
    };


    function prepareSource() {
        var html = htmlEditor.value,
            css = this.cssEditor.value,
            js = this.jsEditor.value,
            src = '';

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

        src = baseTemplate.replace('</body>', html + '</body>');

        css = '<style>' + css + '</style>';
        src = src.replace('</head>', css + '</head>');

        js = '<script>' + js + '</script>';
        src = src.replace('</body>', js + '</body>');

        return src;
    };




    var iframe = document.createElement('iframe');
    outputDiv.appendChild(iframe);

    keyupRender();
}
var opts = {
    html: true,
    css: true,
    js: true
}
var codeground = new Codeground('codeground', opts);
console.log(codeground.options);
codeground.preset('<h1>test</h1>', 'h1{color:red}', 'console.log("test")');
