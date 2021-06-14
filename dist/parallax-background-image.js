(()=>{var y=Object.defineProperty;var v=(e,t,i)=>t in e?y(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var m=(e,t,i)=>(v(e,typeof t!="symbol"?t+"":t,i),i);var s=R();function R(){let e=navigator.userAgent;return e.indexOf("Chrome/")!==-1&&e.indexOf("Edge/")===-1}var p=document.createElement("template");p.innerHTML=`
  <style>
    :host {
      display: block;
      overflow-x: hidden;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      ${s?"perspective: 1px;":""}
      ${s?"perspective-origin: 0 0;":""}
    }
    :host([hidden]) {
      display: none;
    }
  </style>
  <slot></slot>
`;var l=class extends HTMLElement{constructor(){super();this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(p.content.cloneNode(!0))}};function u(e,t,i,r){let{alignX:n,velocity:o}=r,w=t.w,x=o*t.h+Math.abs(1-o)*i.h,h=Math.max(x/e.h,w/e.w);e.w*=h,e.h*=h,e.x=n*(t.w-e.w),e.y=t.h/2-e.h/2,e.z=0;let d=i.h/2-t.h/2;if(s){let a=1-1/o;e.x-=t.x*a,e.y+=d*a,e.z=a,e.w/=o,e.h/=o}else e.y+=(t.y-d)*(o-1)}var g=document.createElement("template");g.innerHTML=`
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
`;var c=class extends HTMLElement{constructor(){super();m(this,"updateRect",()=>{if(this.viewport==null)return;let t=f(this.viewport),i=f(this);i.x-=t.x,i.y-=t.y;let r={x:0,y:0,z:0,w:this.image.naturalWidth,h:this.image.naturalHeight},n={velocity:this.velocity,alignX:this.alignX};u(r,i,t,n),(this.bgRect==null||!E(this.bgRect,r))&&(this.dirty=!0),this.bgRect=r});this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(g.content.cloneNode(!0)),this.image=this.shadowRoot.getElementById("image"),this.image.addEventListener("load",this.updateRect),this.image.src=this.imageSrc,this.bgRect={x:0,y:0,z:0,w:0,h:0},this.dirty=!0,window.addEventListener("resize",this.updateRect);let t=()=>{this.render(),window.requestAnimationFrame(t)};window.requestAnimationFrame(t)}static get observedAttributes(){return["image-src"]}get velocity(){var t;return parseFloat((t=this.getAttribute("velocity"))!=null?t:"0.8")}set velocity(t){this.setAttribute("velocity",t.toString())}get alignX(){let t=this.getAttribute("align-x");if(t==="left")return 0;if(t==="center")return .5;if(t==="right")return 1;let i=parseFloat(t);return isFinite(i)?i/100:.5}set alignX(t){this.setAttribute("align-x",`${t*100}%`)}get imageSrc(){return this.getAttribute("image-src")}set imageSrc(t){this.setAttribute("image-src",t)}connectedCallback(){var t;this.viewport=this.closest("parallax-viewport"),s||(t=this.viewport)==null||t.addEventListener("scroll",this.updateRect)}disconnectedCallback(){var t;s||(t=this.viewport)==null||t.removeEventListener("scroll",this.updateRect),this.viewport=null}attributeChangedCallback(t,i,r){t==="image-src"&&(this.image.src=this.imageSrc)}render(){!this.dirty||(this.dirty=!1,this.image.style.transform=`
      translateX(${this.bgRect.x}px)
      translateY(${this.bgRect.y}px)
      translateZ(${this.bgRect.z}px)
      scale(${this.bgRect.w/this.image.naturalWidth}, ${this.bgRect.h/this.image.naturalHeight})
    `)}};function E(e,t){return e.x===t.x&&e.y===t.y&&e.z===t.z&&e.w===t.w&&e.h===t.h}function f(e){let t=e.getBoundingClientRect();return{x:t.left,y:t.top,w:t.right-t.left,h:t.bottom-t.top}}customElements.define("parallax-viewport",l);customElements.define("parallax-element",c);})();
//# sourceMappingURL=parallax-background-image.js.map
