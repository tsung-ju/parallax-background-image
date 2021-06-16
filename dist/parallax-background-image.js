(()=>{var k=Object.defineProperty;var R=(e,t,i)=>t in e?k(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var g=(e,t,i)=>(R(e,typeof t!="symbol"?t+"":t,i),i);var f=document.createElement("template");f.innerHTML=`
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
`;var d=class extends HTMLElement{get backend(){return this.getAttribute("backend")}set backend(t){this.setAttribute("backend",t)}constructor(){super();this.hasAttribute("backend")||this.setAttribute("backend",T()?"3d":"2d"),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(f.content.cloneNode(!0))}};function T(){let e=navigator.userAgent;return e.indexOf("Chrome/")!==-1&&e.indexOf("Edge/")===-1}function y(e,t,i,n){let{align:r,velocity:s,backend:x}=n,l=s.x*t.w+Math.abs(1-s.x)*i.w,c=s.y*t.h+Math.abs(1-s.y)*i.h,o=Math.max(l/e.w,c/e.h),h=r.x*(l-e.w*o)+.5*(t.w-l),u=r.y*(c-e.h*o)+.5*(t.h-c),p=0,w=.5*(i.w-t.w),A=.5*(i.h-t.h),a=x==="3d"?s.y:1;return h=(h-w*(s.x-1))/a+t.x*(s.x/a-1),u=(u-A*(s.y-1))/a+t.y*(s.y/a-1),p=1-1/a,o=o/a,{x:h,y:u,z:p,s:o}}var b=document.createElement("template");b.innerHTML=`
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
`;var m=class extends HTMLElement{constructor(){super();g(this,"updateTransform",()=>{if(this.viewport==null)return;let t=this.computeTransform();this.transform!=null&&E(this.transform,t)||(this.animationRequestId==null&&(cancelAnimationFrame(this.animationRequestId),this.animationRequestId=null),this.animationRequestId=requestAnimationFrame(()=>{this.animationRequestId=null,this.renderTransform(t)}))});this.hasAttribute("velocity-x")||this.setAttribute("velocity-x","1"),this.hasAttribute("velocity-y")||this.setAttribute("velocity-y","0.8"),this.hasAttribute("align-x")||this.setAttribute("align-x","center"),this.hasAttribute("align-y")||this.setAttribute("align-y","top"),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(b.content.cloneNode(!0)),this.image=this.shadowRoot.getElementById("image"),this.animationRequestId=null,this.image.addEventListener("load",this.updateTransform),window.addEventListener("resize",this.updateTransform),this.image.src=this.imageSrc}static get observedAttributes(){return["velocity-x","velocity-y","align-x","align-y","image-src"]}get velocityX(){return parseFloat(this.getAttribute("velocity-x"))}set velocityX(t){this.setAttribute("velocity-x",t.toString())}get velocityY(){return parseFloat(this.getAttribute("velocity-y"))}set velocityY(t){this.setAttribute("velocity-y",t.toString())}get alignX(){let t=this.getAttribute("align-x");return t==="left"?0:t==="center"?.5:t==="right"?1:(t==null?void 0:t.endsWith("%"))?parseFloat(t):NaN}set alignX(t){this.setAttribute("align-x",`${t*100}%`)}get alignY(){let t=this.getAttribute("align-y");return t==="top"?0:t==="center"?.5:t==="bottom"?1:(t==null?void 0:t.endsWith("%"))?parseFloat(t):NaN}set alignY(t){this.setAttribute("align-y",`${t*100}%`)}get imageSrc(){return this.getAttribute("image-src")}set imageSrc(t){this.setAttribute("image-src",t)}connectedCallback(){this.viewport=this.closest("parallax-viewport"),this.viewport!=null&&this.viewport.backend!=="3d"&&this.viewport.addEventListener("scroll",this.updateTransform)}disconnectedCallback(){this.viewport!=null&&this.viewport.backend!=="3d"&&this.viewport.removeEventListener("scroll",this.updateTransform),this.viewport=null,this.animationRequestId!=null&&(cancelAnimationFrame(this.animationRequestId),this.animationRequestId=null)}attributeChangedCallback(t,i,n){t==="image-src"&&(this.image.src=this.imageSrc),this.updateTransform()}computeTransform(){let t={w:this.image.naturalWidth,h:this.image.naturalHeight},i=v(this.viewport),n=v(this);n.x-=i.x,n.y-=i.y;let r={velocity:{x:this.velocityX,y:this.velocityY},align:{x:this.alignX,y:this.alignY},backend:this.viewport.backend};return y(t,n,i,r)}renderTransform({x:t,y:i,z:n,s:r}){this.image.style.transform=`translate3d(${t}px, ${i}px, ${n}px) scale(${r})`}};function E(e,t){return e.x===t.x&&e.y===t.y&&e.z===t.z&&e.s===t.s}function v(e){let t=e.getBoundingClientRect();return{x:t.left,y:t.top,w:t.right-t.left,h:t.bottom-t.top}}customElements.define("parallax-viewport",d);customElements.define("parallax-element",m);})();
//# sourceMappingURL=parallax-background-image.js.map
