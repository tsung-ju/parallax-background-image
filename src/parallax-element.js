import { createTransform } from "./transform.js";

const template = document.createElement("template");
template.innerHTML = `
  <style>
    :host {
      display: block;
      position: relative;
      overflow: hidden;
      background: none !important;
      background-image: none !important;
    }
    :host([hidden]) {
      display: none;
    }
    #image {
      position: absolute;
      transform-origin: 0 0 0;
      will-change: transform;
      pointer-events: none;
    }
    ::slotted(*) {
      position: relative;
    }
  </style>
  <img id="image">
  <slot></slot>
`;

export class ParallaxElement extends HTMLElement {
  static get observedAttributes() {
    return ["velocity-x", "velocity-y", "align-x", "align-y", "image-src"];
  }

  get velocityX() {
    return parseFloat(this.getAttribute("velocity-x"));
  }
  set velocityX(value) {
    this.setAttribute("velocity-x", value.toString());
  }
  get velocityY() {
    return parseFloat(this.getAttribute("velocity-y"));
  }
  set velocityY(value) {
    this.setAttribute("velocity-y", value.toString());
  }
  get alignX() {
    const str = this.getAttribute("align-x");
    if (str === "left") {
      return 0;
    } else if (str === "center") {
      return 0.5;
    } else if (str === "right") {
      return 1;
    } else if (str?.endsWith("%")) {
      return parseFloat(str);
    } else {
      return NaN;
    }
  }
  set alignX(value) {
    this.setAttribute("align-x", `${value * 100}%`);
  }
  get alignY() {
    const str = this.getAttribute("align-y");
    if (str === "top") {
      return 0;
    } else if (str === "center") {
      return 0.5;
    } else if (str === "bottom") {
      return 1;
    } else if (str?.endsWith("%")) {
      return parseFloat(str);
    } else {
      return NaN;
    }
  }
  set alignY(value) {
    this.setAttribute("align-y", `${value * 100}%`);
  }
  get imageSrc() {
    return this.getAttribute("image-src");
  }
  set imageSrc(value) {
    this.setAttribute("image-src", value);
  }

  constructor() {
    super();

    if (!this.hasAttribute("velocity-x")) {
      this.setAttribute("velocity-x", "1");
    }
    if (!this.hasAttribute("velocity-y")) {
      this.setAttribute("velocity-y", "0.8");
    }
    if (!this.hasAttribute("align-x")) {
      this.setAttribute("align-x", "center");
    }
    if (!this.hasAttribute("align-y")) {
      this.setAttribute("align-y", "top");
    }

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.image = this.shadowRoot.getElementById("image");

    this.currentTransform = null;
    this.animationRequestId = null;

    this.image.addEventListener("load", this.updateTransform);
    window.addEventListener("resize", this.updateTransform);

    this.image.src = this.imageSrc;
  }

  connectedCallback() {
    this.viewport = this.closest("parallax-viewport");
    if (this.viewport != null && this.viewport.backend !== "3d") {
      this.viewport.addEventListener("scroll", this.updateTransform);
    }
  }

  disconnectedCallback() {
    if (this.viewport != null && this.viewport.backend !== "3d") {
      this.viewport.removeEventListener("scroll", this.updateTransform);
    }
    this.viewport = null;
    if (this.animationRequestId != null) {
      cancelAnimationFrame(this.animationRequestId);
      this.animationRequestId = null;
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "image-src") {
      this.image.src = this.imageSrc;
    }
    this.updateTransform();
  }

  updateTransform = () => {
    if (this.viewport == null) return;

    if (this.animationRequestId != null) {
      cancelAnimationFrame(this.animationRequestId);
      this.animationRequestId = null;
    }

    const transform = this.computeTransform();

    if (equals(this.currentTransform, transform)) return;

    this.animationRequestId = requestAnimationFrame(() => {
      this.animationRequestId = null;
      this.currentTransform = transform;
      this.renderTransform(transform);
    });
  };

  computeTransform() {
    const imageRect = {
      w: this.image.naturalWidth,
      h: this.image.naturalHeight
    };
    const viewportRect = getRect(this.viewport);
    const elementRect = getRect(this);
    elementRect.x -= viewportRect.x;
    elementRect.y -= viewportRect.y;
    const options = {
      velocity: { x: this.velocityX, y: this.velocityY },
      align: { x: this.alignX, y: this.alignY },
      backend: this.viewport.backend
    };
    return createTransform(imageRect, elementRect, viewportRect, options);
  }

  renderTransform({ x, y, z, s }) {
    this.image.style.transform = `translate3d(${x}px, ${y}px, ${z}px) scale(${s})`;
  }
}

function equals(a, b) {
  if (a == null) return b == null;
  return a.x === b.x && a.y === b.y && a.z === b.z && a.s === b.s;
}

function getRect(element) {
  const rect = element.getBoundingClientRect();
  return {
    x: rect.left,
    y: rect.top,
    w: rect.right - rect.left,
    h: rect.bottom - rect.top
  };
}
