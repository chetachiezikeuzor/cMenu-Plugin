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

With the newest update of cMenu, you can add just about any command from Obsidian's command library onto the menu bar. By default, the menu bar will have the following commands: Toggle bold, Toggle italics, Toggle strikethrough, cMenu: Toggle Underline, cMenu: Toggle Superscript, cMenu: Toggle Subscript, Toggle code, cMenu: Toggle codeblock, and Toggle blockquote.

```javascript
"menuCommands": [
    {
      id: "cmenu-plugin:editor:toggle-bold",
      name: "cMenu: Toggle bold",
      icon: "bold-glyph",
    },
    {
      id: "cmenu-plugin:editor:toggle-italics",
      name: "cMenu: Toggle italics",
      icon: "italic-glyph",
    },
    {
      id: "cmenu-plugin:editor:toggle-strikethrough",
      name: "cMenu: Toggle strikethrough",
      icon: "strikethrough-glyph",
    },
    {
      id: "cmenu-plugin:underline",
      name: "cMenu: Toggle underline",
      icon: "underline-glyph",
    },
    {
      id: "cmenu-plugin:superscript",
      name: "cMenu: Toggle superscript",
      icon: "superscript-glyph",
    },
    {
      id: "cmenu-plugin:subscript",
      name: "cMenu: Toggle subscript",
      icon: "subscript-glyph",
    },
    {
      id: "cmenu-plugin:editor:toggle-code",
      name: "cMenu: Toggle code",
      icon: "code-glyph",
    },
    {
      id: "cmenu-plugin:codeblock",
      name: "cMenu: Toggle codeblock",
      icon: "codeblock-glyph",
    },
    {
      id: "cmenu-plugin:editor:toggle-blockquote",
      name: "cMenu: Toggle blockquote",
      icon: "quote-glyph",
    }
  ],
```

As you can see, cMenu adds four new commands to Obsidian's command library and modifies fourteen of Obsidian's text editing commands. Those commands are added to an array of commands that are then read within the generation of the cMenu modal. If you would like to remove and/or add new commands, you can do so within the cMenu settings panel. Use the bright button (your accent color) to add a new command onto the menu. And use the gret button to remove them from the menu. When you add/remove a new command, you will see a message in your console, indicating the status of said command. With the newest update [1.1.2](https://github.com/chetachiezikeuzor/cMenu-Plugin/releases/tag/1.1.2), ycMenu will reload everytime a command is added or deleted. No need for closing out your current notes,

![](https://raw.githubusercontent.com/chetachiezikeuzor/cMenu-Plugin/master/assets/cMenu.gif)

The plugins <a href="https://github.com/SilentVoid13/Templater" target="_blank">Templater</a> and <a href="https://github.com/Vinzent03/obsidian-hotkeys-for-templates" target="_blank"> Hotkeys for Templates</a> are strongly recommended to use with cMenu. For example: I have a template that spawns the chess opening "Alekhine's Defense." With Hotkeys for Templates, I can choose to add this template to Obsidian's command library. Now that it's in the command library, I can choose to append this command to cMenu. This means you can really add just about anything to cMenu now, which makes it much more powerful!

![](https://raw.githubusercontent.com/chetachiezikeuzor/cMenu-Plugin/master/assets/chesser%20cMenu.gif)

cMenu also has a few stylistic changes that are also customizeable. For those that use the plugin <a href="https://github.com/deathau/sliding-panes-obsidian" target="_blank">Sliding Panes</a>, you can now change cMenu's append method to "body." That way, cMenu will no longer appends to the workspace area, but to the body of the app. This is a bit of a work around for the current issue with <a href="https://github.com/deathau/sliding-panes-obsidian" target="_blank">Sliding Panes</a> but I'm actively looking into a better solution.

![](https://raw.githubusercontent.com/chetachiezikeuzor/cMenu-Plugin/master/assets/cMenu-sliding-panes.gif)

With cMenu, you can change the design aesthetic. Glass morphism is a pretty popular design trend so I thought "why not add this to cMenu?!" You can choose to have a "glass" style for cMenu, which gives it a unique look.

![](https://raw.githubusercontent.com/chetachiezikeuzor/cMenu-Plugin/master/assets/glass-cMenu.gif)

## cMenu Status Bar Menu

With the new [1.1.0](https://github.com/chetachiezikeuzor/cMenu-Plugin/releases/tag/1.1.0) update, you can control to bottom value of cMenu, as well as toggle to hide cMenu and add/delete new command items. The delete button will remove the most recently added command.

![](https://raw.githubusercontent.com/chetachiezikeuzor/cMenu-Plugin/master/assets/cMenu%20status%20bar%20menu.gif)

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

### [1.0.0](https://github.com/chetachiezikeuzor/cMenu-Plugin/releases/tag/1.0.0) - Aug 11, 2021

##### Fixed

- Fixed issue with Sliding Panes with a toggle-able append method setting.
  ![](https://raw.githubusercontent.com/chetachiezikeuzor/cMenu-Plugin/master/assets/cMenu-sliding-panes.gif)

##### Added

- Added new glass morphism setting.
  ![](https://raw.githubusercontent.com/chetachiezikeuzor/cMenu-Plugin/master/assets/glass-cMenu.gif)
- Added new custom commands setting
  ![](https://raw.githubusercontent.com/chetachiezikeuzor/cMenu-Plugin/master/assets/chesser%20cMenu.gif)

---

### [1.0.1](https://github.com/chetachiezikeuzor/cMenu-Plugin/releases/tag/1.0.1) - Aug 11, 2021

##### Added

- Added more icons to command icon chooser

---

### [1.0.2](https://github.com/chetachiezikeuzor/cMenu-Plugin/releases/tag/1.0.2) - Aug 13, 2021

##### Changed

- Removed most !importants for better custom styling

##### Added

- Added a few more icons
- Added updates to UI

---

### [1.0.3](https://github.com/chetachiezikeuzor/cMenu-Plugin/releases/tag/1.0.3) - Aug 13, 2021

##### Added

- Added feather icons

---

### [1.1.0](https://github.com/chetachiezikeuzor/cMenu-Plugin/releases/tag/1.1.0) - Aug 27, 2021

##### Added

- Added new status bar menu for extra cMenu setting: Hide/Show buttons, Bottom value change
  ![](https://raw.githubusercontent.com/chetachiezikeuzor/cMenu-Plugin/master/assets/cMenu%20status%20bar%20menu.gif)
- Added modified text editing commands
  - Commands will maintain focus in editor after execution

---

### [1.1.2](https://github.com/chetachiezikeuzor/cMenu-Plugin/releases/tag/1.1.2) - Sep 14, 2021

##### Added

- Added [remix icons](https://remixicon.com) for command customization (makes it a bit slow :/)
- Added reload function (button to execute and execution after add/delete)
- Added custom columns setting
- Added command reordering in settings
  ![](https://raw.githubusercontent.com/chetachiezikeuzor/cMenu-Plugin/master/assets/reorder_commands.gif)
- Added command to hide/show cMenu
  ![](https://raw.githubusercontent.com/chetachiezikeuzor/cMenu-Plugin/master/assets/hide_show_command.gif)
- Added [remove tags](https://github.com/chetachiezikeuzor/cMenu-Plugin/pull/23) functionality

---

## Checklist

- [x] Glassmorphism setting
  - [x] Setting to toggle for glass effect with cMenu
- [x] Fix to work with Sliding Panes (workaround)
  - [x] Setting to toggle for cMenu to toggle to body instead of modroot
- [x] Add custom commands to cMenu
  - [x] Choose icons for commands without
- [x] [Modify](https://github.com/chetachiezikeuzor/cMenu-Plugin/issues/11#issue-973612232) text editing commands
  - [x] Maintain focus in editor
- [x] Change cMenu [bottom value](https://www.reddit.com/r/ObsidianMD/comments/owlaaf/new_obsidian_plugin_cmenu/h8vkn0v?utm_source=share&utm_medium=web2x&context=3)
- [x] [Hide/show](https://github.com/chetachiezikeuzor/cMenu-Plugin/issues/10#issue-971519914) cMenu
- [x] Add more command icons (Remix Icons)
- [x] Custom cMenu columns
  - [x] Setting to customize cMenu columns (control number of command buttons per row on cMenu)
- [x] Reload cMenu
  - [x] Add reload after new command added and command deletion functions.
  - [x] Add general reload button (runs reload function)
- [ ] Identify if text has been [selected](https://github.com/chetachiezikeuzor/cMenu-Plugin/issues/11#issuecomment-901091701)
- [x] Easy command button [reordering](https://github.com/chetachiezikeuzor/cMenu-Plugin/issues/9#issue-969667944)
- [ ] cMenu workspaces/nested menu
- [ ] Follow the cursor setting
  - [ ] Setting to toggle for cMenu to follow mouse cursor

---

## Support

If you like this plugin and are considering donating to support continued development, use the button below!

Created with ❤️ by Chetachi

<a href="https://www.buymeacoffee.com/chetachi"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&amp;emoji=&amp;slug=chetachi&amp;button_colour=e3e7ef&amp;font_colour=262626&amp;font_family=Inter&amp;outline_colour=262626&amp;coffee_colour=ff0000"></a>
