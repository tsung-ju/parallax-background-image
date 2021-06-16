const template = document.createElement("template");
template.innerHTML = `
  <style>
    :host {
      display: block;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }
    :host([hidden]) {
      display: none;
    }
    :host([backend="3d"]) {
      perspective: 1px;
      perspective-origin: 0 0;
    }
  </style>
  <slot></slot>
`;

export class ParallaxViewport extends HTMLElement {
  get backend() {
    return this.getAttribute("backend");
  }
  set backend(value) {
    this.setAttribute("backend", value);
  }
  constructor() {
    super();
    if (!this.hasAttribute("backend")) {
      this.setAttribute("backend", isChrome() ? "3d" : "2d");
    }
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

function isChrome() {
  const userAgent = navigator.userAgent;
  return (
    userAgent.indexOf("Chrome/") !== -1 && userAgent.indexOf("Edge/") === -1
  );
}
