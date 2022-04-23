(()=>{var k=Object.defineProperty;var T=(e,t,i)=>t in e?k(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var g=(e,t,i)=>(T(e,typeof t!="symbol"?t+"":t,i),i);var f=document.createElement("template");f.innerHTML=`
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
`;var d=class extends HTMLElement{get backend(){return this.getAttribute("backend")}set backend(t){this.setAttribute("backend",t)}constructor(){super();this.hasAttribute("backend")||this.setAttribute("backend",R()?"3d":"2d"),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(f.content.cloneNode(!0))}};function R(){let e=navigator.userAgent;return e.indexOf("Chrome/")!==-1&&e.indexOf("Edge/")===-1}function y(e,t,i,r){let{align:a,velocity:n,backend:x}=r,l=n.x*t.w+Math.abs(1-n.x)*i.w,c=n.y*t.h+Math.abs(1-n.y)*i.h,o=Math.max(l/e.w,c/e.h),h=a.x*(l-e.w*o)+.5*(t.w-l),u=a.y*(c-e.h*o)+.5*(t.h-c),p=0,w=.5*(i.w-t.w),A=.5*(i.h-t.h),s=x==="3d"?n.y:1;return s<=0&&(s=1),h=(h+(1-n.x)*w+(n.x-s)*t.x)/s,u=(u+(1-n.y)*A+(n.y-s)*t.y)/s,p=(s-1)/s,o=o/s,{x:h,y:u,z:p,s:o}}var b=document.createElement("template");b.innerHTML=`
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
`;var m=class extends HTMLElement{constructor(){super();g(this,"updateTransform",()=>{if(this.viewport==null)return;this.animationRequestId!=null&&(cancelAnimationFrame(this.animationRequestId),this.animationRequestId=null);let t=this.computeTransform();E(this.currentTransform,t)||(this.animationRequestId=requestAnimationFrame(()=>{this.animationRequestId=null,this.currentTransform=t,this.renderTransform(t)}))});this.hasAttribute("velocity-x")||this.setAttribute("velocity-x","1"),this.hasAttribute("velocity-y")||this.setAttribute("velocity-y","0.8"),this.hasAttribute("align-x")||this.setAttribute("align-x","center"),this.hasAttribute("align-y")||this.setAttribute("align-y","top"),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(b.content.cloneNode(!0)),this.image=this.shadowRoot.getElementById("image"),this.currentTransform=null,this.animationRequestId=null,this.image.addEventListener("load",this.updateTransform),window.addEventListener("resize",this.updateTransform),this.image.src=this.imageSrc}static get observedAttributes(){return["velocity-x","velocity-y","align-x","align-y","image-src"]}get velocityX(){return parseFloat(this.getAttribute("velocity-x"))}set velocityX(t){this.setAttribute("velocity-x",t.toString())}get velocityY(){return parseFloat(this.getAttribute("velocity-y"))}set velocityY(t){this.setAttribute("velocity-y",t.toString())}get alignX(){let t=this.getAttribute("align-x");return t==="left"?0:t==="center"?.5:t==="right"?1:(t==null?void 0:t.endsWith("%"))?parseFloat(t):NaN}set alignX(t){this.setAttribute("align-x",`${t*100}%`)}get alignY(){let t=this.getAttribute("align-y");return t==="top"?0:t==="center"?.5:t==="bottom"?1:(t==null?void 0:t.endsWith("%"))?parseFloat(t):NaN}set alignY(t){this.setAttribute("align-y",`${t*100}%`)}get imageSrc(){return this.getAttribute("image-src")}set imageSrc(t){this.setAttribute("image-src",t)}connectedCallback(){this.viewport=this.closest("parallax-viewport"),this.viewport!=null&&this.viewport.backend!=="3d"&&this.viewport.addEventListener("scroll",this.updateTransform)}disconnectedCallback(){this.viewport!=null&&this.viewport.backend!=="3d"&&this.viewport.removeEventListener("scroll",this.updateTransform),this.viewport=null,this.animationRequestId!=null&&(cancelAnimationFrame(this.animationRequestId),this.animationRequestId=null)}attributeChangedCallback(t,i,r){t==="image-src"&&(this.image.src=this.imageSrc),this.updateTransform()}computeTransform(){let t={w:this.image.naturalWidth,h:this.image.naturalHeight},i=v(this.viewport),r=v(this);r.x-=i.x,r.y-=i.y;let a={velocity:{x:this.velocityX,y:this.velocityY},align:{x:this.alignX,y:this.alignY},backend:this.viewport.backend};return y(t,r,i,a)}renderTransform({x:t,y:i,z:r,s:a}){this.image.style.transform=`translate3d(${t}px, ${i}px, ${r}px) scale(${a})`}};function E(e,t){return e==null?t==null:e.x===t.x&&e.y===t.y&&e.z===t.z&&e.s===t.s}function v(e){let t=e.getBoundingClientRect();return{x:t.left,y:t.top,w:t.right-t.left,h:t.bottom-t.top}}customElements.define("parallax-viewport",d);customElements.define("parallax-element",m);})();
//# sourceMappingURL=parallax-background-image.js.map
