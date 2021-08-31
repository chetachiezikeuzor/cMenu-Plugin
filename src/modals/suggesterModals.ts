import type cMenuPlugin from "src/plugin/main";
import { appIcons } from "src/icons/appIcons";
import { Command, setIcon, FuzzyMatch, FuzzySuggestModal } from "obsidian";

class ChooseFromIconList extends FuzzySuggestModal<string> {
  plugin: cMenuPlugin;
  command: Command;

  constructor(plugin: cMenuPlugin, command: Command) {
    super(plugin.app);
    this.plugin = plugin;
    this.command = command;
    this.setPlaceholder("Choose an icon");
  }

  private capitalJoin(string: string): string {
    const icon = string.split(" ");

    return icon
      .map((icon) => {
        return icon[0].toUpperCase() + icon.substring(1);
      })
      .join(" ");
  }

  getItems(): string[] {
    return appIcons;
  }

  getItemText(item: string): string {
    return this.capitalJoin(
      item
        .replace("feather-", "")
        .replace("remix-", "")
        .replace("bx-", "")
        .replace(/([A-Z])/g, " $1")
        .trim()
        .replace(/-/gi, " ")
    );
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
    this.setPlaceholder("Choose a command");
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
