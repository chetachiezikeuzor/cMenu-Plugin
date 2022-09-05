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
const getcoords = ( editor:any ) => {
  const cursor = editor.getCursor("from");

  let coords;
  if (editor.cursorCoords) coords = editor.cursorCoords(true, "window");
  else if (editor.coordsAtPos) {
      const offset = editor.posToOffset(cursor);
      coords = (editor).cm.coordsAtPos?.(offset) ?? (editor).coordsAtPos(offset);
  } else return;

  return coords;
};
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
      if( settings.aestheticStyle == "default")
            {
              cMenu.addClass("cMenuDefaultAesthetic");
              cMenu.removeClass("cMenuTinyAesthetic");
              cMenu.removeClass("cMenuGlassAesthetic");
            } else if( settings.aestheticStyle == "tiny")
            {
              cMenu.addClass("cMenuTinyAesthetic");
              cMenu.removeClass("cMenuDefaultAesthetic");
              cMenu.removeClass("cMenuGlassAesthetic");
            }else{
              cMenu.addClass("cMenuGlassAesthetic");
              cMenu.removeClass("cMenuTinyAesthetic");
              cMenu.removeClass("cMenuDefaultAesthetic");
            }
            
      settings.appendMethod == "workspace"
        ? document.body
            .querySelector(".mod-vertical.mod-root")
            .insertAdjacentElement("afterbegin", cMenu)
        : document.body.appendChild(cMenu);

        function followingbar (_event: any) {

          let activeLeaf =app.workspace.activeLeaf
          if (activeLeaf.getViewState().type === "empty") {
            return;
          }
          //console.log(activeLeaf.getViewState().state.mode)
          if (activeLeaf.getViewState().state.mode === "source") {
         
            
            let editor = activeLeaf.view.sourceMode.cmEditor

            let coords=getcoords(editor);

            let cMenuModalBar = document.getElementById("cMenuModalBar");
            if(cMenuModalBar){ 
              if(activeLeaf.getViewState().state.mode === 'preview'){
 
                  cMenuModalBar.style.visibility = "hidden";
                  return;
              }
              var selection = editor.somethingSelected()
              if(settings.positionStyle == "following")
              selection?cMenuModalBar.style.visibility = "visible":   cMenuModalBar.style.visibility = "hidden";

              let  ElementCount = cMenuModalBar.childElementCount;
              if(ElementCount)
              {       ElementCount >= 40
                ? cMenuModalBar.addClass("cMenuGrid")
                : cMenuModalBar.addClass("cMenuFlex");
              }
              else
              {
                ElementCount=0;
              }
              let  cMenuRows =  settings.cMenuNumRows  ;
              let cmheight =  Math.ceil(ElementCount / cMenuRows)   ;
           

              cMenu.style.height = 40 * cmheight   + "px";
              if( settings.aestheticStyle == "tiny")
              {
               cMenu.style.height = 25 * cmheight   + "px";
              }
              var rleftwidth =  document.getElementsByClassName('side-dock-ribbon mod-left')[0]?.clientWidth??0 ;
               
              var leftwidth =  document.getElementsByClassName('mod-left-split')[0]?.clientWidth??0 ;
          
              var barwidth = document.getElementById("cMenuModalBar").offsetWidth;
              var barHeight = document.getElementById("cMenuModalBar").offsetHeight;

              var bodywidth=document.body.offsetWidth;
              /*添加判断边界 by cuman*/
              cMenu.style.top=coords.top-barHeight -30 + "px";
              cMenu.style.left=coords.left - leftwidth -rleftwidth +20 +"px";

              if((coords.left+ barwidth+15) >bodywidth)
              cMenu.style.left=coords.left - leftwidth -rleftwidth - barwidth/1.5 -40+"px";
      
          
            }    
          }  
        }
        
        if(settings.positionStyle == "following")
        {
          var scope = document.querySelector("body");
          scope.addEventListener("mouseup", followingbar, false);

        }
        settings.menuCommands.forEach((item) => {
          var button = new ButtonComponent(cMenu);                
          button
              .setIcon(item.icon)
              .setClass("cMenuCommandItem")
              .setTooltip(item.name)
              .onClick(() => {
              //@ts-ignore
              app.commands.executeCommandById(item.id);
              settings.cMenuVisibility == false
              settings.positionStyle == "following"
              ? ( cMenu.style.visibility = "hidden")
              : (cMenu.style.visibility = "visible");
          });                
        });
    
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
