import type { cMenuSettings } from "src/settings/settingsData";
import { App, Command, MarkdownView, ButtonComponent } from "obsidian";
import { setBottomValue } from "src/util/statusBarConstants";

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
      if (cMenu) {
        cMenu.setAttribute(
          "style",
          `left: calc(50% - calc(${cMenu.offsetWidth}px / 2)); bottom: ${
            settings.cMenuBottomValue
          }em; grid-template-columns: ${"1fr ".repeat(settings.cMenuNumRows)}`
        );
      }
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
          .onClick(() => {
            //@ts-ignore
            app.commands.executeCommandById(item.id);
          });
      });
      document.addEventListener("selectionchange", function (event) {
        setTimeout(async () => {
          const activeLeaf = app.workspace.getActiveViewOfType(MarkdownView);
          if (activeLeaf) {
            cMenu.style.visibility = activeLeaf.editor.somethingSelected() ? "visible" : "hidden";
            const selection = window.getSelection();
            // getCientRects returns all the positioning information we need
            const selectionContainer = selection.getRangeAt(0).commonAncestorContainer as HTMLElement;
            const rect = selectionContainer.getClientRects()[0]

            cMenu.style.height = `${cMenu.offsetHeight}px`;
            // TODO: parents are different, position is error.
            cMenu.style.left = `${rect.right - cMenu.offsetWidth * 1.5}px`;
            if (rect.bottom + cMenu.offsetHeight < document.body.clientHeight) {
              cMenu.style.top = `${rect.bottom}px`;
            } else {
              cMenu.style.top = `${rect.top - cMenu.offsetHeight * 1.5}px`;
            }
            // after cancel select
            let timmer = setInterval(() => {
              if (!activeLeaf.editor.somethingSelected()) {
                cMenu.style.visibility = "hidden";
                clearInterval(timmer);
              };
            }, 100);
          }
        }, 10);
      })
    };
    let Markdown = app.workspace.getActiveViewOfType(MarkdownView);
    if (Markdown) {
      var cMenuModalBar = document.getElementById("cMenuModalBar");
      if (cMenuModalBar) {
        return;
      } else {
        generateMenu();
        let cMenuModalBar = document.getElementById("cMenuModalBar");
        setBottomValue(settings.cMenuBottomValue, settings.cMenuNumRows);
        settings.cMenuVisibility == false
          ? (cMenuModalBar.style.visibility = "hidden")
          : (cMenuModalBar.style.visibility = "visible");
      }
    } else {
      selfDestruct();
    }
  }
  createMenu();
}
