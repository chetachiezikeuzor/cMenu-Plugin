import {
  Menu,
  Plugin,
  Command,
  setIcon,
  debounce,
  MarkdownView,
  SliderComponent,
  ToggleComponent,
  ButtonComponent,
} from "obsidian";

import {
  cMenuSettings,
  DEFAULT_SETTINGS,
  cMenuSettingTab,
} from "./src/settings";

import { wait } from "./src/util";
import { appIcons } from "./src/appIcons";
import { CommandPicker } from "./src/modals";
import { selfDestruct, cMenuPopover } from "./src/menu";
import addIcons, { addFeatherIcons } from "./src/customIcons";
import { setMenuVisibility, setBottomValue } from "./src/statusBarConstants";

export default class cMenuPlugin extends Plugin {
  settings: cMenuSettings;
  plugin: cMenuPlugin;
  statusBarIcon: HTMLElement;
  cMenuBar: HTMLElement;
  modCommands: Command[] = [
    {
      id: "editor:insert-embed",
      name: "Add embed",
      icon: "note-glyph",
    },
    {
      id: "editor:insert-link",
      name: "Insert markdown link",
      icon: "link-glyph",
    },
    {
      id: "editor:insert-tag",
      name: "Add tag",
      icon: "price-tag-glyph",
    },
    {
      id: "editor:insert-wikilink",
      name: "Add internal link",
      icon: "bracket-glyph",
    },
    {
      id: "editor:toggle-bold",
      name: "Toggle bold",
      icon: "bold-glyph",
    },
    {
      id: "editor:toggle-italics",
      name: "Toggle italics",
      icon: "italic-glyph",
    },
    {
      id: "editor:toggle-strikethrough",
      name: "Toggle strikethrough",
      icon: "strikethrough-glyph",
    },
    {
      id: "editor:toggle-code",
      name: "Toggle code",
      icon: "code-glyph",
    },
    {
      id: "editor:toggle-blockquote",
      name: "Toggle blockquote",
      icon: "quote-glyph",
    },
    {
      id: "editor:toggle-bullet-list",
      name: "Toggle bullet",
      icon: "bullet-list-glyph",
    },
    {
      id: "editor:toggle-checklist-status",
      name: "Toggle checklist status",
      icon: "checkbox-glyph",
    },
    {
      id: "editor:toggle-comments",
      name: "Toggle comment",
      icon: "percent-sign-glyph",
    },
    {
      id: "editor:toggle-highlight",
      name: "Toggle highlight",
      icon: "highlight-glyph",
    },
    {
      id: "editor:toggle-numbered-list",
      name: "Toggle numbered list",
      icon: "number-list-glyph",
    },
  ];

  async onload(): Promise<void> {
    console.log("cMenu v" + this.manifest.version + " loaded");
    await this.loadSettings();
    addIcons();
    addFeatherIcons(appIcons);
    this.generateCommands();
    this.app.workspace.onLayoutReady(() => {
      setTimeout(() => {
        this.setupStatusBar();
      });
    });
    this.addSettingTab(new cMenuSettingTab(this.app, this));
    this.registerEvent(
      this.app.workspace.on("active-leaf-change", this.handlecMenu)
    );
  }

  generateCommands() {
    const applyCommand = (
      prefix: string,
      selectedText: string,
      suffix: string
    ) => {
      suffix = suffix || prefix;
      return `${prefix}${selectedText}${suffix}`;
    };

    type commandsPlot = {
      [key: string]: {
        replacement: (selectedText: string) => string;
        cursor: number;
        line: number;
      };
    };

    const commandsMap: commandsPlot = {
      underline: {
        replacement: (selectedText) =>
          applyCommand("<u>", selectedText, "</u>"),
        cursor: 3,
        line: 0,
      },
      superscript: {
        replacement: (selectedText) =>
          applyCommand("<sup>", selectedText, "</sup>"),
        cursor: 5,
        line: 0,
      },
      subscript: {
        replacement: (selectedText) =>
          applyCommand("<sub>", selectedText, "</sub>"),
        cursor: 5,
        line: 0,
      },
      codeblock: {
        replacement: (selectedText) =>
          applyCommand("\n```\n", selectedText, "\n```\n"),
        cursor: 5,
        line: 2,
      },
    };

    Object.keys(commandsMap).forEach((type) => {
      this.addCommand({
        id: `${type}`,
        name: `Toggle ${type}`,
        icon: `${type}-glyph`,
        callback: async () => {
          const activeLeaf =
            this.app.workspace.getActiveViewOfType(MarkdownView);
          if (activeLeaf) {
            const view = activeLeaf;
            const editor = view.editor;
            const selection = editor.getSelection();
            const curserStart = editor.getCursor("from");
            const curserEnd = editor.getCursor("to");
            if (selection) {
              editor.replaceSelection(commandsMap[type].replacement(selection));
              editor.setCursor(
                curserStart.line + commandsMap[type].line,
                curserEnd.ch + commandsMap[type].cursor
              );
            } else {
              editor.replaceRange(
                commandsMap[type].replacement(selection),
                curserStart
              );
              editor.setCursor(
                curserStart.line + commandsMap[type].line,
                curserEnd.ch + commandsMap[type].cursor
              );
            }
            await wait(10);
            //@ts-ignore
            this.app.commands.executeCommandById("editor:focus");
          }
        },
      });
    });

    this.modCommands.forEach((type) => {
      this.addCommand({
        id: `${type["id"]}`.trim().replace(/cMenu: /g, ""),
        name: `${type["name"]}`.trim().replace(/cMenu: /g, ""),
        icon: `${type["icon"]}`,
        callback: async () => {
          //@ts-ignore
          this.app.commands.executeCommandById(`${type["id"]}`);
          await wait(10);
          //@ts-ignore
          this.app.commands.executeCommandById("editor:focus");
        },
      });
    });
  }

  setupStatusBar() {
    this.statusBarIcon = this.addStatusBarItem();
    this.statusBarIcon.addClass("cmenu-statusbar-button");
    setIcon(this.statusBarIcon, "cMenu");

    this.registerDomEvent(this.statusBarIcon, "click", (e) => {
      const statusBarRect =
        this.statusBarIcon.parentElement.getBoundingClientRect();
      const statusBarIconRect = this.statusBarIcon.getBoundingClientRect();

      const menu = new Menu(this.app).addItem((item) => {
        item.setTitle("Hide & Show");

        const itemDom = (item as any).dom as HTMLElement;
        const toggleComponent = new ToggleComponent(itemDom)
          .setValue(this.settings.cMenuVisibility)
          .setDisabled(true);

        const toggle = async () => {
          this.settings.cMenuVisibility = !this.settings.cMenuVisibility;
          toggleComponent.setValue(this.settings.cMenuVisibility);
          setMenuVisibility(this.settings.cMenuVisibility);
          await this.saveSettings();
        };

        item.onClick((e) => {
          e.preventDefault();
          e.stopImmediatePropagation();
          toggle();
        });
      });

      const menuDom = (menu as any).dom as HTMLElement;
      menuDom.addClass("cmenu-statusbar-menu");

      const item = menuDom.createDiv("menu-item");
      item.createDiv({ cls: "menu-item-icon" });
      item.createDiv({ text: "Bottom", cls: "menu-item-title" });
      item.onClickEvent((e) => e.stopPropagation());

      new SliderComponent(item)
        .setLimits(2, 12, 0.25)
        .setValue(this.settings.cMenuBottomValue)
        .onChange(
          debounce(
            async (value) => {
              console.log(`%c${value}em`, "color: Violet");
              this.settings.cMenuBottomValue = value;
              setBottomValue(this.settings.cMenuBottomValue);
              await this.saveSettings();
            },
            100,
            true
          )
        )
        .setDynamicTooltip();

      const buttonItem = menuDom.createDiv({ cls: "menu-item buttonitem" });
      var addButton = new ButtonComponent(buttonItem);
      var deleteButton = new ButtonComponent(buttonItem);
      addButton
        .setIcon("cMenuAdd")
        .setClass("cMenuSettingsButton")
        .setClass("cMenuSettingsButtonAdd")
        .setClass("cMenuStatusButton")
        .setTooltip("Add to cMenu")
        .onClick(() => {
          new CommandPicker(this).open();
        });
      this.settings.menuCommands.forEach((newCommand) => {
        deleteButton
          .setIcon("cMenuDelete")
          .setClass("cMenuSettingsButton")
          .setClass("cMenuSettingsButtonDelete")
          .onClick(async () => {
            this.settings.menuCommands.remove(newCommand);
            await this.saveSettings();
            console.log(
              `%cCommand '${newCommand.name}' was removed from cMenu`,
              "color: #989cab"
            );
          });
      });

      menu.showAtPosition({
        x: statusBarIconRect.right + 5,
        y: statusBarRect.top - 5,
      });
    });
  }

  onunload(): void {
    selfDestruct();
    console.log("cMenu unloaded");
    this.app.workspace.off("active-leaf-change", this.handlecMenu);
  }

  handlecMenu = (): void => {
    cMenuPopover(this.app, this.settings);
  };

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
