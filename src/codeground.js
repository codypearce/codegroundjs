/*eslint-disable no-unused-vars*/
function Codeground(id, opts) {
    var htmlEditor,
        htmlEditorCode,
        cssEditor,
        cssEditorCode,
        jsEditor,
        jsEditorCode,
        editorsDiv,
        codeground;

    // Default Options
    var options = {
        html: opts.html !== false,
        css: opts.css !== false,
        js: opts.js !== false,
        height: opts.height || 500,
        width: opts.width || 1000,
        layout: opts.layout || 'half', // whether editor/output takes up full width or half
        style: opts.style || 'tabs', // Tabs show editors full side, row shows each editor on top of each other
        topbar: opts.style === 'tabs' ? true : opts.topbar !== false,
        title: opts.title || 'Codeground'
    };

    initCodeground();

    function initCodeground() {
        if(id) {
            codeground = document.getElementById(id);
        } else {
            codeground = document.getElementById('codeground');
        }
        codeground.style.height = options.height + 'px';
        codeground.style.width = options.width + 'px';

        if(options.topbar) {
            createTopBar(options.title);
        }

        // Initialize editors
        editorsDiv = document.createElement('div');
        editorsDiv.className += 'editors half';
        codeground.appendChild(editorsDiv);

        // Initialize output
        var outputDiv = document.createElement('div');
        outputDiv.className += 'output half';
        codeground.appendChild(outputDiv);

        var editorHeight = options.height - 10; // shorter by the height of the topbar
        // Layouts: half(split 50%) or full
        if(options.layout === 'half') {
            editorsDiv.style.height = editorHeight + 'px';
            editorsDiv.style.width = (options.width / 2) + 'px';
            editorsDiv.style.float = 'left';
            outputDiv.style.height = editorHeight + 'px';
            outputDiv.style.width = (options.width / 2) + 'px';
            outputDiv.style.float = 'left';
        } else if (options.layout === 'full') {
            editorsDiv.style.height = editorHeight + 'px';
            editorsDiv.style.width = options.width + 'px';
            outputDiv.style.height = editorHeight + 'px';
            outputDiv.style.width = options.width  + 'px';
        }

        // Create all three Editors
        createEditor('html', editorsDiv);
        htmlEditor = document.querySelector('#html');
        htmlEditorCode = document.querySelector('#html textarea');


        createEditor('css', editorsDiv);
        cssEditor = document.querySelector('#css');
        cssEditorCode = document.querySelector('#css textarea');


        createEditor('js', editorsDiv);
        jsEditor = document.querySelector('#js');
        jsEditorCode = document.querySelector('#js textarea');

        // Add event listeners to each
        keyupRender(htmlEditorCode);
        keyupRender(cssEditorCode);
        keyupRender(jsEditorCode);

        // Create and add the iframe to the document
        var iframe = document.createElement('iframe');
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        outputDiv.appendChild(iframe);


        if(!options.html) {
            document.querySelector('#html').style.display = 'none';
        }
        if(!options.css) {
            document.querySelector('#css').style.display = 'none';
        }
        if(!options.js) {
            document.querySelector('#js').style.display = 'none';
        }

        if(options.style === 'tabs') {
            if(options.html) {
                createTabBtn('HTML');
                var htmlBtn = document.getElementById('htmlBtn');
                htmlBtn.addEventListener('click', function() {
                    tabs('html');
                });
            }
            if(options.css) {
                createTabBtn('CSS');
                var cssBtn = document.getElementById('cssBtn');
                cssBtn.addEventListener('click', function() {
                    tabs('css');
                });
            }
            if(options.js) {
                createTabBtn('JS');
                var jsBtn = document.getElementById('jsBtn');
                jsBtn.addEventListener('click', function() {
                    tabs('js');
                });
            }

            tabs('css');
        } else {
            htmlEditor.style.height = '33%';
            cssEditor.style.height = '33%';
            jsEditor.style.height = '33%';
        }
    }

    // Public Functions for more options
    this.preset = function(presetHTML, presetCSS, presetJS) {
        if(presetHTML)
            htmlEditorCode.value += presetHTML;
        if(presetCSS)
            cssEditorCode.value += presetCSS;
        if(presetJS)
            jsEditorCode.value += presetJS;
        render();
    };

    // Functions
    function createEditor(editor) {
        var div = document.createElement('div');
        div.id = editor;
        div.className += 'editor';
        editorsDiv.appendChild(div);

        var header = document.createElement('h2');
        header.textContent = editor;
        div.appendChild(header);

        var textarea = document.createElement('textarea');
        textarea.style.width = '100%';
        textarea.style.height = '100%';
        textarea.style.border = 'none';
        textarea.style.resize = 'none';
        textarea.style.padding = '10px';
        textarea.addEventListener('focus', function () {
            this.style.outline = 'none';
        });

        div.appendChild(textarea);
    }

    function createTopBar(barTitle) {
        var topBar = document.createElement('div');
        topBar.id = 'topBar';
        topBar.style.height = '50px';
        topBar.style.width = '100%';
        topBar.style.backgroundColor = 'black';
        codeground.appendChild(topBar);

        var title = document.createElement('h2');
        title.textContent = barTitle;
        title.style.color = 'white';
        title.style.textAlign ='right';
        title.style.padding = '10px';
        title.style.display = 'inline';
        title.style.float = 'right';
        title.style.margin = 0;
        topBar.appendChild(title);
    }

    function createTabBtn(name) {
        var btn = document.createElement('button');
        btn.id = name.toLowerCase() + 'Btn';
        btn.textContent = name;
        btn.style.height = '50px';
        btn.style.width = '70px';
        btn.style.background = 'none';
        btn.style.border = 'none';
        btn.style.borderRight = '1px solid white';
        btn.style.outline = 'none';
        btn.style.color = 'white';
        btn.addEventListener('mouseenter', function() {
            btn.style.background = 'white';
            btn.style.color = 'black';
            btn.style.cursor = 'pointer';
        });
        btn.addEventListener('mouseleave', function() {
            btn.style.background = 'none';
            btn.style.color = 'white';
        });
        var topBar = document.getElementById('topBar');
        topBar.appendChild(btn);
    }

    function tabs(initial) {
        if(initial === 'html') {
            htmlEditor.style.display = 'block';
            htmlEditor.style.height = '100%';
            cssEditor.style.display = 'none';
            jsEditor.style.display = 'none';
        } else if(initial === 'css') {
            htmlEditor.style.display = 'none';
            cssEditor.style.display = 'block';
            cssEditor.style.height = '100%';
            jsEditor.style.display = 'none';
        } else if(initial === 'js') {
            htmlEditor.style.display = 'none';
            cssEditor.style.display = 'none';
            jsEditor.style.display = 'block';
            jsEditor.style.height = '100%';
        }
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
    }


    function prepareSource() {
        var html = htmlEditorCode.value,
            css = cssEditorCode.value,
            js = jsEditorCode.value,
            src = '';

        var baseTemplate =
            '<!doctype html>\n' +
            '<html>\n\t' +
            '<head>\n\t\t' +
            '<meta charset=\'utf-8\'>\n\t\t' +
            '<title>Test</title>\n\n\t\t\n\t' +
            '</head>\n\t' +
            '<body>\n\t\n\t' +
            '</body>\n' +
            '</html>';

        src = baseTemplate.replace('</body>', html + '</body>');

        css = '<style>' + css + '</style>';
        src = src.replace('</head>', css + '</head>');

        js = '<script>' + js + '</script>';
        src = src.replace('</body>', js + '</body>');

        return src;
    }
}
