import { App, Command, MarkdownView, ButtonComponent } from "obsidian";
import { cMenuSettings } from "src/settings";

export function selfDestruct() {
  let cMenuModalBar = document.getElementById("cMenuModalBar");
  if (cMenuModalBar) {
    if (cMenuModalBar.firstChild) {
      cMenuModalBar.removeChild(cMenuModalBar.firstChild);
    }
    cMenuModalBar.remove();
  }
}

export function cMenuPopover(app: App, settings: cMenuSettings): void {
  function createMenu() {
    const generateMenu = () => {
      var cMenu = createEl("div");
      cMenu.setAttribute("id", "cMenuModalBar");

      settings.aestheticStyle == "default"
        ? cMenu.addClass("cMenuDefaultAesthetic")
        : cMenu.addClass("cMenuGlassAesthetic");

      settings.appendMethod == "workspace"
        ? document.body
            .querySelector(".mod-vertical.mod-root")
            .insertAdjacentElement("afterbegin", cMenu)
        : document.body.appendChild(cMenu);

      settings.menuCommands.forEach((item: Command) => {
        var button = new ButtonComponent(cMenu);
        button
          .setIcon(item.icon)
          .setClass("cMenuCommandItem")
          .setTooltip(item.name)
          .onClick((_) => {
            //@ts-ignore
            app.commands.executeCommandById(item.id);
          });
      });
    };

    if (app.workspace.getActiveViewOfType(MarkdownView)) {
      var cMenuModalBar = document.getElementById("cMenuModalBar");
      if (cMenuModalBar) {
        return;
      } else {
        generateMenu();
        let cMenuModalBar = document.getElementById("cMenuModalBar");
        cMenuModalBar.childElementCount >= 9
          ? cMenuModalBar.addClass("cMenuGrid")
          : cMenuModalBar.addClass("cMenuFlex");
        var clientWidth = document.getElementById("cMenuModalBar").offsetWidth;

        cMenuModalBar.setAttribute(
          "style",
          `left: calc(50% - calc(${clientWidth}px / 2));`
        );
      }
    } else {
      selfDestruct();
    }
  }
  createMenu();
}
