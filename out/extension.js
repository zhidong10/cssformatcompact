"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
function activate(context) {
    console.log('Congratulations, your extension "cssformatcompact" is now active!');
    let disposable = vscode.commands.registerCommand('extension.cssFormatCompact', () => {
        cssFormatFun('cssFormatCompact');
        //vscode.window.showInformationMessage('cssFormatCompact-样式单独一行');
    });
    let disposable2 = vscode.commands.registerCommand('extension.cssFormatCompactExpand', () => {
        cssFormatFun('cssFormatCompactExpand');
        //vscode.window.showInformationMessage('cssFormatCompactExpand-样式和属性单独一行');
    });
    function cssFormatFun(types) {
        var editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        var selection = editor.selection;
        var text = editor.document.getText(selection) || editor.document.getText();
        var _this = editor;
        editor.edit((editBuilder) => {
            // 从开始到结束，全量替换
            const end = new vscode.Position(_this.document.lineCount + 1, 0);
            if (_this.document.getText(selection) == '') { //如果没有选中文本
                editBuilder.replace(new vscode.Range(new vscode.Position(0, 0), end), cssCodeFormat.cssComm(types, text));
            }
            else {
                editBuilder.replace(selection, cssCodeFormat.cssComm(types, text));
            }
            // vscode.window.showInformationMessage('css格式化多行成功');
        });
    }
    var cssCodeFormat = {
        cssFormatCompact(code) {
            code = code.replace(/{/ig, ' { '); // add space before and after {
            code = code.replace(/(@[\w-]*(document|font-feature-values|keyframes|media|supports)[^;]*?\{)\s*/ig, '$1\n');
            // add \n after @xxx {
            code = code.replace(/;/ig, '; '); // add space after ;
            code = code.replace(/(@(charset|import|namespace).+?;)\s*/ig, '$1\n'); // add \n after @charset & @import
            code = code.replace(/;\s*([^\};]+?\{)/ig, ';\n$1'); // add \n before included selector
            code = code.replace(/\s*(!comment!)\s*;/ig, ' $1 ;'); // fix comment before ;
            code = code.replace(/(:[^:;]+;)\s*(!comment!)\s*/ig, '$1 $2 '); // fix comment after ;
            code = code.replace(/\s*\}/ig, ' }'); // add space before }
            code = code.replace(/\}\s*/ig, '}\n'); // add \n after }
            return code;
        },
        cssFormatCompactExpand(str) {
            var code = str;
            code = code.replace(/{/ig, ' {\n'); // add space before { and add \n after {
            code = code.replace(/;/ig, ';\n'); // add \n after ;
            code = code.replace(/;\s*([^\{\};]+?)\{/ig, ';\n\n$1{'); // double \n between ; and include selector
            code = code.replace(/\s*(!comment!)\s*;\s*/ig, ' $1 ;\n'); // fix comment before ;
            code = code.replace(/(:[^:;]+;)\s*(!comment!)\s*/ig, '$1 $2\n'); // fix comment after ;
            code = code.replace(/\s*\}/ig, '\n}'); // add \n before }
            code = code.replace(/\}\s*/ig, '}' + '\n\n'); // add block break after }
            return code;
        },
        cssComm(action, str) {
            // Protect comments
            var commentReg = /[ \t]*\/\*[\s\S]*?\*\//ig;
            var comments = str.match(commentReg) || [];
            str = str.replace(commentReg, '!comment!');
            // Protect strings
            var stringReg = /'(content\s*:|[\w-]+\s*=)\s*(([\'\"]).*?\3)\s*/ig;
            var strings = str.match(stringReg) || [];
            str = str.replace(stringReg, '$1!string!');
            // Protect urls
            var urlReg = /((?:url|url-prefix|regexp)\([^\)]+\))/ig;
            var urls = str.match(urlReg) || [];
            str = str.replace(urlReg, '!url!');
            // Pre process
            str = str.replace(/\s*([\{\}:;,])\s*/ig, '$1'); // remove \s before and after characters {}:;,
            str = str.replace(/([\[\(])\s*/ig, '$1'); // remove space inner [ or (
            str = str.replace(/\s*([\)\]])/ig, '$1'); // remove space inner ) or ]
            // str = str.replace(r'(\S+)\s*([\+>~])\s*(\S+)', r'\1\2\3', code)	# remove \s before and after relationship selectors
            str = str.replace(/,[\d\s\.\#\+>~:]*\{/ig, '{'); // remove invalid selectors without \w
            str = str.replace(/([;,])$1+/ig, '$1'); // remove repeated ;,
            str = str.replace(/,\s*/ig, ', '); // add space after ,
            // Process action rules
            str = this.actFuns(action, str);
            // Fix comments
            str = str.replace(/\s*!comment!\s*@/ig, '\n\n!comment!\n@');
            str = str.replace(/\s*!comment!\s*([^\/\{\};]+?)\{/ig, '\n\n!comment!\n$1{');
            str = str.replace(/\s*\n!comment!/ig, '\n\n!comment!');
            // Backfill comments
            let i;
            for (i in comments) {
                str = str.replace(/[ \t]*!comment!/, comments[i]);
            }
            // Indent
            str = this.indent_code(str);
            // Backfill strings
            let j;
            for (j in strings) {
                str = str.replace('!string!', strings[j][1]);
            }
            // Backfill urls
            let k;
            for (k in urls) {
                str = str.replace('!url!', urls[k]);
            }
            // Trim
            str = str.replace(/^\s*(\S+(\s+\S+)*)\s*$/ig, '$1');
            return str;
        },
        actFuns(fname, code) {
            var str = "";
            if (fname == 'cssFormatCompactExpand') {
                str = this.cssFormatCompactExpand(code);
            }
            else if (fname == 'cssFormatCompact') {
                str = this.cssFormatCompact(code);
            }
            return str;
        },
        indent_code(code) {
            var lines = code.split('\n');
            var level = 0;
            var inComment = false;
            var outPrefix = '';
            var i;
            for (i in lines) {
                if (!inComment) {
                    // Quote level adjustment
                    var validCode = lines[i].replace(/\/\*[\s\S]*?\*\//ig, '');
                    validCode = validCode.replace(/\/\*[\s\S]*/ig, '');
                    var adjustment = validCode.split('{').length - validCode.split('}').length;
                    // Trim
                    var m = lines[i].match(/^(\s+)\/\*.*/ig); //原始 re.match(r'^(\s+)\/\*.*', lines[i]);
                    if (m) {
                        outPrefix = m[0];
                        lines[i] = lines[i].replace(RegExp('^' + outPrefix + '(.*)\s*$'), '$1');
                    }
                    else {
                        lines[i] = lines[i].replace(/^\s*(.*)\s*$/ig, '$1');
                    }
                }
                else {
                    // Quote level adjustment
                    adjustment = 0;
                    // Trim
                    lines[i] = lines[i].replace(RegExp('^' + outPrefix + '(.*)\s*$'), '$1');
                }
                // Is next line in comment?
                var commentQuotes = lines[i].match(/\/\*|\*\//ig);
                var quote;
                for (quote in commentQuotes) {
                    if (inComment && quote == '*/') {
                        inComment = false;
                    }
                    else if (quote == '/*') {
                        inComment = true;
                    }
                }
                // Quote level adjustment
                var nextLevel = level + adjustment;
                var thisLevel = (adjustment > 0 ? level : nextLevel);
                level = nextLevel;
                // Add indentation
                var tabs = '\t';
                var indentation = '';
                for (let index = 0; index < thisLevel; index++) {
                    indentation = indentation + tabs;
                }
                lines[i] = indentation + (lines[i] != '' ? lines[i] : '');
                code = lines.join('\n');
            }
            return code;
        }
    };
    context.subscriptions.push(disposable);
    context.subscriptions.push(disposable2);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//复杂的事情简单化，简单的事情重复做。
//# sourceMappingURL=extension.js.map