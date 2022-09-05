import type { Command } from "obsidian";
export const APPEND_METHODS = ["body", "workspace"];
export const AESTHETIC_STYLES = ["glass", "default","tiny"];
export const POSITION_STYLES = ["fixed", "following"];

export interface cMenuSettings {
  aestheticStyle: string;
  positionStyle: string;
  menuCommands: Command[];
  appendMethod: string;
  shouldShowMenuOnSelect: boolean;
  cMenuVisibility: boolean;
  cMenuBottomValue: number;
  cMenuNumRows: number;
}

export const DEFAULT_SETTINGS: cMenuSettings = {
  aestheticStyle: "default",
  positionStyle:"fixed",
  menuCommands: [
    {
      id: "cmenu-plugin:editor:toggle-bold",
      name: "cMenu: Toggle bold",
      icon: "bold-glyph",
    },
    {
      id: "cmenu-plugin:editor:toggle-italics",
      name: "cMenu: Toggle italics",
      icon: "italic-glyph",
    },
    {
      id: "cmenu-plugin:editor:toggle-strikethrough",
      name: "cMenu: Toggle strikethrough",
      icon: "strikethrough-glyph",
    },
    {
      id: "cmenu-plugin:underline",
      name: "cMenu: Toggle underline",
      icon: "underline-glyph",
    },
    {
      id: "cmenu-plugin:superscript",
      name: "cMenu: Toggle superscript",
      icon: "superscript-glyph",
    },
    {
      id: "cmenu-plugin:subscript",
      name: "cMenu: Toggle subscript",
      icon: "subscript-glyph",
    },
    {
      id: "cmenu-plugin:editor:toggle-code",
      name: "cMenu: Toggle code",
      icon: "code-glyph",
    },
    {
      id: "cmenu-plugin:codeblock",
      name: "cMenu: Toggle codeblock",
      icon: "codeblock-glyph",
    },
    {
      id: "cmenu-plugin:editor:toggle-blockquote",
      name: "cMenu: Toggle blockquote",
      icon: "quote-glyph",
    },
  ],
  appendMethod: "workspace",
  shouldShowMenuOnSelect: false,
  cMenuVisibility: true,
  cMenuBottomValue: 4.25,
  cMenuNumRows: 9,
};
