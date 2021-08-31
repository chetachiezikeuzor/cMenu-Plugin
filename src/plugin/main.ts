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
  App,
} from "obsidian";

import { cMenuSettingTab } from "src/settings/settingsTab";
import { cMenuSettings, DEFAULT_SETTINGS } from "src/settings/settingsData";

import { wait } from "src/util/util";
import { appIcons } from "src/icons/appIcons";
import { CommandPicker } from "src/modals/suggesterModals";
import { selfDestruct, cMenuPopover } from "src/modals/cMenuModal";
import addIcons, {
  addFeatherIcons,
  addRemixIcons,
  addBoxIcons,
} from "src/icons/customIcons";
import { setMenuVisibility, setBottomValue } from "src/util/statusBarConstants";

export default class cMenuPlugin extends Plugin {
  app: App;
  settings: cMenuSettings;
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
    addRemixIcons(appIcons);
    //addBoxIcons(appIcons);
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
        char: number;
        line: number;
      };
    };

    const commandsMap: commandsPlot = {
      underline: {
        replacement: (selectedText) =>
          applyCommand("<u>", selectedText, "</u>"),
        char: 3,
        line: 0,
      },
      superscript: {
        replacement: (selectedText) =>
          applyCommand("<sup>", selectedText, "</sup>"),
        char: 5,
        line: 0,
      },
      subscript: {
        replacement: (selectedText) =>
          applyCommand("<sub>", selectedText, "</sub>"),
        char: 5,
        line: 0,
      },
      codeblock: {
        replacement: (selectedText) =>
          applyCommand("\n```\n", selectedText, "\n```\n"),
        char: 5,
        line: 1,
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
                curserEnd.ch + commandsMap[type].char
              );
            } else {
              editor.replaceRange(
                commandsMap[type].replacement(selection),
                curserStart
              );
              editor.setCursor(
                curserStart.line + commandsMap[type].line,
                curserEnd.ch + commandsMap[type].char
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
        id: `${type["id"]}`,
        name: `${type["name"]}`,
        icon: `${type["icon"]}`,
        callback: async () => {
          const activeLeaf =
            this.app.workspace.getActiveViewOfType(MarkdownView);
          const view = activeLeaf;
          const editor = view.editor;
          const curserStart = editor.getCursor("from");
          const curserEnd = editor.getCursor("to");
          let char;
          `${type["id"]}` == "editor:insert-embed"
            ? (char = 3)
            : `${type["id"]}` == "editor:insert-link"
            ? (char = 2)
            : `${type["id"]}` == "editor:insert-tag"
            ? (char = 1)
            : `${type["id"]}` == "editor:insert-wikilink"
            ? (char = 3)
            : `${type["id"]}` == "editor:toggle-bold"
            ? (char = 2)
            : `${type["id"]}` == "editor:toggle-italics"
            ? (char = 1)
            : `${type["id"]}` == "editor:toggle-strikethrough"
            ? (char = 2)
            : `${type["id"]}` == "editor:toggle-code"
            ? (char = 1)
            : `${type["id"]}` == "editor:toggle-blockquote"
            ? (char = 2)
            : `${type["id"]}` == "editor:toggle-bullet-list"
            ? (char = 2)
            : `${type["id"]}` == "editor:toggle-checklist-status"
            ? (char = 4)
            : `${type["id"]}` == "editor:toggle-comments"
            ? (char = 2)
            : `${type["id"]}` == "editor:toggle-highlight"
            ? (char = 2)
            : `${type["id"]}` == "editor:toggle-numbered-list"
            ? (char = 3)
            : (char = 2);
          //@ts-ignore
          this.app.commands.executeCommandById(`${type["id"]}`);
          editor.setCursor(curserStart.line, curserEnd.ch + char);
          await wait(10);
          //@ts-ignore
          this.app.commands.executeCommandById("editor:focus");
        },
      });
    });
  }

  setupStatusBar() {
    this.statusBarIcon = this.addStatusBarItem();
    this.statusBarIcon.addClass("cMenu-statusbar-button");
    setIcon(this.statusBarIcon, "cMenu");

    this.registerDomEvent(this.statusBarIcon, "click", () => {
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
      menuDom.addClass("cMenu-statusbar-menu");

      const item = menuDom.createDiv("menu-item");
      item.createDiv({ cls: "menu-item-icon" });
      item.createDiv({ text: "Bottom", cls: "menu-item-title" });
      item.onClickEvent((e) => e.stopPropagation());

      new SliderComponent(item)
        .setLimits(2, 18, 0.25)
        .setValue(this.settings.cMenuBottomValue)
        .onChange(
          debounce(
            async (value) => {
              console.log(`%c${value}em`, "color: Violet");
              this.settings.cMenuBottomValue = value;
              setBottomValue(
                this.settings.cMenuBottomValue,
                this.settings.cMenuNumRows
              );
              await this.saveSettings();
            },
            100,
            true
          )
        )
        .setDynamicTooltip();

      const buttonItem = menuDom.createDiv({ cls: "menu-item buttonitem" });
      const addButton = new ButtonComponent(buttonItem);
      const deleteButton = new ButtonComponent(buttonItem);
      const refreshButton = new ButtonComponent(buttonItem);
      addButton
        .setIcon("cMenuAdd")
        .setClass("cMenuSettingsButton")
        .setClass("cMenuSettingsButtonAdd")
        .setClass("cMenuStatusButton")
        .setTooltip("Add")
        .onClick(() => {
          new CommandPicker(this).open();
        });
      this.settings.menuCommands.forEach((newCommand) => {
        deleteButton
          .setIcon("cMenuDelete")
          .setClass("cMenuSettingsButton")
          .setClass("cMenuSettingsButtonDelete")
          .setTooltip("Delete")
          .onClick(async () => {
            this.settings.menuCommands.remove(newCommand);
            await this.saveSettings();
            setTimeout(() => {
              dispatchEvent(new Event("cMenu-NewCommand"));
            }, 100);
            console.log(
              `%cCommand '${newCommand.name}' was removed from cMenu`,
              "color: #989cab"
            );
          });
      });
      refreshButton
        .setIcon("cMenuReload")
        .setClass("cMenuSettingsButton")
        .setClass("cMenuSettingsButtonRefresh")
        .setTooltip("Refresh")
        .onClick(async () => {
          setTimeout(() => {
            dispatchEvent(new Event("cMenu-NewCommand"));
          }, 100);
          console.log(`%ccMenu refreshed`, "color: Violet");
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