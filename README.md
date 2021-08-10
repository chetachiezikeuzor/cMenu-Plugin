# cMenu Plugin

![cMenu-Plugin Downloads](https://img.shields.io/github/downloads/chetachiezikeuzor/cMenu-Plugin/total.svg)
![cMenu-Plugin Releases](https://img.shields.io/github/v/release/chetachiezikeuzor/cMenu-Plugin)

![](https://raw.githubusercontent.com/chetachiezikeuzor/cMenu-Plugin/master/assets/cMenu%20Demo%20Header.png)

### Status: This plugin is now available in Obsidian plugin store

cMenu is a plugin that adds a minimal and user friendly text editor modal for a smoother writing/editing experience ✍🏽. This plugin makes text editing easier for those that don't wish to configure a multitude of hotkeys.

## Demo

![](https://raw.githubusercontent.com/chetachiezikeuzor/cMenu-Plugin/master/assets/cMenu.gif)

## Ease of Use

This plugin was specifically designed for note-takers that want to have a simple text editor to aid in marking up their notes. cMenu solves the issue of having to memorize numerous hotkeys and/or use multiple key presses to get the desired markup. When you use cMenu, you'll only have to focus on writing!

## How it Works

Currently, cMenu only works on text that had been selected.
Each button on cMenu stores a command that finds your selected, and wraps it within your chosen markup. This makes things like creating codeblocks or blockquotes much easier to do. cMenu is also a standalone component, which makes your workspace much cleaner to write in with minimal clutter. To append cMenu onto your worspace, simply enable the plugin. To remove cMenu from your workspace, disable it.

![](https://raw.githubusercontent.com/chetachiezikeuzor/cMenu-Plugin/master/assets/cmenu-and-admonition.gif)

![](https://raw.githubusercontent.com/chetachiezikeuzor/cMenu-Plugin/master/assets/cMenu.png)

## Installation

This plugin is now available in the community plugin store. You can install it from there and enable it. For a manual installation, you can download the necessary files and place them within your plugins folder.

---

## Changelog

### [0.1.0](https://github.com/chetachiezikeuzor/cMenu-Plugin/releases/tag/0.1.0) - Jul 27, 2021

##### Changed

- Interfaces are renamed to match plugin info
- Now uses `workspace.getActiveViewOfType(MarkdownView)` instead of `activeLeaf` for menu creation

---

### [0.2.0](https://github.com/chetachiezikeuzor/cMenu-Plugin/releases/tag/0.2.0) - Aug 02, 2021

##### Changed

- Now uses `workspace.getActiveViewOfType(MarkdownView)` to store text selection

##### Fixed

- cMenu appends to `.mod-vertical.mod-root` parent instead of `body` parent.
- cMenu left positioning is set by function that finds width dynamically on menu creation.
  ![](https://raw.githubusercontent.com/chetachiezikeuzor/cMenu-Plugin/master/assets/cMenu-v020.gif)

---

### [0.3.0](https://github.com/chetachiezikeuzor/cMenu-Plugin/releases/tag/0.3.0) - Aug 02, 2021

##### Fixed

- Fixed small [bug](https://github.com/chetachiezikeuzor/cMenu-Plugin/issues/3#issuecomment-891371471) that causes an extra resize handle to be created.

---

## Roadmap

- [ ] Add custom commands to cMenu
  - [ ] Choose icons for commands without
- [ ] Follow the cursor setting
  - [ ] Setting to toggle for cMenu to follow mouse cursor
- [ ] Fix to work with Sliding Panes
  - [ ] Setting to toggle for cMenu to toggle to body instead of modroot
- [ ] Glassmorphism setting
  - [ ] Setting to toggle for glass effect with cMenu

---

## Support

If you like this plugin and are considering donating to support continued development, use the button below!

Created with ❤️ by Chetachi

<a href="https://www.buymeacoffee.com/chetachi"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&amp;emoji=&amp;slug=chetachi&amp;button_colour=e3e7ef&amp;font_colour=262626&amp;font_family=Inter&amp;outline_colour=262626&amp;coffee_colour=ff0000"></a>
