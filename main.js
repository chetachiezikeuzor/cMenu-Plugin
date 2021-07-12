/*
THIS IS A GENERATED/BUNDLED FILE BY ROLLUP
if you want to view the source visit the plugins github repository
*/

'use strict';

var obsidian = require('obsidian');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

/**
 * Transform the case in `value` (`string`) to match that of `base` (`string`).
 *
 * @param {string} value
 * @param {string} base
 * @returns {string}
 */

// العربية
var ar = {};

// čeština
var cz = {};

// Dansk
var da = {};

// Deutsch
var de = {

};

// English
var en = {
    //main
    //_constants.ts
    'cMenu': 'cMenu',
    //added to Context Menu
    //settingsTab.ts
    'cMenu Settings': 'cMenu Settings',
    'Click ': 'Click ',
    'here': 'here',
    'Pick cMenu Position Style': 'Pick cMenu Position Style',
    'Coming soon...': 'Coming soon...',
    'Click Here': 'Click Here',
    'More Information': 'More Information',
    'View Information about the Plugin.': 'View Information about the Plugin.',
    'More Info': 'More Info',
    'Donate': 'Donate',
    'If you like this Plugin, consider donating to support continued development:': 'If you like this Plugin, consider donating to support continued development:',

    "Miscellaneous": "Miscellaneous",

    //cMenuModal

};

// British English
var enGB = {};

// Español
var es = {};

// français
var fr = {};

// हिन्दी
var hi = {};

// Bahasa Indonesia
var id = {};

// Italiano
var it = {};

// 日本語
var ja = {};

// 한국어
var ko = {};

// Nederlands
var nl = {};

// Norsk
var no = {};

// język polski
var pl = {};

// Português
var pt = {};

// Português do Brasil
// Brazilian Portuguese
var ptBR = {};

// Română
var ro = {};

// русский
var ru = {};

// Türkçe
var tr = {};

// 简体中文
var zhCN = {

};

// 繁體中文
var zhTW = {};

const localeMap = {
    ar,
    cs: cz,
    da,
    de,
    en,
    "en-gb": enGB,
    es,
    fr,
    hi,
    id,
    it,
    ja,
    ko,
    nl,
    nn: no,
    pl,
    pt,
    "pt-br": ptBR,
    ro,
    ru,
    tr,
    "zh-cn": zhCN,
    "zh-tw": zhTW,
};

const locale = localeMap[obsidian.moment.locale()];
function t(str) {
    if (!locale) {
        console.error("Error: locale not found", obsidian.moment.locale());
    }
    return (locale && locale[str]) || en[str];
}

const DEFAULT_SETTINGS = {
};

function selfDestruct(){
    let cMenuModalBar = document.getElementById('cMenuModalBar');
    if(cMenuModalBar){
        if(cMenuModalBar.firstChild){
            cMenuModalBar.removeChild(cMenuModalBar.firstChild);
        }cMenuModalBar.remove();
    }
}

class cMenuPopover extends obsidian.Plugin{
    constructor() {
        super(...arguments);
        this.createMenu();   
    }
    
    createMenu(){
        const applyCommand = (prefix, selectedText, suffix) => {
            suffix = suffix || prefix;
            return `${prefix}${selectedText}${suffix}`;
        };
    
        const commandsMap = {
            bold: (selectedText) => applyCommand('**', selectedText),
            italic: (selectedText) => applyCommand('_', selectedText),
            strikethrough: (selectedText) => applyCommand('~~', selectedText),
            underline: (selectedText) => applyCommand('<u>', selectedText, '</u>'),
            superscript: (selectedText) => applyCommand('<sup>', selectedText, '</sup>'),
            subscript: (selectedText) => applyCommand('<sub>', selectedText, '</sub>'),
            inlinecode: (selectedText) => applyCommand('`', selectedText),
            codeblock: (selectedText) => applyCommand('\n```\n', selectedText, '\n```\n'),
            quote: (selectedText) => applyCommand('\n> ', selectedText, '\n\n'),
        };
    
        const iconsMap = {
            'codeblock-glyph': `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2" d="M9 22l6-20m2 15l5-5l-5-5M7 17l-5-5l5-5"/></svg>`,
            'quote-glyph': `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><title>Quote</title><path d="M6.5 10c-.223 0-.437.034-.65.065c.069-.232.14-.468.254-.68c.114-.308.292-.575.469-.844c.148-.291.409-.488.601-.737c.201-.242.475-.403.692-.604c.213-.21.492-.315.714-.463c.232-.133.434-.28.65-.35l.539-.222l.474-.197l-.485-1.938l-.597.144c-.191.048-.424.104-.689.171c-.271.05-.56.187-.882.312c-.318.142-.686.238-1.028.466c-.344.218-.741.4-1.091.692c-.339.301-.748.562-1.05.945c-.33.358-.656.734-.909 1.162c-.293.408-.492.856-.702 1.299c-.19.443-.343.896-.468 1.336c-.237.882-.343 1.72-.384 2.437c-.034.718-.014 1.315.028 1.747c.015.204.043.402.063.539l.025.168l.026-.006A4.5 4.5 0 1 0 6.5 10zm11 0c-.223 0-.437.034-.65.065c.069-.232.14-.468.254-.68c.114-.308.292-.575.469-.844c.148-.291.409-.488.601-.737c.201-.242.475-.403.692-.604c.213-.21.492-.315.714-.463c.232-.133.434-.28.65-.35l.539-.222l.474-.197l-.485-1.938l-.597.144c-.191.048-.424.104-.689.171c-.271.05-.56.187-.882.312c-.317.143-.686.238-1.028.467c-.344.218-.741.4-1.091.692c-.339.301-.748.562-1.05.944c-.33.358-.656.734-.909 1.162c-.293.408-.492.856-.702 1.299c-.19.443-.343.896-.468 1.336c-.237.882-.343 1.72-.384 2.437c-.034.718-.014 1.315.028 1.747c.015.204.043.402.063.539l.025.168l.026-.006A4.5 4.5 0 1 0 17.5 10z"/></svg>`,
            'bold-glyph': `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><title>Bold</title><path d="M8 11h4.5a2.5 2.5 0 1 0 0-5H8v5zm10 4.5a4.5 4.5 0 0 1-4.5 4.5H6V4h6.5a4.5 4.5 0 0 1 3.256 7.606A4.498 4.498 0 0 1 18 15.5zM8 13v5h5.5a2.5 2.5 0 1 0 0-5H8z"/></svg>`,
            'italic-glyph': `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024"><title>Italic</title><path d="M798 160H366c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h181.2l-156 544H229c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h432c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8H474.4l156-544H798c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z"/></svg>`,
            'underline-glyph': `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024"><title>Underline</title><path d="M824 804H200c-4.4 0-8 3.4-8 7.6v60.8c0 4.2 3.6 7.6 8 7.6h624c4.4 0 8-3.4 8-7.6v-60.8c0-4.2-3.6-7.6-8-7.6zm-312-76c69.4 0 134.6-27.1 183.8-76.2C745 602.7 772 537.4 772 468V156c0-6.6-5.4-12-12-12h-60c-6.6 0-12 5.4-12 12v312c0 97-79 176-176 176s-176-79-176-176V156c0-6.6-5.4-12-12-12h-60c-6.6 0-12 5.4-12 12v312c0 69.4 27.1 134.6 76.2 183.8C377.3 701 442.6 728 512 728z"/></svg>`,
            'strikethrough-glyph': `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><title>Strikethrough</title><path d="M20 11h-8c-4 0-4-1.816-4-2.5C8 7.882 8 6 12 6c2.8 0 2.99 1.678 3 2.014L16 8h1c0-1.384-1.045-4-5-4c-5.416 0-6 3.147-6 4.5c0 .728.148 1.667.736 2.5H4v2h16v-2zm-8 7c-3.793 0-3.99-1.815-4-2H6c0 .04.069 4 6 4c5.221 0 6-2.819 6-4.5c0-.146-.009-.317-.028-.5h-2.006c.032.2.034.376.034.5c0 .684 0 2.5-4 2.5z"/></svg>`,
            'superscript-glyph': `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><title>Superscript</title><path d="M16 7.41L11.41 12L16 16.59L14.59 18L10 13.41L5.41 18L4 16.59L8.59 12L4 7.41L5.41 6L10 10.59L14.59 6L16 7.41M21.85 9h-4.88V8l.89-.82c.76-.64 1.32-1.18 1.7-1.63c.37-.44.56-.85.57-1.23a.884.884 0 0 0-.27-.7c-.18-.19-.47-.28-.86-.29c-.31.01-.58.07-.84.17l-.66.39l-.45-1.17c.27-.22.59-.39.98-.53S18.85 2 19.32 2c.78 0 1.38.2 1.78.61c.4.39.62.93.62 1.57c-.01.56-.19 1.08-.54 1.55c-.34.48-.76.93-1.27 1.36l-.64.52v.02h2.58V9z"/></svg>`,
            'subscript-glyph': `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><title>Subscript</title><path d="M16 7.41L11.41 12L16 16.59L14.59 18L10 13.41L5.41 18L4 16.59L8.59 12L4 7.41L5.41 6L10 10.59L14.59 6L16 7.41m5.85 13.62h-4.88v-1l.89-.8c.76-.65 1.32-1.19 1.7-1.63c.37-.44.56-.85.57-1.24a.898.898 0 0 0-.27-.7c-.18-.16-.47-.28-.86-.28c-.31 0-.58.06-.84.18l-.66.38l-.45-1.17c.27-.21.59-.39.98-.53s.82-.24 1.29-.24c.78.04 1.38.25 1.78.66c.4.41.62.93.62 1.57c-.01.56-.19 1.08-.54 1.55c-.34.47-.76.92-1.27 1.36l-.64.52v.02h2.58v1.35z"/></svg>`,
            'inlinecode-glyph': `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><title>Inline Code</title><path d="M14.6 16.6l4.6-4.6l-4.6-4.6L16 6l6 6l-6 6l-1.4-1.4m-5.2 0L4.8 12l4.6-4.6L8 6l-6 6l6 6l1.4-1.4z"/></svg>`,
        };

        const generateMenu = () => {
            let cMenuModalBar = document.createElement('div'); 
            cMenuModalBar.setAttribute('id', 'cMenuModalBar'); 
            document.body.appendChild(cMenuModalBar); 
            Object.keys(commandsMap).forEach(
                (type) => {
                    // Create menu based on `${type}-glyph`
                    const typeSection = document.createElement('div');
    
                    const typeIcon = document.createElement('span');
                    typeIcon.innerHTML = iconsMap[`${type}-glyph`];
                    typeSection.appendChild(typeIcon);
    
                    cMenuModalBar.appendChild(typeSection);
    
                    typeSection.addEventListener('click', () => {
                        var activeLeaf = this.app.workspace.activeLeaf;
                        if(app.workspace.activeLeaf.view.editor){
                            var sel = activeLeaf.view.editor.getSelection();
                            if(sel){
                                activeLeaf.view.editor.replaceSelection(commandsMap[type](sel));
                            }else{
                                console.log("This is not edittable 😬");
                            }
                        }else{
                            console.log("This is not edittable 😬");
                        }
                    });
                }
            );
        };
        if(app.workspace.activeLeaf.view.editor){
            let cMenuModalBar = document.getElementById('cMenuModalBar');
            if(cMenuModalBar){
                return;
            }else{
                generateMenu();
            }
        }else if(!app.workspace.activeLeaf.view.editor){
            selfDestruct();
        }
    };
}

class SettingsTab extends obsidian.PluginSettingTab {
    constructor(app, plugin) {
        super(app, plugin);
        this.plugin = plugin;
    }
    display() {
        const { containerEl, plugin } = this;
        containerEl.empty();
        containerEl.createEl('h2', { text: t('cMenu Settings') });
        new obsidian.Setting(containerEl)
            .setName(t('Pick cMenu Position Style'))
            .setDesc(t('Coming soon...'));
        containerEl.createEl('h3', { text: t("Miscellaneous") });
        new obsidian.Setting(containerEl)
            .setName(t('Donate'))
            .setDesc(t('If you like this Plugin, consider donating to support continued development:'))
            .setClass("extra")
            .addButton((bt) => {
            bt.buttonEl.outerHTML = `<a href="https://www.buymeacoffee.com/chetachi"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=chetachi&button_colour=1862f7&font_colour=ffffff&font_family=Inter&outline_colour=ffffff&coffee_colour=FFDD00"></a>`;
        });
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.plugin.saveSettings();
        });
    }
}

class cMenuPlugin extends obsidian.Plugin {
    constructor() {
        super(...arguments);

        this.handlecMenu = obsidian.debounce(() => {
            const activeLeaf = this.app.workspace.activeLeaf;
            const view = activeLeaf.view;
            const editor = view.editor;
            this.cMenuPopover = new cMenuPopover(activeLeaf, editor, this.app, this);
        });
        
    }
    
    onload() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Loading cMenu');
            yield this.loadSettings();
            
            this.addSettingTab(new SettingsTab(this.app, this));

            this.registerEvent(this.app.workspace.on("active-leaf-change", this.handlecMenu));
        });
    }
    onunload() {
        selfDestruct();
        console.log('Unloading cMenu');
    }
    loadSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            this.settings = Object.assign({}, DEFAULT_SETTINGS, yield this.loadData());
        });
    }
    saveSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.saveData(this.settings);
        });
    }
}

module.exports = cMenuPlugin;