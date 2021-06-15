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
    return ["velocity", "align-x", "image-src"];
  }

  get velocity() {
    return parseFloat(this.getAttribute("velocity") ?? "0.8");
  }
  set velocity(value) {
    this.setAttribute("velocity", value.toString());
  }
  get alignX() {
    switch (this.getAttribute("align-x") ?? "center") {
      case "left":
        return 0;
      case "center":
        return 0.5;
      case "right":
        return 1;
      default: {
        const num = parseFloat(str);
        if (isFinite(num)) return num / 100;
        return 0.5;
      }
    }
  }
  set alignX(value) {
    this.setAttribute("align-x", `${value * 100}%`);
  }
  get imageSrc() {
    return this.getAttribute("image-src");
  }
  set imageSrc(value) {
    this.setAttribute("image-src", value);
  }

  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.image = this.shadowRoot.getElementById("image");
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

    const transform = this.computeTransform();

    if (this.transform != null && equals(this.transform, transform)) {
      return;
    }

    if (this.animationRequestId == null) {
      cancelAnimationFrame(this.animationRequestId);
      this.animationRequestId = null;
    }

    this.animationRequestId = requestAnimationFrame(() => {
      this.animationRequestId = null;
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
      velocity: this.velocity,
      alignX: this.alignX,
      backend: this.viewport.backend
    };
    return createTransform(imageRect, elementRect, viewportRect, options);
  }

  renderTransform({ x, y, z, s }) {
    this.image.style.transform = `translate3d(${x}px, ${y}px, ${z}px) scale(${s})`;
  }
}

function equals(a, b) {
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
