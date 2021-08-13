import { Command, setIcon, FuzzyMatch, FuzzySuggestModal } from "obsidian";
import cMenuPlugin from "main";
import { appIcons } from "./appIcons";

class ChooseFromIconList extends FuzzySuggestModal<string> {
  plugin: cMenuPlugin;
  command: Command;

  constructor(plugin: cMenuPlugin, command: Command) {
    super(plugin.app);
    this.plugin = plugin;
    this.command = command;
    this.setPlaceholder("Choose from icon list");
  }

  getItems(): string[] {
    return appIcons;
  }

  getItemText(item: string): string {
    return item.replace("feather-", "").replace(/-/gi, " ");
  }

  renderSuggestion(icon: FuzzyMatch<string>, iconItem: HTMLElement): void {
    const span = createSpan({ cls: "cMenuIconPick" });
    iconItem.appendChild(span);
    setIcon(span, icon.item);
    super.renderSuggestion(icon, iconItem);
  }

  async onChooseItem(item: string): Promise<void> {
    this.command.icon = item;
    this.plugin.settings.menuCommands.push(this.command);
    await this.plugin.saveSettings();
    setTimeout(() => {
      dispatchEvent(new Event("cMenu-NewCommand"));
    }, 100);
    console.log(
      `%cCommand '${this.command.name}' was added to cMenu`,
      "color: Violet"
    );
  }
}

export class CommandPicker extends FuzzySuggestModal<Command> {
  command: Command;
  constructor(private plugin: cMenuPlugin) {
    super(plugin.app);
    this.app;
    this.setPlaceholder("Choose from commands list");
  }

  getItems(): Command[] {
    //@ts-ignore
    return this.app.commands.listCommands();
  }

  getItemText(item: Command): string {
    return item.name;
  }

  async onChooseItem(item: Command): Promise<void> {
    if (item.icon) {
      this.plugin.settings.menuCommands.push(item);
      await this.plugin.saveSettings();
      setTimeout(() => {
        dispatchEvent(new Event("cMenu-NewCommand"));
      }, 100);
      console.log(
        `%cCommand '${item.name}' was added to cMenu`,
        "color: Violet"
      );
    } else {
      new ChooseFromIconList(this.plugin, item).open();
    }
  }
}
