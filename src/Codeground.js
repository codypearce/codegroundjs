/*eslint-disable no-unused-vars*/
class Codeground {
    constructor(opts) {
        this.tabs = this.tabs.bind(this);
        this.render = this.render.bind(this);
        // Default Options
        this.options = {
            html: opts.html !== false,
            css: opts.css !== false,
            js: opts.js !== false,
            height: opts.height || 500,
            width: opts.width || '100%',
            layout: opts.layout || 'half', // whether editor/output takes up full width or half
            initialFull: opts.initialFull || 'output',
            style: opts.style || 'tabs', // Tabs show editors full side, row shows each editor on top of each other
            initialTab: opts.initialTab || 'css',
            fullscreen: opts.fullscreen || false,
            topbar: opts.style === 'tabs' ? true : opts.topbar !== false, // Must show if tabs are selected
            title: opts.title || 'Codeground'
        };
    }
    
    initCodeground(id) {
        if(id) {
            this.codeground = document.getElementById(id);
        } else {
            this.codeground = document.getElementById('codeground');
        }
        this.codeground.className = 'codeground';

        if(this.options.topbar) {
            this.createTopBar(this.options.title);
        }

        // Initialize editors
        this.editorsDiv = document.createElement('div');
        this.editorsDiv.className += 'editors half';
        this.codeground.appendChild(this.editorsDiv);

        // Initialize output
        this.outputDiv = document.createElement('div');
        this.outputDiv.className += 'output half';
        this.codeground.appendChild(this.outputDiv);

        let topBarHeight = this.topBar.style.height.slice(0, -2);
        this.editorHeight = this.options.height - topBarHeight; // shorter by the height of the topbar

        // Layouts: half(split 50%) or full
        if(this.options.layout === 'half') {
            this.halfWidth();
        } else if (this.options.layout === 'full') {
            this.fullWidth(this.options.initialFull);        
        }


        // Create all three Editors
        this.createEditor('html', this.editorsDiv);
        this.htmlEditor = document.querySelector('#html');
        this.htmlEditorCode = document.querySelector('#html textarea');


        this.createEditor('css', this.editorsDiv);
        this.cssEditor = document.querySelector('#css');
        this.cssEditorCode = document.querySelector('#css textarea');


        this.createEditor('js', this.editorsDiv);
        this.jsEditor = document.querySelector('#js');
        this.jsEditorCode = document.querySelector('#js textarea');

    
        this.keyupRender(this.htmlEditorCode);
        this.keyupRender(this.cssEditorCode);
        this.keyupRender(this.jsEditorCode);

        // Create and add the iframe to the document
        var iframe = document.createElement('iframe');
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        this.outputDiv.appendChild(iframe);


        if(!this.options.html) {
            document.querySelector('#html').style.display = 'none';
        }
        if(!this.options.css) {
            document.querySelector('#css').style.display = 'none';
        }
        if(!this.options.js) {
            document.querySelector('#js').style.display = 'none';
        }

        if(this.options.style === 'tabs') {
            if(this.options.html) {
                this.createTabBtn('HTML');
                var htmlBtn = document.getElementById('htmlBtn');
                htmlBtn.addEventListener('click', () => this.tabs('html'));
            }
            if(this.options.css) {
                this.createTabBtn('CSS');
                var cssBtn = document.getElementById('cssBtn');
                cssBtn.addEventListener('click', () => this.tabs('css'));
            }
            if(this.options.js) {
                this.createTabBtn('JS');
                var jsBtn = document.getElementById('jsBtn');
                jsBtn.addEventListener('click', () => this.tabs('js'));
            }
            this.createTabBtn('Result');
                var resultBtn = document.getElementById('resultBtn');
                resultBtn.addEventListener('click', () => this.tabs('result'));

            this.tabs(this.options.initialTab);
        } else {
            this.htmlEditor.style.height = '33%';
            this.cssEditor.style.height = '33%';
            this.jsEditor.style.height = '33%';
        }
        if(this.options.fullscreen) {
            this.codeground.style.border = 'none';
            this.codeground.style.height = '100%';
            this.topBar.style.height = '5%';
            this.editorsDiv.style.height = '94%';
            this.outputDiv.style.height = '94%';
            let textareas = document.querySelectorAll('textarea');
            textareas.forEach((a) => a.style.height = '100%');
        }
    }

    // Public Functions for more options
    preset(presetHTML, presetCSS, presetJS) {
        if(presetHTML)
            this.htmlEditorCode.value += presetHTML;
        if(presetCSS)
            this.cssEditorCode.value += presetCSS;
        if(presetJS)
            this.jsEditorCode.value += presetJS;
        this.render();
    }

    // Functions
    createEditor(editor) {
        var div = document.createElement('div');
        div.id = editor;
        div.className += 'editor';
        this.editorsDiv.appendChild(div);

        var header = document.createElement('h3');
        header.textContent = editor.toUpperCase();
        header.style.margin = 0;
        header.style.padding = '13px 10px';
        header.style.backgroundColor = '#eee';
        header.style.position ='relative';
        header.style.color = '#777272';
        header.style.fontSize = '14px';
        div.appendChild(header);
        
        var textarea = document.createElement('textarea');
        textarea.style.width = '100%';
        textarea.style.height = '100%';
        textarea.style.boxSizing = 'border-box';
        textarea.style.border = 'none';
        textarea.style.resize = 'none';
        textarea.style.padding = '10px';
        textarea.style.marginTop = '-42px';
        textarea.style.paddingTop = '52px';
        textarea.addEventListener('focus', function () {
            this.style.outline = 'none';
        });

        div.appendChild(textarea);
    }

    createTopBar(barTitle) {
        this.topBar = document.createElement('div');
        this.topBar.id = 'topBar';
        this.topBar.className = 'topbar';

        this.codeground.appendChild(this.topBar);

        var title = document.createElement('h2');
        title.textContent = barTitle;
        this.topBar.appendChild(title);
    }

    createTabBtn(name) {
        var btn = document.createElement('button');
        btn.id = name.toLowerCase() + 'Btn';
        btn.textContent = name;
        btn.style.height = '50px';
        btn.style.width = '70px';
        btn.style.background = 'none';
        btn.style.border = 'none';
        btn.style.borderRight = '1px solid #d6d6d6';
        btn.style.outline = 'none';
        btn.style.color = '#777272';
        btn.style.fontSize = '12px';
        btn.addEventListener('mouseenter', function() {
            btn.style.background = '242121';
            btn.style.color = 'black';
            btn.style.cursor = 'pointer';
        });
        btn.addEventListener('mouseleave', function() {
            btn.style.background = 'none';
            btn.style.color = '#777272';
        });
        var topBar = document.getElementById('topBar');
        topBar.appendChild(btn);
    }

    tabs(initial) {
        if(initial === 'html') {
            if(this.htmlEditor.style.display == 'block') {
                this.htmlEditor.style.display = 'none';
                this.fullWidth('output');
            } else if(this.editorsDiv.style.display == 'none') {
                this.htmlEditor.style.display = 'block';
                this.editorsDiv.style.display = 'block';
                this.halfWidth();
            } else {
                this.htmlEditor.style.display = 'block';
                this.htmlEditor.style.height = '100%';
                this.cssEditor.style.display = 'none';
                this.jsEditor.style.display = 'none';
            }        
        } else if(initial === 'css') {
            if(this.cssEditor.style.display == 'block') {
                this.cssEditor.style.display = 'none';
                this.fullWidth('output');
            } else if(this.editorsDiv.style.display == 'none') {
                this.cssEditor.style.display = 'block';
                this.editorsDiv.style.display = 'block';
                this.halfWidth();
            } else {
                this.htmlEditor.style.display = 'none';
                this.cssEditor.style.display = 'block';
                this.cssEditor.style.height = '100%';
                this.jsEditor.style.display = 'none';
            }
            
        } else if(initial === 'js') {
            if(this.jsEditor.style.display == 'block') {
                this.jsEditor.style.display = 'none';
                this.fullWidth('output');
            } else if(this.editorsDiv.style.display == 'none') {
                this.jsEditor.style.display = 'block';
                this.editorsDiv.style.display = 'block';
                this.halfWidth();
            } else {
                this.htmlEditor.style.display = 'none';
                this.cssEditor.style.display = 'none';
                this.jsEditor.style.display = 'block';
                this.jsEditor.style.height = '100%';
            }
        } else if(initial === 'result') {
            if(this.outputDiv.style.display == 'block' && this.editorsDiv.style.display == 'none') {
                this.fullWidth();
                if(this.options.html) {
                    this.tabs('html');
                } else if(this.options.css) {
                    this.tabs('css');
                } else {
                    this.tabs('js');
                }
            } else if(this.outputDiv.style.display == 'block') {
                this.fullWidth();
            } else {
                this.outputDiv.style.display = 'block';
                this.halfWidth();
            }

        }
    }
    fullWidth(display) {
        this.editorsDiv.style.display = 'block';
        this.outputDiv.style.display = 'block';
        this.editorsDiv.style.height = this.editorHeight + 'px';
        this.editorsDiv.style.width = '100%';
        this.outputDiv.style.height = this.editorHeight + 'px';
        this.outputDiv.style.width = '100%';
        if(display === 'output') {
            this.editorsDiv.style.display = 'none';
        } else {
            this.outputDiv.style.display =  'none';
        }
    }
    halfWidth() {
        this.editorsDiv.style.display = 'block';
        this.outputDiv.style.display = 'block';
        this.editorsDiv.style.height = this.editorHeight + 'px';
        this.editorsDiv.style.width = '49.9%';
        this.editorsDiv.style.float = 'left';
        this.outputDiv.style.height = this.editorHeight + 'px';
        this.outputDiv.style.width = '50%'; // 1px less to make room for divider
        this.outputDiv.style.borderLeft = '1px solid #eee';
        this.outputDiv.style.float = 'left';
    }
    keyupRender(editor) {
        editor.addEventListener('keyup', () => this.render() );
    }

    render() {
        var source = this.prepareSource();

        var iframe = document.querySelector('.output iframe'),
            iframe_doc = iframe.contentDocument;

        iframe_doc.open();
        iframe_doc.write(source);
        iframe_doc.close();
    }


    prepareSource() {
        var html = this.htmlEditorCode.value,
            css = this.cssEditorCode.value,
            js = this.jsEditorCode.value,
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
