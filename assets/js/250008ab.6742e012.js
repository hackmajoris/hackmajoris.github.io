"use strict";(self.webpackChunkhackmajoris_blog=self.webpackChunkhackmajoris_blog||[]).push([[835],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>m});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=n.createContext({}),l=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},u=function(e){var t=l(e.components);return n.createElement(s.Provider,{value:t},e.children)},p="mdxType",y={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),p=l(r),d=a,m=p["".concat(s,".").concat(d)]||p[d]||y[d]||o;return r?n.createElement(m,i(i({ref:t},u),{},{components:r})):n.createElement(m,i({ref:t},u))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=d;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c[p]="string"==typeof e?e:a,i[1]=c;for(var l=2;l<o;l++)i[l]=r[l];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},1573:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>y,frontMatter:()=>o,metadata:()=>c,toc:()=>l});var n=r(7462),a=(r(7294),r(3905));const o={layout:"post",title:"Amazon RDS Start-Stop Scheduler with CDK and TypeScript",author:"Alexandru Ilies"},i=void 0,c={permalink:"/2023/01/23/rds-start-stop-scheduler",source:"@site/blog/2023-01-23-rds-start-stop-scheduler.md",title:"Amazon RDS Start-Stop Scheduler with CDK and TypeScript",description:"Creating a schedule for your Amazon RDS instances and clusters can help you save money on running costs, and also ensure that your database is only running when it's needed.",date:"2023-01-23T00:00:00.000Z",formattedDate:"January 23, 2023",tags:[],readingTime:4.265,hasTruncateMarker:!0,authors:[{name:"Alexandru Ilies"}],frontMatter:{layout:"post",title:"Amazon RDS Start-Stop Scheduler with CDK and TypeScript",author:"Alexandru Ilies"},prevItem:{title:"Dispari\u021bia b\u0103ncii Silicon Valley",permalink:"/2023/03/11/dispari\u021bia-b\u0103ncii"},nextItem:{title:"Enjoy the process",permalink:"/2022/01/21/enjoy-the-process"}},s={authorsImageUrls:[void 0]},l=[],u={toc:l},p="wrapper";function y(e){let{components:t,...r}=e;return(0,a.kt)(p,(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Creating a schedule for your Amazon RDS instances and clusters can help you save money on running costs, and also ensure that your database is only running when it's needed.\nIt applies mostly on not-prod environments, where you have multiple RDS instances and the cost of running them becomes a problem."))}y.isMDXComponent=!0}}]);