import {
  Menu,
  Plugin,
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
import { CommandPicker } from "./src/modals";
import addIcons from "./src/customIcons";
import { addFeatherIcons } from "./src/customIcons";
import { appIcons } from "./src/appIcons";
import { selfDestruct, cMenuPopover } from "./src/menu";
import { setMenuVisibility, setBottomValue } from "./src/statusBarConstants";

export default class cMenuPlugin extends Plugin {
  settings: cMenuSettings;
  statusBarIcon: HTMLElement;
  cMenuBar: HTMLElement;

  async onload(): Promise<void> {
    console.log("cMenu v" + this.manifest.version + " loaded");
    await this.loadSettings();
    addIcons();
    this.app.workspace.onLayoutReady(() => {
      setTimeout(() => {
        this.setupStatusBar();
      });
    });
    addFeatherIcons(appIcons);

    this.addCommand({
      id: "underline",
      name: "Toggle Underline",
      icon: "underline-glyph",
      callback: async () => {
        var activeLeaf = this.app.workspace.getActiveViewOfType(MarkdownView);
        if (activeLeaf) {
          var view = activeLeaf;
          var editor = view.editor;
          var selection = editor.getSelection();
          if (selection) {
            editor.replaceSelection("<u>" + selection + "</u>");
          } else {
            return;
          }
        }
      },
    });

    this.addCommand({
      id: "superscript",
      name: "Toggle Superscript",
      icon: "superscript-glyph",
      callback: async () => {
        var activeLeaf = this.app.workspace.getActiveViewOfType(MarkdownView);
        if (activeLeaf) {
          var view = activeLeaf;
          var editor = view.editor;
          var selection = editor.getSelection();
          if (selection) {
            editor.replaceSelection("<sup>" + selection + "</sup>");
          } else {
            return;
          }
        }
      },
    });

    this.addCommand({
      id: "subscript",
      name: "Toggle Subscript",
      icon: "subscript-glyph",
      callback: async () => {
        var activeLeaf = this.app.workspace.getActiveViewOfType(MarkdownView);
        if (activeLeaf) {
          var view = activeLeaf;
          var editor = view.editor;
          var selection = editor.getSelection();
          if (selection) {
            editor.replaceSelection("<sub>" + selection + "</sub>");
          } else {
            return;
          }
        }
      },
    });

    this.addCommand({
      id: "codeblock",
      name: "Toggle codeblock",
      icon: "codeblock-glyph",
      callback: async () => {
        var activeLeaf = this.app.workspace.getActiveViewOfType(MarkdownView);
        if (activeLeaf) {
          var view = activeLeaf;
          var editor = view.editor;
          var selection = editor.getSelection();
          if (selection) {
            editor.replaceSelection("\n```\n" + selection + "\n```\n");
          } else {
            return;
          }
        }
      },
    });

    this.addSettingTab(new cMenuSettingTab(this.app, this));
    this.registerEvent(
      this.app.workspace.on("active-leaf-change", this.handlecMenu)
    );
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
