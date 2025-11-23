import{r as d}from"./index.RH_Wq4ov.js";var i={exports:{}},e={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var a;function p(){if(a)return e;a=1;var u=Symbol.for("react.transitional.element"),n=Symbol.for("react.fragment");function x(R,t,r){var s=null;if(r!==void 0&&(s=""+r),t.key!==void 0&&(s=""+t.key),"key"in t){r={};for(var o in t)o!=="key"&&(r[o]=t[o])}else r=t;return t=r.ref,{$$typeof:u,type:R,key:s,ref:t!==void 0?t:null,props:r}}return e.Fragment=n,e.jsx=x,e.jsxs=x,e}var l;function v(){return l||(l=1,i.exports=p()),i.exports}var c=v();function f(){const[u,n]=d.useState(0);return c.jsxs("button",{className:"px-4 py-2 bg-blue-600 text-white rounded",onClick:()=>n(u+1),children:["Count: ",u]})}export{f as default};
