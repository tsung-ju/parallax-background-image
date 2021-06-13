(()=>{var w=Object.defineProperty;var x=(e,t,i)=>t in e?w(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var l=(e,t,i)=>(x(e,typeof t!="symbol"?t+"":t,i),i);var r=v();function v(){let e=navigator.userAgent;return e.indexOf("Chrome/")!==-1&&e.indexOf("Edge/")===-1}var c=document.createElement("template");c.innerHTML=`
  <style>
    :host {
      display: block;
      overflow-x: hidden;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      ${r?"perspective: 1px;":""}
      ${r?"perspective-origin: center center;":""}
    }
    :host([hidden]) {
      display: none;
    }
  </style>
  <slot></slot>
`;var s=class extends HTMLElement{constructor(){super();this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(c.content.cloneNode(!0))}};function h(e,t,i,n){y(e,t,i,n),R(e,t,i,n),r?E(e,t,i,n):b(e,t,i,n)}function d(e,t){e.x*=t,e.y*=t,e.z*=t,e.w*=t,e.h*=t}function y(e,t,i,n){let o=t.w,p=i.h+n.velocity*(i.h-t.h),g=o/e.w,f=p/e.h;d(e,Math.max(g,f))}function R(e,t,i,n){e.x=(.5-n.alignX)*(e.w-t.w)}function E(e,t,i,n){let o=n.velocity;d(e,1/o),e.z+=1-1/o,e.x-=t.x*(1-1/o)}function b(e,t,i,n){e.y+=t.y*(n.velocity-1)}var m=document.createElement("template");m.innerHTML=`
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
      left: 50%;
      top: 50%;
      transform-origin: center center 0;
      will-change: transform;
      pointer-events: none;
    }
    ::slotted(*) {
      position: relative;
    }
  </style>
  <img id="image">
  <slot></slot>
`;var a=class extends HTMLElement{constructor(){super();l(this,"updateRect",()=>{if(this.viewport==null)return;let t=u(this.viewport),i=u(this);i.x-=t.x,i.y-=t.y;let n={x:0,y:0,z:0,w:this.image.naturalWidth,h:this.image.naturalHeight},o={velocity:this.velocity,alignX:this.alignX};h(n,i,t,o),(this.bgRect==null||!S(this.bgRect,n))&&(this.dirty=!0),this.bgRect=n});this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(m.content.cloneNode(!0)),this.image=this.shadowRoot.getElementById("image"),this.image.addEventListener("load",this.updateRect),this.image.src=this.imageSrc,this.bgRect={x:0,y:0,z:0,w:0,h:0},this.dirty=!0,window.addEventListener("resize",this.updateRect);let t=()=>{this.render(),window.requestAnimationFrame(t)};window.requestAnimationFrame(t)}static get observedAttributes(){return["image-src"]}get velocity(){var t;return parseFloat((t=this.getAttribute("velocity"))!=null?t:"0.8")}set velocity(t){this.setAttribute("velocity",t.toString())}get alignX(){let t=this.getAttribute("align-x");if(t==="left")return 0;if(t==="center")return .5;if(t==="right")return 1;let i=parseFloat(t);return isFinite(i)?i/100:.5}set alignX(t){this.setAttribute("align-x",`${t*100}%`)}get imageSrc(){return this.getAttribute("image-src")}set imageSrc(t){this.setAttribute("image-src",t)}connectedCallback(){var t;this.viewport=this.closest("parallax-viewport"),r||(t=this.viewport)==null||t.addEventListener("scroll",this.updateRect)}disconnectedCallback(){var t;r||(t=this.viewport)==null||t.removeEventListener("scroll",this.updateRect),this.viewport=null}attributeChangedCallback(t,i,n){t==="image-src"&&(this.image.src=this.imageSrc)}render(){!this.dirty||(this.dirty=!1,this.image.style.transform=`
      translateX(${this.bgRect.x-this.image.naturalWidth/2}px)
      translateY(${this.bgRect.y-this.image.naturalHeight/2}px)
      translateZ(${this.bgRect.z}px)
      scale(${this.bgRect.w/this.image.naturalWidth}, ${this.bgRect.h/this.image.naturalHeight})
    `)}};function S(e,t){return e.x===t.x&&e.y===t.y&&e.z===t.z&&e.w===t.w&&e.h===t.h}function u(e){let t=e.getBoundingClientRect();return{x:(t.left+t.right)/2,y:(t.top+t.bottom)/2,w:t.right-t.left,h:t.bottom-t.top}}customElements.define("parallax-viewport",s);customElements.define("parallax-element",a);})();
//# sourceMappingURL=parallax-background-image.js.map
