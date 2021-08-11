# cMenu Plugin

![cMenu-Plugin Downloads](https://img.shields.io/github/downloads/chetachiezikeuzor/cMenu-Plugin/total.svg)
![cMenu-Plugin Releases](https://img.shields.io/github/v/release/chetachiezikeuzor/cMenu-Plugin)

![](https://raw.githubusercontent.com/chetachiezikeuzor/cMenu-Plugin/master/assets/cMenu%20Demo%20Header.png)

### Status: This plugin is now available in Obsidian plugin store

cMenu is a plugin that adds a minimal and user friendly text editor modal for a smoother writing/editing experience ✍🏽. This plugin makes text editing and firing commands easier for those that don't wish to configure a multitude of hotkeys.

## Demo

![](https://raw.githubusercontent.com/chetachiezikeuzor/cMenu-Plugin/master/assets/cMenu.gif)

## Ease of Use

This plugin was specifically designed for note-takers that want to have a simple text editor to aid in marking up their notes. cMenu solves the issue of having to memorize numerous hotkeys and/or use multiple key presses to get the desired markup. When you use cMenu, you'll only have to focus on writing!

## How it Works

With the newest update of cMenu, you can add just about any command from Obsidian's command library onto the menu bar. By default, the menu bar will have the following commands: Toggle bold, Toggle italics, Toggle strikethrough, cMenu: Toggle Underline, cMenu: Toggle Superscript, cMenu: Toggle Subscript, Toggle code, cMenu: Toggle codeblock, and Toggle blockquote. As you can see, cMenu adds four new commands to Obsidian's command library. Those commands are added to an array of commands that are then read within the generation of the cMenu modal. If you would like to remove and/or add new commands, you can do so within the cMenu settings panel. Use the green button to add a new command onto the menu. And use the red button to remove them from the menu. When you add/remove a new command, you will see a message in your console, indicating the status of said command. Now, in order to see the changes on cMenu, it's important to know that cMenu is created on the `active-leaf-change` event. This means that changes to cMenu will only take effect once you close all existing leaves and spawn a new one. This will likely change in the future as I look into a better way to do this!

![](https://raw.githubusercontent.com/chetachiezikeuzor/cMenu-Plugin/master/assets/cMenu.gif)

The plugins Templater and Hotkeys for Templates are strongly recommended to use with cMenu. For example: I have a template that spawns the chess opening "Alekhine's Defense." With Hotkeys for Templates, I can choose to add this template to Obsidian's command library. Now that it's in the command library, I can choose to append this command to cMenu. This means you can really add just about anything to cMenu now, which makes it much more powerful!

![](https://raw.githubusercontent.com/chetachiezikeuzor/cMenu-Plugin/master/assets/cMenu%20Hotkeys%20for%20Templates.gif)

cMenu also has a few stylistic changes that are also customizeable. For those that use the plugin "Sliding Panes," you can now change cMenu's append method to "body." That way, cMenu will no longer append to the workspace area, but to the body of the app. This is a bit of a work around for the current issue with Sliding Panes but I'm actively looking into a better solution.

![](https://raw.githubusercontent.com/chetachiezikeuzor/cMenu-Plugin/master/assets/cMenu%20Sliding%20Panes.gif)

With cMenu, you can change the design aesthetic. Glass morphism is a pretty popular design trend so I thought "why not add this to cMenu?!" You can choose to have a "glass" style for cMenu, which gives it a unique look.

![](https://raw.githubusercontent.com/chetachiezikeuzor/cMenu-Plugin/master/assets/Glass%20cMenu.gif)

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

- [x] Add custom commands to cMenu
  - [x] Choose icons for commands without
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
