/*! For license information please see 31.ecff60d3.chunk.js.LICENSE.txt */
"use strict";(self.webpackChunkCLient_app=self.webpackChunkCLient_app||[]).push([[31],{3031:function(e,t,i){i.r(t),i.d(t,{default:function(){return g}});var n=i(885),o=i(4925),r=i(2791),s=i(6871),a=i(4940);function c(e,t){void 0===t&&(t={});var i=function(e){if(e&&"j"===e[0]&&":"===e[1])return e.substr(2);return e}(e);if(function(e,t){return"undefined"===typeof t&&(t=!e||"{"!==e[0]&&"["!==e[0]&&'"'!==e[0]),!t}(i,t.doNotParse))try{return JSON.parse(i)}catch(n){}return e}var u=function(){return u=Object.assign||function(e){for(var t,i=1,n=arguments.length;i<n;i++)for(var o in t=arguments[i])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},u.apply(this,arguments)},f=function(){function e(e,t){var i=this;this.changeListeners=[],this.HAS_DOCUMENT_COOKIE=!1,this.cookies=function(e,t){return"string"===typeof e?a.Q(e,t):"object"===typeof e&&null!==e?e:{}}(e,t),new Promise((function(){i.HAS_DOCUMENT_COOKIE="object"===typeof document&&"string"===typeof document.cookie})).catch((function(){}))}return e.prototype._updateBrowserValues=function(e){this.HAS_DOCUMENT_COOKIE&&(this.cookies=a.Q(document.cookie,e))},e.prototype._emitChange=function(e){for(var t=0;t<this.changeListeners.length;++t)this.changeListeners[t](e)},e.prototype.get=function(e,t,i){return void 0===t&&(t={}),this._updateBrowserValues(i),c(this.cookies[e],t)},e.prototype.getAll=function(e,t){void 0===e&&(e={}),this._updateBrowserValues(t);var i={};for(var n in this.cookies)i[n]=c(this.cookies[n],e);return i},e.prototype.set=function(e,t,i){var n;"object"===typeof t&&(t=JSON.stringify(t)),this.cookies=u(u({},this.cookies),((n={})[e]=t,n)),this.HAS_DOCUMENT_COOKIE&&(document.cookie=a.q(e,t,i)),this._emitChange({name:e,value:t,options:i})},e.prototype.remove=function(e,t){var i=t=u(u({},t),{expires:new Date(1970,1,1,0,0,1),maxAge:0});this.cookies=u({},this.cookies),delete this.cookies[e],this.HAS_DOCUMENT_COOKIE&&(document.cookie=a.q(e,"",i)),this._emitChange({name:e,value:void 0,options:t})},e.prototype.addChangeListener=function(e){this.changeListeners.push(e)},e.prototype.removeChangeListener=function(e){var t=this.changeListeners.indexOf(e);t>=0&&this.changeListeners.splice(t,1)},e}(),p=f,h=i(4569),d=i.n(h),l=i(7152),v=i(184),m=["children"];new p;function g(e){e.children,(0,o.Z)(e,m);var t,i=(0,r.useState)(!1),a=(0,n.Z)(i,2),c=a[0],u=a[1],f=(0,r.useState)(!1),p=(0,n.Z)(f,2),h=p[0],g=p[1];return(0,r.useEffect)((function(){d()((0,l.authConfiguration)()).then((function(e){u(!0),g(!0)})).catch((function(e){u(!0),g(!1)}))}),[]),c&&(t=h?(0,v.jsx)(s.j3,{}):(0,v.jsx)(s.Fg,{to:"/login"})),(0,v.jsx)("div",{children:t})}},4940:function(e,t){t.Q=function(e,t){if("string"!==typeof e)throw new TypeError("argument str must be a string");for(var n={},o=t||{},s=e.split(";"),a=o.decode||i,c=0;c<s.length;c++){var u=s[c],f=u.indexOf("=");if(!(f<0)){var p=u.substring(0,f).trim();if(void 0==n[p]){var h=u.substring(f+1,u.length).trim();'"'===h[0]&&(h=h.slice(1,-1)),n[p]=r(h,a)}}}return n},t.q=function(e,t,i){var r=i||{},s=r.encode||n;if("function"!==typeof s)throw new TypeError("option encode is invalid");if(!o.test(e))throw new TypeError("argument name is invalid");var a=s(t);if(a&&!o.test(a))throw new TypeError("argument val is invalid");var c=e+"="+a;if(null!=r.maxAge){var u=r.maxAge-0;if(isNaN(u)||!isFinite(u))throw new TypeError("option maxAge is invalid");c+="; Max-Age="+Math.floor(u)}if(r.domain){if(!o.test(r.domain))throw new TypeError("option domain is invalid");c+="; Domain="+r.domain}if(r.path){if(!o.test(r.path))throw new TypeError("option path is invalid");c+="; Path="+r.path}if(r.expires){if("function"!==typeof r.expires.toUTCString)throw new TypeError("option expires is invalid");c+="; Expires="+r.expires.toUTCString()}r.httpOnly&&(c+="; HttpOnly");r.secure&&(c+="; Secure");if(r.sameSite){switch("string"===typeof r.sameSite?r.sameSite.toLowerCase():r.sameSite){case!0:c+="; SameSite=Strict";break;case"lax":c+="; SameSite=Lax";break;case"strict":c+="; SameSite=Strict";break;case"none":c+="; SameSite=None";break;default:throw new TypeError("option sameSite is invalid")}}return c};var i=decodeURIComponent,n=encodeURIComponent,o=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;function r(e,t){try{return t(e)}catch(i){return e}}}}]);
//# sourceMappingURL=31.ecff60d3.chunk.js.map