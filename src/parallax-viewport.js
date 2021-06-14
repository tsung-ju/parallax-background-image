import { USE_3D } from "./config.js";

const template = document.createElement("template");
template.innerHTML = `
  <style>
    :host {
      display: block;
      overflow-x: hidden;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      ${USE_3D ? "perspective: 1px;" : ""}
      ${USE_3D ? "perspective-origin: 0 0;" : ""}
    }
    :host([hidden]) {
      display: none;
    }
  </style>
  <slot></slot>
`;

export class ParallaxViewport extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
