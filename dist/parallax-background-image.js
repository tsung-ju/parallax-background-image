(()=>{var y=Object.defineProperty;var k=(e,t,i)=>t in e?y(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var u=(e,t,i)=>(k(e,typeof t!="symbol"?t+"":t,i),i);var p=document.createElement("template");p.innerHTML=`
  <style>
    :host {
      display: block;
      overflow-x: hidden;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
    }
    :host([hidden]) {
      display: none;
    }
    :host([backend="3d"]) {
      perspective: 1px;
      perspective-origin: 0 0;
    }
    :host
  </style>
  <slot></slot>
`;var c=class extends HTMLElement{get backend(){return this.getAttribute("backend")}set backend(t){this.setAttribute("backend",t)}constructor(){super();this.hasAttribute("backend")||this.setAttribute("backend",R()?"3d":"2d"),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(p.content.cloneNode(!0))}};function R(){let e=navigator.userAgent;return e.indexOf("Chrome/")!==-1&&e.indexOf("Edge/")===-1}function g(e,t,i,n){let{alignX:s,velocity:r,backend:w}=n,b=t.w,x=r*t.h+Math.abs(1-r)*i.h,o=Math.max(x/e.h,b/e.w),d=s*(t.w-e.w*o),l=t.h/2-e.h*o/2,a=0,m=i.h/2-t.h/2;return w==="3d"?(a=1-1/r,d-=t.x*a,l+=m*a,o/=r):l+=(t.y-m)*(r-1),{x:d,y:l,z:a,s:o}}var f=document.createElement("template");f.innerHTML=`
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
`;var h=class extends HTMLElement{constructor(){super();u(this,"updateTransform",()=>{if(this.viewport==null)return;let t=this.computeTransform();this.transform!=null&&A(this.transform,t)||(this.animationRequestId==null&&(cancelAnimationFrame(this.animationRequestId),this.animationRequestId=null),this.animationRequestId=requestAnimationFrame(()=>{this.animationRequestId=null,this.renderTransform(t)}))});this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(f.content.cloneNode(!0)),this.image=this.shadowRoot.getElementById("image"),this.animationRequestId=null,this.image.addEventListener("load",this.updateTransform),window.addEventListener("resize",this.updateTransform),this.image.src=this.imageSrc}static get observedAttributes(){return["image-src"]}get velocity(){var t;return parseFloat((t=this.getAttribute("velocity"))!=null?t:"0.8")}set velocity(t){this.setAttribute("velocity",t.toString())}get alignX(){var t;switch((t=this.getAttribute("align-x"))!=null?t:"center"){case"left":return 0;case"center":return .5;case"right":return 1;default:{let i=parseFloat(str);return isFinite(i)?i/100:.5}}}set alignX(t){this.setAttribute("align-x",`${t*100}%`)}get imageSrc(){return this.getAttribute("image-src")}set imageSrc(t){this.setAttribute("image-src",t)}connectedCallback(){this.viewport=this.closest("parallax-viewport"),this.viewport!=null&&this.viewport.backend!=="3d"&&this.viewport.addEventListener("scroll",this.updateTransform)}disconnectedCallback(){this.viewport!=null&&this.viewport.backend!=="3d"&&this.viewport.removeEventListener("scroll",this.updateTransform),this.viewport=null,this.animationRequestId!=null&&(cancelAnimationFrame(this.animationRequestId),this.animationRequestId=null)}attributeChangedCallback(t,i,n){t==="image-src"&&(this.image.src=this.imageSrc)}computeTransform(){let t={w:this.image.naturalWidth,h:this.image.naturalHeight},i=v(this.viewport),n=v(this);n.x-=i.x,n.y-=i.y;let s={velocity:this.velocity,alignX:this.alignX,backend:this.viewport.backend};return g(t,n,i,s)}renderTransform({x:t,y:i,z:n,s}){this.image.style.transform=`translate3d(${t}px, ${i}px, ${n}px) scale(${s})`}};function A(e,t){return e.x===t.x&&e.y===t.y&&e.z===t.z&&e.s===t.s}function v(e){let t=e.getBoundingClientRect();return{x:t.left,y:t.top,w:t.right-t.left,h:t.bottom-t.top}}customElements.define("parallax-viewport",c);customElements.define("parallax-element",h);})();
//# sourceMappingURL=parallax-background-image.js.map
