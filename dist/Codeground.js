'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*eslint-disable no-unused-vars*/
var Codeground = function () {
    function Codeground(opts) {
        _classCallCheck(this, Codeground);

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

    _createClass(Codeground, [{
        key: 'initCodeground',
        value: function initCodeground(id) {
            var _this = this;

            if (id) {
                this.codeground = document.getElementById(id);
            } else {
                this.codeground = document.getElementById('codeground');
            }
            this.codeground.className = 'codeground';

            if (this.options.topbar) {
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

            var topBarHeight = this.topBar.style.height.slice(0, -2);
            this.editorHeight = this.options.height - topBarHeight; // shorter by the height of the topbar

            // Layouts: half(split 50%) or full
            if (this.options.layout === 'half') {
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
            this.outputDiv.appendChild(iframe);

            if (!this.options.html) {
                document.querySelector('#html').style.display = 'none';
            }
            if (!this.options.css) {
                document.querySelector('#css').style.display = 'none';
            }
            if (!this.options.js) {
                document.querySelector('#js').style.display = 'none';
            }

            if (this.options.style === 'tabs') {
                if (this.options.html) {
                    this.createTabBtn('HTML');
                    var htmlBtn = document.getElementById('htmlBtn');
                    htmlBtn.addEventListener('click', function () {
                        return _this.tabs('html');
                    });
                }
                if (this.options.css) {
                    this.createTabBtn('CSS');
                    var cssBtn = document.getElementById('cssBtn');
                    cssBtn.addEventListener('click', function () {
                        return _this.tabs('css');
                    });
                }
                if (this.options.js) {
                    this.createTabBtn('JS');
                    var jsBtn = document.getElementById('jsBtn');
                    jsBtn.addEventListener('click', function () {
                        return _this.tabs('js');
                    });
                }
                this.createTabBtn('Result');
                var resultBtn = document.getElementById('resultBtn');
                resultBtn.addEventListener('click', function () {
                    return _this.tabs('result');
                });

                this.tabs(this.options.initialTab);
            } else {
                this.htmlEditor.style.height = '33%';
                this.cssEditor.style.height = '33%';
                this.jsEditor.style.height = '33%';
            }
            if (this.options.fullscreen) {
                this.codeground.style.border = 'none';
                this.codeground.style.height = '100%';
                this.topBar.style.height = '5%';
                this.editorsDiv.style.height = '94%';
                this.outputDiv.style.height = '94%';
                var textareas = document.querySelectorAll('textarea');
                textareas.forEach(function (a) {
                    return a.style.height = '100%';
                });
            }
        }

        // Public Functions for more options

    }, {
        key: 'preset',
        value: function preset(presetHTML, presetCSS, presetJS) {
            if (presetHTML) this.htmlEditorCode.value += presetHTML;
            if (presetCSS) this.cssEditorCode.value += presetCSS;
            if (presetJS) this.jsEditorCode.value += presetJS;
            this.render();
        }

        // Functions

    }, {
        key: 'createEditor',
        value: function createEditor(editor) {
            var div = document.createElement('div');
            div.id = editor;
            div.className += 'editor';
            this.editorsDiv.appendChild(div);

            var header = document.createElement('h3');
            header.textContent = editor.toUpperCase();
            div.appendChild(header);

            var textarea = document.createElement('textarea');
            div.appendChild(textarea);
        }
    }, {
        key: 'createTopBar',
        value: function createTopBar(barTitle) {
            this.topBar = document.createElement('div');
            this.topBar.id = 'topBar';
            this.topBar.className = 'topbar';

            this.codeground.appendChild(this.topBar);

            var title = document.createElement('h2');
            title.textContent = barTitle;
            this.topBar.appendChild(title);
        }
    }, {
        key: 'createTabBtn',
        value: function createTabBtn(name) {
            var btn = document.createElement('button');
            btn.id = name.toLowerCase() + 'Btn';
            btn.className = 'btn';
            btn.textContent = name;

            var topBar = document.getElementById('topBar');
            topBar.appendChild(btn);
        }
    }, {
        key: 'tabs',
        value: function tabs(initial) {
            if (initial === 'html') {
                if (this.htmlEditor.style.display == 'block') {
                    this.htmlEditor.style.display = 'none';
                    this.fullWidth('output');
                } else if (this.editorsDiv.style.display == 'none') {
                    this.htmlEditor.style.display = 'block';
                    this.editorsDiv.style.display = 'block';
                    this.halfWidth();
                } else {
                    this.htmlEditor.style.display = 'block';
                    this.htmlEditor.style.height = '100%';
                    this.cssEditor.style.display = 'none';
                    this.jsEditor.style.display = 'none';
                }
            } else if (initial === 'css') {
                if (this.cssEditor.style.display == 'block') {
                    this.cssEditor.style.display = 'none';
                    this.fullWidth('output');
                } else if (this.editorsDiv.style.display == 'none') {
                    this.cssEditor.style.display = 'block';
                    this.editorsDiv.style.display = 'block';
                    this.halfWidth();
                } else {
                    this.htmlEditor.style.display = 'none';
                    this.cssEditor.style.display = 'block';
                    this.cssEditor.style.height = '100%';
                    this.jsEditor.style.display = 'none';
                }
            } else if (initial === 'js') {
                if (this.jsEditor.style.display == 'block') {
                    this.jsEditor.style.display = 'none';
                    this.fullWidth('output');
                } else if (this.editorsDiv.style.display == 'none') {
                    this.jsEditor.style.display = 'block';
                    this.editorsDiv.style.display = 'block';
                    this.halfWidth();
                } else {
                    this.htmlEditor.style.display = 'none';
                    this.cssEditor.style.display = 'none';
                    this.jsEditor.style.display = 'block';
                    this.jsEditor.style.height = '100%';
                }
            } else if (initial === 'result') {
                if (this.outputDiv.style.display == 'block' && this.editorsDiv.style.display == 'none') {
                    this.fullWidth();
                    if (this.options.html) {
                        this.tabs('html');
                    } else if (this.options.css) {
                        this.tabs('css');
                    } else {
                        this.tabs('js');
                    }
                } else if (this.outputDiv.style.display == 'block') {
                    this.fullWidth();
                } else {
                    this.outputDiv.style.display = 'block';
                    this.halfWidth();
                }
            }
        }
    }, {
        key: 'fullWidth',
        value: function fullWidth(display) {
            this.editorsDiv.style.display = 'block';
            this.outputDiv.style.display = 'block';
            this.editorsDiv.style.height = this.editorHeight + 'px';
            this.editorsDiv.style.width = '100%';
            this.outputDiv.style.height = this.editorHeight + 'px';
            this.outputDiv.style.width = '100%';
            if (display === 'output') {
                this.editorsDiv.style.display = 'none';
            } else {
                this.outputDiv.style.display = 'none';
            }
        }
    }, {
        key: 'halfWidth',
        value: function halfWidth() {
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
    }, {
        key: 'keyupRender',
        value: function keyupRender(editor) {
            var _this2 = this;

            editor.addEventListener('keyup', function () {
                return _this2.render();
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var source = this.prepareSource();

            var iframe = document.querySelector('.output iframe'),
                iframe_doc = iframe.contentDocument;

            iframe_doc.open();
            iframe_doc.write(source);
            iframe_doc.close();
        }
    }, {
        key: 'prepareSource',
        value: function prepareSource() {
            var html = this.htmlEditorCode.value,
                css = this.cssEditorCode.value,
                js = this.jsEditorCode.value,
                src = '';

            var baseTemplate = '<!doctype html>\n' + '<html>\n\t' + '<head>\n\t\t' + '<meta charset=\'utf-8\'>\n\t\t' + '<title>Test</title>\n\n\t\t\n\t' + '</head>\n\t' + '<body>\n\t\n\t' + '</body>\n' + '</html>';

            src = baseTemplate.replace('</body>', html + '</body>');

            css = '<style>' + css + '</style>';
            src = src.replace('</head>', css + '</head>');

            js = '<script>' + js + '</script>';
            src = src.replace('</body>', js + '</body>');

            return src;
        }
    }]);

    return Codeground;
}();