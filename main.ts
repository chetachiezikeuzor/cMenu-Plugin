import { Plugin, MarkdownView } from "obsidian";
import addIcons from "./src/customIcons";
import { selfDestruct, cMenuPopover } from "src/menu";
import { cMenuSettings, DEFAULT_SETTINGS, cMenuSettingTab } from "src/settings";

export default class cMenuPlugin extends Plugin {
  settings: cMenuSettings;
  statusBarIcon: HTMLElement;

  async onload(): Promise<void> {
    console.log("cMenu v" + this.manifest.version + " loaded");
    await this.loadSettings();
    addIcons();

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
