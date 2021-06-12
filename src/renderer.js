import { appendStyleSheet } from "./style-sheet.js";

function setupStyle(style, width, height) {
  style.position = "absolute";
  style.left = "50%";
  style.top = "50%";
  style.width = `${width}px`;
  style.height = `${height}px`;
  style.transformOrigin = "center center 0";
  style.pointerEvents = "none";
}

function renderToStyle(style, bg, imageWidth, imageHeight) {
  style.transform =
    `translateX(${bg.x - imageWidth / 2}px)` +
    `translateY(${bg.y - imageHeight / 2}px)` +
    `translateZ(${bg.z}px)` +
    `scale(${bg.w / imageWidth}, ${bg.h / imageHeight})`;
}

export class ImageElementRenderer {
  constructor(element, image, options) {
    this.element = element;
    this.imageWidth = image.naturalWidth;
    this.imageHeight = image.naturalHeight;

    this.img = document.createElement("img");
    this.style = this.img.style;

    this.disposed = false;

    window.requestAnimationFrame(() => {
      if (this.disposed) return;
      this.img.src = image.src;
      setupStyle(this.style, this.imageWidth, this.imageHeight);
      this.element.prepend(this.img);
    });
  }

  render(bg) {
    if (this.disposed) return;
    renderToStyle(this.style, bg, this.imageWidth, this.imageHeight);
  }

  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    this.element.removeChild(this.img);
  }
}

function createStyle(selector, styleSheet) {
  const rule = `${selector} {}`;
  const index = styleSheet.insertRule(rule, 0);
  return styleSheet.cssRules[index].style;
}

const styleSheet = appendStyleSheet();
let nextId = 0;
export class PseudoElementRenderer {
  constructor(element, image, options) {
    this.element = element;
    this.imageWidth = image.naturalWidth;
    this.imageHeight = image.naturalHeight;

    const id = nextId++;
    this.className = `parallax-background-image-pseudo-${id}`;

    this.style = createStyle(`.${this.className}::before`, styleSheet);

    this.disposed = false;

    window.requestAnimationFrame(() => {
      if (this.disposed) return;
      this.style.content = '""';
      this.style.backgroundImage = `url(${image.src})`;
      this.style.backgroundSize = "100% 100%";
      setupStyle(this.style, this.imageWidth, this.imageHeight);
      this.element.classList.add(this.className);
    });
  }

  render(bg) {
    if (this.disposed) return;
    renderToStyle(this.style, bg, this.imageWidth, this.imageHeight);
  }

  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    this.element.classList.remove(this.className);
  }
}
