import { App, Setting, Command, PluginSettingTab } from "obsidian";
import cMenuPlugin from "main";
import { CommandPicker } from "src/modals";
export const APPEND_METHODS = ["body", "workspace"];
export const AESTHETIC_STYLES = ["glass", "default"];

export interface cMenuSettings {
  aestheticStyle: string;
  menuCommands: Command[];
  gridItems: string;
  appendMethod: string;
}

export const DEFAULT_SETTINGS: cMenuSettings = {
  aestheticStyle: "default",
  menuCommands: [],
  gridItems: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
  appendMethod: "workspace",
};

export class cMenuSettingTab extends PluginSettingTab {
  plugin: cMenuPlugin;
  appendMethod: string;

  constructor(app: App, plugin: cMenuPlugin) {
    super(app, plugin);
    this.plugin = plugin;
    addEventListener("cMenu-NewCommand", () => {
      this.display();
    });
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "cMenu Settings" });
    new Setting(containerEl)
      .setName("Customize cMenu append method.")
      .setDesc("Choose where cMenu will append upon regeneration.")
      .addDropdown((dropdown) => {
        let methods: Record<string, string> = {};
        APPEND_METHODS.map((method) => (methods[method] = method));
        dropdown.addOptions(methods);
        dropdown
          .setValue(this.plugin.settings.appendMethod)
          .onChange((appendMethod) => {
            this.plugin.settings.appendMethod = appendMethod;
            this.plugin.saveSettings();
          });
      });
    new Setting(containerEl)
      .setName("Customize cMenu aesthetic.")
      .setDesc("Choose between a glass morphism and default style for cMenu.")
      .addDropdown((dropdown) => {
        let aesthetics: Record<string, string> = {};
        AESTHETIC_STYLES.map(
          (aesthetic) => (aesthetics[aesthetic] = aesthetic)
        );
        dropdown.addOptions(aesthetics);
        dropdown
          .setValue(this.plugin.settings.aestheticStyle)
          .onChange((aestheticStyle) => {
            this.plugin.settings.aestheticStyle = aestheticStyle;
            this.plugin.saveSettings();
          });
      });
    new Setting(containerEl)
      .setName("Customize cMenu Commands")
      .setDesc("Add a command from Obsidian's commands library to cMenu.")
      .addButton((addButton) => {
        addButton
          .setIcon("cMenuAdd")
          .setClass("cMenuSettingsButton")
          .setClass("cMenuSettingsButtonAdd")
          .onClick(() => {
            new CommandPicker(this.plugin).open();
          });
      });
    this.plugin.settings.menuCommands.forEach((newCommand) => {
      const setting = new Setting(containerEl)
        .setName(newCommand.name)
        .addButton((deleteButton) => {
          deleteButton
            .setIcon("cMenuDelete")
            .setClass("cMenuSettingsButton")
            .setClass("cMenuSettingsButtonDelete")
            .onClick(async () => {
              this.plugin.settings.menuCommands.remove(newCommand);
              await this.plugin.saveSettings();
              this.display();
              console.log(
                `%cCommand '${newCommand.name}' was removed from cMenu`,
                "color: #ff2360"
              );
            });
        });
      setting.nameEl;
    });

    const div = containerEl.createEl("div", {
      cls: "cDonationSection",
    });

    const credit = createEl("p");
    const donateText = createEl("p");
    donateText.appendText(
      "If you like this Plugin and are considering donating to support continued development, use the button below!"
    );
    credit.appendText("Created with ❤️ by Chetachi");
    credit.setAttribute("style", "color: var(--text-muted)");
    div.appendChild(donateText);
    div.appendChild(credit);

    div.appendChild(
      createDonateButton("https://www.buymeacoffee.com/chetachi")
    );
  }
  save() {
    this.plugin.saveSettings();
  }
}

const createDonateButton = (link: string): HTMLElement => {
  const a = createEl("a");
  a.setAttribute("href", link);
  a.addClass("buymeacoffee-chetachi-img");
  a.innerHTML = `<img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=chetachi&button_colour=e3e7ef&font_colour=262626&font_family=Inter&outline_colour=262626&coffee_colour=ff0000" height="42px">`;
  return a;
};
