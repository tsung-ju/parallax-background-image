(()=>{var R=Object.defineProperty;var E=(e,t,i)=>t in e?R(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var u=(e,t,i)=>(E(e,typeof t!="symbol"?t+"":t,i),i);var n=A();function A(){let e=navigator.userAgent;return e.indexOf("Chrome/")!==-1&&e.indexOf("Edge/")===-1}var g=document.createElement("template");g.innerHTML=`
  <style>
    :host {
      display: block;
      overflow-x: hidden;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      ${n?"perspective: 1px;":""}
      ${n?"perspective-origin: 0 0;":""}
    }
    :host([hidden]) {
      display: none;
    }
  </style>
  <slot></slot>
`;var h=class extends HTMLElement{constructor(){super();this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(g.content.cloneNode(!0))}};function f(e,t,i,s){let{alignX:o,velocity:r,use3d:x}=s,y=t.w,b=r*t.h+Math.abs(1-r)*i.h,a=Math.max(b/e.h,y/e.w),m=o*(t.w-e.w*a),c=t.h/2-e.h*a/2,l=0,p=i.h/2-t.h/2;return x?(l=1-1/r,m-=t.x*l,c+=p*l,a/=r):c+=(t.y-p)*(r-1),{x:m,y:c,z:l,s:a}}var w=document.createElement("template");w.innerHTML=`
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
`;var d=class extends HTMLElement{constructor(){super();u(this,"updateRect",()=>{if(this.viewport==null)return;let t={w:this.image.naturalWidth,h:this.image.naturalHeight},i=v(this.viewport),s=v(this);s.x-=i.x,s.y-=i.y;let o={velocity:this.velocity,alignX:this.alignX,use3d:n},r=f(t,s,i,o);(this.transform==null||!S(this.transform,r))&&(this.needsRender=!0,this.transform=r)});this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(w.content.cloneNode(!0)),this.image=this.shadowRoot.getElementById("image"),this.image.src=this.imageSrc,this.transform=null,this.needsRender=!1,this.image.addEventListener("load",this.updateRect),window.addEventListener("resize",this.updateRect);let t=()=>{this.needsRender&&(this.render(),this.needsRender=!1),window.requestAnimationFrame(t)};window.requestAnimationFrame(t)}static get observedAttributes(){return["image-src"]}get velocity(){var t;return parseFloat((t=this.getAttribute("velocity"))!=null?t:"0.8")}set velocity(t){this.setAttribute("velocity",t.toString())}get alignX(){let t=this.getAttribute("align-x");if(t==="left")return 0;if(t==="center")return .5;if(t==="right")return 1;let i=parseFloat(t);return isFinite(i)?i/100:.5}set alignX(t){this.setAttribute("align-x",`${t*100}%`)}get imageSrc(){return this.getAttribute("image-src")}set imageSrc(t){this.setAttribute("image-src",t)}connectedCallback(){var t;this.viewport=this.closest("parallax-viewport"),n||(t=this.viewport)==null||t.addEventListener("scroll",this.updateRect)}disconnectedCallback(){var t;n||(t=this.viewport)==null||t.removeEventListener("scroll",this.updateRect),this.viewport=null}attributeChangedCallback(t,i,s){t==="image-src"&&(this.image.src=this.imageSrc)}render(){let{x:t,y:i,z:s,s:o}=this.transform;this.image.style.transform=`translate3d(${t}px, ${i}px, ${s}px) scale(${o})`}};function S(e,t){return e.x===t.x&&e.y===t.y&&e.z===t.z&&e.s===t.s}function v(e){let t=e.getBoundingClientRect();return{x:t.left,y:t.top,w:t.right-t.left,h:t.bottom-t.top}}customElements.define("parallax-viewport",h);customElements.define("parallax-element",d);})();
//# sourceMappingURL=parallax-background-image.js.map
