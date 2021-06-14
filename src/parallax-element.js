import { USE_3D } from "./config.js";
import { transform_ } from "./transform.js";

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
    return ["image-src"];
  }

  get velocity() {
    return parseFloat(this.getAttribute("velocity") ?? "0.8");
  }
  set velocity(value) {
    this.setAttribute("velocity", value.toString());
  }
  get alignX() {
    const str = this.getAttribute("align-x");
    if (str === "left") return 0;
    if (str === "center") return 0.5;
    if (str === "right") return 1;
    const num = parseFloat(str);
    if (isFinite(num)) return num / 100;
    return 0.5;
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
    this.image.addEventListener("load", this.updateRect);
    this.image.src = this.imageSrc;
    this.bgRect = { x: 0, y: 0, z: 0, w: 0, h: 0 };
    this.dirty = true;

    window.addEventListener("resize", this.updateRect);

    const renderLoop = () => {
      this.render();
      window.requestAnimationFrame(renderLoop);
    };
    window.requestAnimationFrame(renderLoop);
  }

  connectedCallback() {
    this.viewport = this.closest("parallax-viewport");
    if (!USE_3D) {
      this.viewport?.addEventListener("scroll", this.updateRect);
    }
  }

  disconnectedCallback() {
    if (!USE_3D) {
      this.viewport?.removeEventListener("scroll", this.updateRect);
    }
    this.viewport = null;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "image-src") {
      this.image.src = this.imageSrc;
    }
  }

  updateRect = () => {
    if (this.viewport == null) return;

    const viewportRect = getRect(this.viewport);
    const elementRect = getRect(this);

    elementRect.x -= viewportRect.x;
    elementRect.y -= viewportRect.y;

    const bgRect = {
      x: 0,
      y: 0,
      z: 0,
      w: this.image.naturalWidth,
      h: this.image.naturalHeight
    };
    const options = {
      velocity: this.velocity,
      alignX: this.alignX
    };
    transform_(bgRect, elementRect, viewportRect, options);
    if (this.bgRect == null || !equals(this.bgRect, bgRect)) {
      this.dirty = true;
    }
    this.bgRect = bgRect;
  };

  render() {
    if (!this.dirty) return;
    this.dirty = false;
    this.image.style.transform = `
      translateX(${this.bgRect.x}px)
      translateY(${this.bgRect.y}px)
      translateZ(${this.bgRect.z}px)
      scale(${this.bgRect.w / this.image.naturalWidth}, ${this.bgRect.h /
      this.image.naturalHeight})
    `;
  }
}

function equals(a, b) {
  return (
    a.x === b.x && a.y === b.y && a.z === b.z && a.w === b.w && a.h === b.h
  );
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
