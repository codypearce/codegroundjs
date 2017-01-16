function Codeground(id, opts) {
    var codeground;
    if(id) {
        codeground = document.getElementById(id);
    } else {
        codeground = document.getElementById('codeground');
    }

    // Default Options
    this.options = {
        html: true,
        css: true,
        js: true,
        height: 500,
        width: 1000,
        layout: 'half',
        title: 'Codeground'
    }

    var topBar = document.createElement("div");
    topBar.style.height = '50px';
    topBar.style.width = '100%';
    topBar.style.backgroundColor = 'black';
    codeground.appendChild(topBar)

    var title = document.createElement("h2");
    title.textContent = this.options.title;
    title.style.color = 'white';
    title.style.textAlign ='right';
    title.style.padding = "10px";
    topBar.appendChild(title);

    codeground.style.height = this.options.height + 'px';
    codeground.style.width = this.options.width + 'px';

    // Initialize editors
    var editorsDiv = document.createElement("div");
    editorsDiv.className += "editors half";
    codeground.appendChild(editorsDiv);

    // Initialize output
    var outputDiv = document.createElement("div");
    outputDiv.className += "output half";
    codeground.appendChild(outputDiv);


    // Layouts: half(split 50%) or full
    if(this.options.layout === 'half') {
        editorsDiv.style.height = this.options.height + 'px';
        editorsDiv.style.width = (this.options.width / 2) + 'px';
        outputDiv.style.height = this.options.height + 'px';
        outputDiv.style.width = (this.options.width / 2) + 'px';
    } else if (this.options.layout === 'full') {
        editorsDiv.style.height = this.options.height + 'px';
        editorsDiv.style.width = this.options.width + 'px';
        outputDiv.style.height = this.options.height + 'px';
        outputDiv.style.width = this.options.width  + 'px';
    }

    // Create all three Editors
    createEditor('html', editorsDiv);
    htmlEditor = document.querySelector('#html textarea')
    createEditor('css', editorsDiv);
    cssEditor = document.querySelector('#css textarea');
    createEditor('js', editorsDiv);
    jsEditor = document.querySelector('#js textarea');


    // Add event listeners to each
    keyupRender(htmlEditor);
    keyupRender(cssEditor);
    keyupRender(jsEditor);

    // Create and add the iframe to the document
    var iframe = document.createElement('iframe');
    outputDiv.appendChild(iframe);


    if(opts) {
        this.options.html = opts.html,
        this.options.css = opts.css,
        this.options.js = opts.js
    }
    if(!this.options.html) {
        document.querySelector('#html').style.display = 'none';
    }
    if(!this.options.css) {
        document.querySelector('#css').style.display = 'none';
    }
    if(!this.options.js) {
        document.querySelector('#js').style.display = 'none';
    }

    // Public Functions for more options
    this.preset = function(presetHTML, presetCSS, presetJS) {
        if(presetHTML)
            htmlEditor.value += presetHTML;
        if(presetCSS)
            cssEditor.value += presetCSS;
        if(presetJS)
            jsEditor.value += presetJS;
        render();
    }


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
    function keyupRender(editor) {
        editor.addEventListener('keyup', function() {
            render();
        }, false);
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
}
var opts = {
    html: true,
    css: true,
    js: true
}
var codeground = new Codeground('codeground', opts);
codeground.preset('<h1>test</h1>', 'h1{color:red}', 'console.log("test")');
