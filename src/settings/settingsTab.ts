import type cMenuPlugin from "src/plugin/main";
import { CommandPicker } from "src/modals/suggesterModals";
import { App, Setting, PluginSettingTab } from "obsidian";
import { APPEND_METHODS, AESTHETIC_STYLES } from "src/settings/settingsData";
import { selfDestruct, cMenuPopover } from "src/modals/cMenuModal";
import Sortable from "sortablejs";
import { debounce } from "obsidian";

export class cMenuSettingTab extends PluginSettingTab {
  plugin: cMenuPlugin;
  appendMethod: string;

  constructor(app: App, plugin: cMenuPlugin) {
    super(app, plugin);
    this.plugin = plugin;
    addEventListener("cMenu-NewCommand", () => {
      selfDestruct();
      cMenuPopover(app, this.plugin.settings);
      this.display();
    });
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h1", { text: "cMenu" });
    containerEl.createEl("p", { text: "Created by " }).createEl("a", {
      text: "Chetachi 👩🏽‍💻",
      href: "https://github.com/chetachiezikeuzor",
    });
    containerEl.createEl("h2", { text: "Plugin Settings" });
    new Setting(containerEl)
      .setName("Customize cMenu append method")
      .setDesc(
        "Choose where cMenu will append upon regeneration. To see the change, hit the reload button in the status bar menu."
      )
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
      .setName("Customize cMenu aesthetic")
      .setDesc(
        "Choose between a glass morphism and default style for cMenu. To see the change, hit the reload button in the status bar menu."
      )
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
      .setName("Customize cMenu columns")
      .setDesc(
        "Choose the number of columns per row to display on cMenu. To see the changes, hit the reload button in the status bar menu."
      )
      .addSlider((slider) => {
        slider
          .setLimits(1, 18, 1)
          .setValue(this.plugin.settings.cMenuNumRows)
          .onChange(
            debounce(
              async (value) => {
                this.plugin.settings.cMenuNumRows = value;
                await this.plugin.saveSettings();
              },
              100,
              true
            )
          )
          .setDynamicTooltip();
      });
    new Setting(containerEl)
      .setName("Customize cMenu commands")
      .setDesc(
        "Add a command from Obsidian's commands library to cMenu. By default, your commands are set to: Toggle bold, Toggle italics, Toggle strikethrough, cMenu: Toggle Underline, cMenu: Toggle Superscript, cMenu: Toggle Subscript, Toggle code, cMenu: Toggle codeblock, and Toggle blockquote."
      )
      .addButton((addButton) => {
        addButton
          .setIcon("cMenuAdd")
          .setTooltip("Add")
          .setClass("cMenuSettingsButton")
          .setClass("cMenuSettingsButtonAdd")
          .onClick(() => {
            new CommandPicker(this.plugin).open();
          });
      });
    const cMenuCommandsContainer = containerEl.createEl("div", {
      cls: "cMenuSettingsTabsContainer",
    });
    Sortable.create(cMenuCommandsContainer, {
      animation: 500,
      ghostClass: "sortable-ghost",
      chosenClass: "sortable-chosen",
      dragClass: "sortable-drag",
      dragoverBubble: true,
      easing: "cubic-bezier(1, 0, 0, 1)",
      onSort: (command) => {
        const arrayResult = this.plugin.settings.menuCommands;
        const [removed] = arrayResult.splice(command.oldIndex, 1);
        arrayResult.splice(command.newIndex, 0, removed);
        this.plugin.saveSettings();
        console.log(arrayResult);
      },
    });
    this.plugin.settings.menuCommands.forEach((newCommand: any) => {
      const setting = new Setting(cMenuCommandsContainer)
        .setClass("cMenuCommandItem")
        .setName(newCommand.name)
        .addButton((deleteButton) => {
          deleteButton
            .setIcon("cMenuDelete")
            .setTooltip("Delete")
            .setClass("cMenuSettingsButton")
            .setClass("cMenuSettingsButtonDelete")
            .onClick(async () => {
              this.plugin.settings.menuCommands.remove(newCommand);
              await this.plugin.saveSettings();
              this.display();
              console.log(
                `%cCommand '${newCommand.name}' was removed from cMenu`,
                "color: #989cab"
              );
            });
        });
      setting.nameEl;
    });
    const cDonationDiv = containerEl.createEl("div", {
      cls: "cDonationSection",
    });

    const credit = createEl("p");
    const donateText = createEl("p");
    donateText.appendText(
      "If you like this Plugin and are considering donating to support continued development, use the button below!"
    );
    credit.appendText("Created with ❤️ by Chetachi");
    credit.setAttribute("style", "color: var(--text-muted)");
    cDonationDiv.appendChild(donateText);
    cDonationDiv.appendChild(credit);

    cDonationDiv.appendChild(
      createDonateButton("https://www.buymeacoffee.com/chetachi")
    );
  }
}

const createDonateButton = (link: string): HTMLElement => {
  const a = createEl("a");
  a.setAttribute("href", link);
  a.addClass("buymeacoffee-chetachi-img");
  a.innerHTML = `<img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=chetachi&button_colour=e3e7ef&font_colour=262626&font_family=Inter&outline_colour=262626&coffee_colour=ff0000" height="42px">`;
  return a;
};
