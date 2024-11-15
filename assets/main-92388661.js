class W{constructor(e){this.properties=e??[]}get(e){const o=this.properties.filter(n=>n.name===e).map(n=>n.value);if(o.length>1)throw new Error('Expected only one property to be named "'+e+'"');if(o.length!==0)return o[0]}getString(e){return this.getByType(e,"string")}getNumber(e){return this.getByType(e,"number")}getBoolean(e){return this.getByType(e,"boolean")}getByType(e,o){const n=this.get(e);if(n!==void 0){if(o!=="json"&&typeof n!==o)throw new Error('Expected property "'+e+'" to have type "'+o+'"');return n}}mustGetString(e){return this.mustGetByType(e,"string")}mustGetNumber(e){return this.mustGetByType(e,"number")}mustGetBoolean(e){return this.mustGetByType(e,"boolean")}mustGetByType(e,o){const n=this.get(e);if(n===void 0)throw new Error('Property "'+e+'" is missing');if(o!=="json"&&typeof n!==o)throw new Error('Expected property "'+e+'" to have type "'+o+'"');return n}getType(e){const o=this.properties.filter(n=>n.name===e).map(n=>n.type);if(o.length>1)throw new Error('Expected only one property to be named "'+e+'"');if(o.length!==0)return o[0]}}const J="https://unpkg.com/@workadventure/scripting-api-extra@1.9.1/dist";class re{constructor(e){this.name=e.name,this.x=e.x,this.y=e.y,this.properties=new W(e.properties)}get isReadable(){const e=this.properties.getString("readableBy");return e?WA.player.tags.includes(e):!0}get isWritable(){const e=this.properties.getString("writableBy");return e?WA.player.tags.includes(e):!0}}function N(t){const e=t?"#"+t.join():"";WA.nav.openCoWebSite(J+"/configuration.html"+e,!0)}async function ae(t,e){const o=await WA.room.getTiledMap(),n=new Map;return X(o.layers,n,t,e),n}function X(t,e,o,n){for(const r of t)if(r.type==="objectgroup"){for(const a of r.objects)if(a.type==="variable"||a.class==="variable"){if(o&&r.name!==o||n&&!n.includes(a.name))continue;e.set(a.name,new re(a))}}else r.type==="group"&&X(r.layers,e,o,n)}let B;async function T(){return B===void 0&&(B=se()),B}async function se(){return ie(await WA.room.getTiledMap())}function ie(t){const e=new Map;return Y(t.layers,"",e),e}function Y(t,e,o){for(const n of t)n.type==="group"?Y(n.layers,e+n.name+"/",o):(n.name=e+n.name,o.set(n.name,n))}async function F(){const t=await T(),e=[];for(const o of t.values())if(o.type==="objectgroup")for(const n of o.objects)(n.type==="area"||n.class==="area")&&e.push(n);return e}function le(t){let e=1/0,o=1/0,n=0,r=0;const a=t.data;if(typeof a=="string")throw new Error("Unsupported tile layer data stored as string instead of CSV");for(let s=0;s<t.height;s++)for(let i=0;i<t.width;i++)a[i+s*t.width]!==0&&(e=Math.min(e,i),r=Math.max(r,i),o=Math.min(o,s),n=Math.max(n,s));return{top:o,left:e,right:r+1,bottom:n+1}}function Q(t){let e=1/0,o=1/0,n=0,r=0;for(const a of t){const s=le(a);s.left<e&&(e=s.left),s.top<o&&(o=s.top),s.right>r&&(r=s.right),s.bottom>n&&(n=s.bottom)}return{top:o,left:e,right:r,bottom:n}}/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */var ce=Object.prototype.toString,L=Array.isArray||function(e){return ce.call(e)==="[object Array]"};function U(t){return typeof t=="function"}function ue(t){return L(t)?"array":typeof t}function x(t){return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function I(t,e){return t!=null&&typeof t=="object"&&e in t}function pe(t,e){return t!=null&&typeof t!="object"&&t.hasOwnProperty&&t.hasOwnProperty(e)}var fe=RegExp.prototype.test;function de(t,e){return fe.call(t,e)}var he=/\S/;function ge(t){return!de(he,t)}var ye={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"};function me(t){return String(t).replace(/[&<>"'`=\/]/g,function(o){return ye[o]})}var be=/\s*/,we=/\s+/,H=/\s*=/,ve=/\s*\}/,Ae=/#|\^|\/|>|\{|&|=|!/;function We(t,e){if(!t)return[];var o=!1,n=[],r=[],a=[],s=!1,i=!1,l="",u=0;function d(){if(s&&!i)for(;a.length;)delete r[a.pop()];else a=[];s=!1,i=!1}var y,b,M;function k(v){if(typeof v=="string"&&(v=v.split(we,2)),!L(v)||v.length!==2)throw new Error("Invalid tags: "+v);y=new RegExp(x(v[0])+"\\s*"),b=new RegExp("\\s*"+x(v[1])),M=new RegExp("\\s*"+x("}"+v[1]))}k(e||g.tags);for(var f=new D(t),w,c,m,C,R,A;!f.eos();){if(w=f.pos,m=f.scanUntil(y),m)for(var V=0,ne=m.length;V<ne;++V)C=m.charAt(V),ge(C)?(a.push(r.length),l+=C):(i=!0,o=!0,l+=" "),r.push(["text",C,w,w+1]),w+=1,C===`
`&&(d(),l="",u=0,o=!1);if(!f.scan(y))break;if(s=!0,c=f.scan(Ae)||"name",f.scan(be),c==="="?(m=f.scanUntil(H),f.scan(H),f.scanUntil(b)):c==="{"?(m=f.scanUntil(M),f.scan(ve),f.scanUntil(b),c="&"):m=f.scanUntil(b),!f.scan(b))throw new Error("Unclosed tag at "+f.pos);if(c==">"?R=[c,m,w,f.pos,l,u,o]:R=[c,m,w,f.pos],u++,r.push(R),c==="#"||c==="^")n.push(R);else if(c==="/"){if(A=n.pop(),!A)throw new Error('Unopened section "'+m+'" at '+w);if(A[1]!==m)throw new Error('Unclosed section "'+A[1]+'" at '+w)}else c==="name"||c==="{"||c==="&"?i=!0:c==="="&&k(m)}if(d(),A=n.pop(),A)throw new Error('Unclosed section "'+A[1]+'" at '+f.pos);return Le(Se(r))}function Se(t){for(var e=[],o,n,r=0,a=t.length;r<a;++r)o=t[r],o&&(o[0]==="text"&&n&&n[0]==="text"?(n[1]+=o[1],n[3]=o[3]):(e.push(o),n=o));return e}function Le(t){for(var e=[],o=e,n=[],r,a,s=0,i=t.length;s<i;++s)switch(r=t[s],r[0]){case"#":case"^":o.push(r),n.push(r),o=r[4]=[];break;case"/":a=n.pop(),a[5]=r[2],o=n.length>0?n[n.length-1][4]:e;break;default:o.push(r)}return e}function D(t){this.string=t,this.tail=t,this.pos=0}D.prototype.eos=function(){return this.tail===""};D.prototype.scan=function(e){var o=this.tail.match(e);if(!o||o.index!==0)return"";var n=o[0];return this.tail=this.tail.substring(n.length),this.pos+=n.length,n};D.prototype.scanUntil=function(e){var o=this.tail.search(e),n;switch(o){case-1:n=this.tail,this.tail="";break;case 0:n="";break;default:n=this.tail.substring(0,o),this.tail=this.tail.substring(o)}return this.pos+=n.length,n};function S(t,e){this.view=t,this.cache={".":this.view},this.parent=e}S.prototype.push=function(e){return new S(e,this)};S.prototype.lookup=function(e){var o=this.cache,n;if(o.hasOwnProperty(e))n=o[e];else{for(var r=this,a,s,i,l=!1;r;){if(e.indexOf(".")>0)for(a=r.view,s=e.split("."),i=0;a!=null&&i<s.length;)i===s.length-1&&(l=I(a,s[i])||pe(a,s[i])),a=a[s[i++]];else a=r.view[e],l=I(r.view,e);if(l){n=a;break}r=r.parent}o[e]=n}return U(n)&&(n=n.call(this.view)),n};function h(){this.templateCache={_cache:{},set:function(e,o){this._cache[e]=o},get:function(e){return this._cache[e]},clear:function(){this._cache={}}}}h.prototype.clearCache=function(){typeof this.templateCache<"u"&&this.templateCache.clear()};h.prototype.parse=function(e,o){var n=this.templateCache,r=e+":"+(o||g.tags).join(":"),a=typeof n<"u",s=a?n.get(r):void 0;return s==null&&(s=We(e,o),a&&n.set(r,s)),s};h.prototype.render=function(e,o,n,r){var a=this.getConfigTags(r),s=this.parse(e,a),i=o instanceof S?o:new S(o,void 0);return this.renderTokens(s,i,n,e,r)};h.prototype.renderTokens=function(e,o,n,r,a){for(var s="",i,l,u,d=0,y=e.length;d<y;++d)u=void 0,i=e[d],l=i[0],l==="#"?u=this.renderSection(i,o,n,r,a):l==="^"?u=this.renderInverted(i,o,n,r,a):l===">"?u=this.renderPartial(i,o,n,a):l==="&"?u=this.unescapedValue(i,o):l==="name"?u=this.escapedValue(i,o,a):l==="text"&&(u=this.rawValue(i)),u!==void 0&&(s+=u);return s};h.prototype.renderSection=function(e,o,n,r,a){var s=this,i="",l=o.lookup(e[1]);function u(b){return s.render(b,o,n,a)}if(l){if(L(l))for(var d=0,y=l.length;d<y;++d)i+=this.renderTokens(e[4],o.push(l[d]),n,r,a);else if(typeof l=="object"||typeof l=="string"||typeof l=="number")i+=this.renderTokens(e[4],o.push(l),n,r,a);else if(U(l)){if(typeof r!="string")throw new Error("Cannot use higher-order sections without the original template");l=l.call(o.view,r.slice(e[3],e[5]),u),l!=null&&(i+=l)}else i+=this.renderTokens(e[4],o,n,r,a);return i}};h.prototype.renderInverted=function(e,o,n,r,a){var s=o.lookup(e[1]);if(!s||L(s)&&s.length===0)return this.renderTokens(e[4],o,n,r,a)};h.prototype.indentPartial=function(e,o,n){for(var r=o.replace(/[^ \t]/g,""),a=e.split(`
`),s=0;s<a.length;s++)a[s].length&&(s>0||!n)&&(a[s]=r+a[s]);return a.join(`
`)};h.prototype.renderPartial=function(e,o,n,r){if(n){var a=this.getConfigTags(r),s=U(n)?n(e[1]):n[e[1]];if(s!=null){var i=e[6],l=e[5],u=e[4],d=s;l==0&&u&&(d=this.indentPartial(s,u,i));var y=this.parse(d,a);return this.renderTokens(y,o,n,d,r)}}};h.prototype.unescapedValue=function(e,o){var n=o.lookup(e[1]);if(n!=null)return n};h.prototype.escapedValue=function(e,o,n){var r=this.getConfigEscape(n)||g.escape,a=o.lookup(e[1]);if(a!=null)return typeof a=="number"&&r===g.escape?String(a):r(a)};h.prototype.rawValue=function(e){return e[1]};h.prototype.getConfigTags=function(e){return L(e)?e:e&&typeof e=="object"?e.tags:void 0};h.prototype.getConfigEscape=function(e){if(e&&typeof e=="object"&&!L(e))return e.escape};var g={name:"mustache.js",version:"4.2.0",tags:["{{","}}"],clearCache:void 0,escape:void 0,parse:void 0,render:void 0,Scanner:void 0,Context:void 0,Writer:void 0,set templateCache(t){P.templateCache=t},get templateCache(){return P.templateCache}},P=new h;g.clearCache=function(){return P.clearCache()};g.parse=function(e,o){return P.parse(e,o)};g.render=function(e,o,n,r){if(typeof e!="string")throw new TypeError('Invalid template! Template should be a "string" but "'+ue(e)+'" was given as the first argument for mustache#render(template, view, partials)');return P.render(e,o,n,r)};g.escape=me;g.Scanner=D;g.Context=S;g.Writer=h;class ee{constructor(e,o){this.template=e,this.state=o,this.ast=g.parse(e)}getValue(){return this.value===void 0&&(this.value=g.render(this.template,this.state)),this.value}onChange(e){const o=[];for(const n of this.getUsedVariables().values())o.push(this.state.onVariableChange(n).subscribe(()=>{const r=g.render(this.template,this.state);r!==this.value&&(this.value=r,e(this.value))}));return{unsubscribe:()=>{for(const n of o)n.unsubscribe()}}}isPureString(){return this.ast.length===0||this.ast.length===1&&this.ast[0][0]==="text"}getUsedVariables(){const e=new Set;return this.recursiveGetUsedVariables(this.ast,e),e}recursiveGetUsedVariables(e,o){for(const n of e){const r=n[0],a=n[1],s=n[4];["name","&","#","^"].includes(r)&&o.add(a),s!==void 0&&typeof s!="string"&&this.recursiveGetUsedVariables(s,o)}}}async function ke(){var t;const e=await F();for(const o of e){const n=(t=o.properties)!==null&&t!==void 0?t:[];for(const r of n){if(r.type==="int"||r.type==="bool"||r.type==="object"||typeof r.value!="string")continue;const a=new ee(r.value,WA.state);if(a.isPureString())continue;const s=a.getValue();await O(o.name,r.name,s),a.onChange(async i=>{await O(o.name,r.name,i)})}}}async function Ce(){var t;const e=await T();for(const[o,n]of e.entries())if(n.type!=="objectgroup"){const r=(t=n.properties)!==null&&t!==void 0?t:[];for(const a of r){if(a.type==="int"||a.type==="bool"||a.type==="object"||typeof a.value!="string")continue;const s=new ee(a.value,WA.state);if(s.isPureString())continue;const i=s.getValue();_(o,a.name,i),s.onChange(l=>{_(o,a.name,l)})}}}async function O(t,e,o){console.log(t),(await WA.room.area.get(t)).setProperty(e,o)}function _(t,e,o){WA.room.setProperty(t,e,o),e==="visible"&&(o?WA.room.showLayer(t):WA.room.hideLayer(t))}const Ee="https://admin.workadventu.re/html";let z,j=0,G=0;function K(t){if(WA.state[t.name]){let e=t.properties.mustGetString("openLayer");for(const o of e.split(`
`))WA.room.showLayer(o);e=t.properties.mustGetString("closeLayer");for(const o of e.split(`
`))WA.room.hideLayer(o)}else{let e=t.properties.mustGetString("openLayer");for(const o of e.split(`
`))WA.room.hideLayer(o);e=t.properties.mustGetString("closeLayer");for(const o of e.split(`
`))WA.room.showLayer(o)}}function Pe(t){const e=t.properties.getString("openSound"),o=t.properties.getNumber("soundRadius");let n=1;if(o){const r=oe(t.properties.mustGetString("openLayer").split(`
`));if(r>o)return;n=1-r/o}e&&WA.sound.loadSound(e).play({volume:n})}function Te(t){const e=t.properties.getString("closeSound"),o=t.properties.getNumber("soundRadius");let n=1;if(o){const r=oe(t.properties.mustGetString("closeLayer").split(`
`));if(r>o)return;n=1-r/o}e&&WA.sound.loadSound(e).play({volume:n})}function te(t){return t.map(e=>z.get(e)).filter(e=>(e==null?void 0:e.type)==="tilelayer")}function oe(t){const e=te(t),o=Q(e),n=((o.right-o.left)/2+o.left)*32,r=((o.bottom-o.top)/2+o.top)*32;return Math.sqrt(Math.pow(j-n,2)+Math.pow(G-r,2))}function De(t){WA.state.onVariableChange(t.name).subscribe(()=>{WA.state[t.name]?Pe(t):Te(t),K(t)}),K(t)}function Z(t,e,o,n){const r=t.name;let a,s,i=!1;const l=o.getString("tag");let u=!0;l&&!WA.player.tags.includes(l)&&(u=!1);const d=!!l;function y(){var c;a&&a.remove(),a=WA.ui.displayActionMessage({message:(c=o.getString("closeTriggerMessage"))!==null&&c!==void 0?c:"Press SPACE to close the door",callback:()=>{WA.state[e.name]=!1,b()}})}function b(){var c;a&&a.remove(),a=WA.ui.displayActionMessage({message:(c=o.getString("openTriggerMessage"))!==null&&c!==void 0?c:"Press SPACE to open the door",callback:()=>{WA.state[e.name]=!0,y()}})}function M(){let c;if(t.type==="tilelayer")c=Q(te(e.properties.mustGetString("closeLayer").split(`
`)));else{if(t.x===void 0||t.y===void 0||t.width===void 0||t.height===void 0)throw new Error(`Doorstep zone "${t.name}" is missing x, y, width or height`);c={top:t.y,left:t.x,right:t.x+t.width,bottom:t.y+t.height}}s=WA.room.website.create({name:"doorKeypad"+r,url:n+"/keypad.html#"+encodeURIComponent(r),position:{x:c.right*32,y:c.top*32,width:32*3,height:32*4},allowApi:!0})}function k(){s&&(WA.room.website.delete(s.name),s=void 0)}function f(){if(i=!0,o.getBoolean("autoOpen")&&u){WA.state[e.name]=!0;return}if(!WA.state[e.name]&&(d&&!u||!d)&&(o.getString("code")||o.getString("codeVariable"))){M();return}u&&(WA.state[e.name]?y():b())}function w(){i=!1,o.getBoolean("autoClose")&&(WA.state[e.name]=!1),a&&a.remove(),k()}t.type==="tilelayer"?(WA.room.onEnterLayer(r).subscribe(f),WA.room.onLeaveLayer(r).subscribe(w)):(WA.room.area.onEnter(r).subscribe(f),WA.room.area.onLeave(r).subscribe(w)),WA.state.onVariableChange(e.name).subscribe(()=>{i&&(!o.getBoolean("autoClose")&&WA.state[e.name]===!0&&y(),s&&WA.state[e.name]===!0&&k(),!o.getBoolean("autoOpen")&&WA.state[e.name]===!1&&b())})}function Me(t){const e=t.properties.mustGetString("bellSound"),o=t.properties.getNumber("soundRadius");let n=1;if(o){const r=Math.sqrt(Math.pow(t.x-j,2)+Math.pow(t.y-G,2));if(r>o)return;n=1-r/o}WA.sound.loadSound(e).play({volume:n})}function Re(t){WA.state[t.name]===void 0&&(WA.state[t.name]=0),WA.state.onVariableChange(t.name).subscribe(()=>{WA.state[t.name]&&Me(t)})}function q(t,e,o){let n;const r=e.getString("bellPopup");if(o.type==="tilelayer"){const a=o.name;WA.room.onEnterLayer(a).subscribe(()=>{var s;r?n=WA.ui.openPopup(r,"",[{label:(s=e.getString("bellButtonText"))!==null&&s!==void 0?s:"Ring",callback:()=>{WA.state[t]=WA.state[t]+1}}]):WA.state[t]=WA.state[t]+1}),WA.room.onLeaveLayer(a).subscribe(()=>{n&&(n.close(),n=void 0)})}else{const a=o.name;WA.room.area.onEnter(a).subscribe(()=>{var s;r?n=WA.ui.openPopup(r,"",[{label:(s=e.getString("bellButtonText"))!==null&&s!==void 0?s:"Ring",callback:()=>{WA.state[t]=WA.state[t]+1}}]):WA.state[t]=WA.state[t]+1}),WA.room.area.onLeave(a).subscribe(()=>{n&&(n.close(),n=void 0)})}}async function Ve(t){t=t??Ee;const e=await ae();z=await T();for(const o of e.values())o.properties.get("door")&&De(o),o.properties.get("bell")&&Re(o);for(const o of z.values()){const n=new W(o.properties),r=n.getString("doorVariable");if(r&&o.type==="tilelayer"){const s=e.get(r);if(s===void 0)throw new Error('Cannot find variable "'+r+'" referred in the "doorVariable" property of layer "'+o.name+'"');Z(o,s,n,t)}const a=n.getString("bellVariable");a&&o.type==="tilelayer"&&q(a,n,o)}for(const o of await F()){const n=new W(o.properties),r=n.getString("doorVariable");if(r){const s=e.get(r);if(s===void 0)throw new Error('Cannot find variable "'+r+'" referred in the "doorVariable" property of object "'+o.name+'"');Z(o,s,n,t)}const a=n.getString("bellVariable");a&&q(a,n,o)}WA.player.onPlayerMove(o=>{j=o.x,G=o.y})}function Be(t,e){const o=t.getString("bindVariable");if(o){const n=t.get("enterValue"),r=t.get("leaveValue"),a=t.getString("triggerMessage"),s=t.getString("tag");xe(o,e,n,r,a,s)}}function xe(t,e,o,n,r,a){a&&!WA.player.tags.includes(a)||(o!==void 0&&WA.room.onEnterLayer(e).subscribe(()=>{r||(WA.state[t]=o)}),n!==void 0&&WA.room.onLeaveLayer(e).subscribe(()=>{WA.state[t]=n}))}async function ze(){const t=await T();for(const e of t.values()){const o=new W(e.properties);Be(o,e.name)}}let $;async function Ue(t){const e=await WA.room.getTiledMap();t=t??J,$=await T();const o=e.layers.find(n=>n.name==="configuration");if(o){const r=new W(o.properties).getString("tag");(!r||WA.player.tags.includes(r))&&WA.ui.registerMenuCommand("Configure the room",()=>{WA.nav.openCoWebSite(t+"/configuration.html",!0)});for(const a of $.values()){const s=new W(a.properties),i=s.getString("openConfig");i&&a.type==="tilelayer"&&je(i.split(","),a.name,s)}}}function je(t,e,o){let n;const r=o.getString("openConfigAdminTag");let a=!0;r&&!WA.player.tags.includes(r)&&(a=!1);function s(){var l;n&&n.remove(),n=WA.ui.displayActionMessage({message:(l=o.getString("openConfigTriggerMessage"))!==null&&l!==void 0?l:"Press SPACE or touch here to configure",callback:()=>N(t)})}function i(){WA.nav.closeCoWebSite()}WA.room.onEnterLayer(e).subscribe(()=>{const l=o.getString("openConfigTrigger");a&&(l&&l==="onaction"?s():N(t))}),WA.room.onLeaveLayer(e).subscribe(()=>{n&&n.remove(),i()})}function Ge(){return WA.onInit().then(()=>{Ve().catch(t=>console.error(t)),ze().catch(t=>console.error(t)),Ue().catch(t=>console.error(t)),Ce().catch(t=>console.error(t)),ke().catch(t=>console.error(t))}).catch(t=>console.error(t))}console.log("Script started successfully");let E;WA.onInit().then(async()=>{console.log("Scripting API ready"),console.log("Player tags: ",WA.player.tags);let t=null,e=null;try{t=WA.sound.loadSound("./assets/background.mp3"),await t.play({loop:!0,volume:.3}),console.log("Background music started")}catch(a){console.error("Error playing background music:",a)}try{e=WA.sound.loadSound("./assets/website-music.mp3")}catch(a){console.error("Error loading website music:",a)}WA.room.onEnterLayer("embed/websiteSignUp").subscribe(()=>{t&&t.fade(.3,.1,1e3),e&&e.play({loop:!0,volume:.3})}),WA.room.onLeaveLayer("embed/websiteSignUp").subscribe(()=>{t&&t.fade(.1,.3,1e3),e&&e.stop()});const o=await WA.room.website.get("cinemaScreen");o.x=1670,o.y=802,o.width=320,o.height=240,WA.room.onEnterLayer("zone/toRoom3Zone").subscribe(()=>{console.log("At the door"),WA.room.hideLayer("doorTipSwitch"),r("toRoom3")}),WA.room.onLeaveLayer("zone/toRoom3Zone").subscribe(()=>{console.log("Leaving door"),p(),WA.room.showLayer("doorTipSwitch")}),WA.room.onEnterLayer("doorTipSwitch").subscribe(()=>{console.log("At Mr Robot"),r("doorCode"),WA.room.showLayer("ctaDigitCodeSwitch")}),WA.room.onLeaveLayer("doorTipSwitch").subscribe(()=>{console.log("Leaving Mr Robot"),p(),WA.room.hideLayer("ctaDigitCodeSwitch")}),WA.room.onEnterLayer("toRoom3DigicodeZone").subscribe(()=>{console.log("At keypad"),!WA.state.loadVariable("room3Door")&&(WA.room.hideLayer("ctaDigitCode"),WA.room.hideLayer("ctaDigitCodeSwitch"))}),WA.room.onLeaveLayer("toRoom3DigicodeZone").subscribe(()=>{console.log("Leaving keypad"),p(),WA.state.loadVariable("room3Door")||(WA.room.showLayer("ctaDigitCode"),WA.room.showLayer("ctaDigitCodeSwitch"))});const n=[{zone:"needHelp",message:"From CoolKids for CoolKids",cta:[{label:"Spread the word",className:"primary",callback:()=>WA.nav.openTab("https://twitter.com/intent/tweet?text=Just%20tried%20CoolKidsClub%20world%20and%20i%27m%20really%20impressed.%20@coolkidsclubsol&url=https://play.coolkidsclub.space")}]},{zone:"followUs1",message:"Hey! Have you joined CoolKidsClub already?",cta:[{label:"Telegram",className:"primary",callback:()=>WA.nav.openTab("https://t.me/coolkidsclubportal")},{label:"Twitter",className:"primary",callback:()=>WA.nav.openTab("https://x.com/intent/user?screen_name=coolkidsclubsol")}]},{zone:"followUs2",message:"Hey! Have you joined CoolKidsClub already?",cta:[{label:"Telegram",className:"primary",callback:()=>WA.nav.openTab("https://t.me/coolkidsclubportal")},{label:"Twitter",className:"primary",callback:()=>WA.nav.openTab("https://x.com/intent/user?screen_name=coolkidsclubsol")}]},{zone:"followUs3",message:"Hey! Have you joined CoolKidsClub already?",cta:[{label:"Telegram",className:"primary",callback:()=>WA.nav.openTab("https://t.me/coolkidsclubportal")},{label:"Twitter",className:"primary",callback:()=>WA.nav.openTab("https://x.com/intent/user?screen_name=coolkidsclubsol")}]},{zone:"doorCode",message:"Hello, I'm Mr Robot. The code is 420.",cta:[]},{zone:"toRoom3",message:"Want to access the gaming room? Mr Robot can help you!",cta:[]},{zone:"meetDesk",message:"Welcome to CoolKidsClub world",cta:[{label:"Dismiss",className:"normal",callback:()=>WA.state.saveVariable("dontShowMeetPopup",!0).then(()=>p())}]},{zone:"workDesk",message:"Are you worthy? ;)",cta:[{label:"Dismiss",className:"normal",callback:()=>WA.state.saveVariable("dontShowWorkPopup",!0).then(()=>p())}]},{zone:"collaborateDesk",message:"Have fun with others",cta:[{label:"Dismiss",className:"normal",callback:()=>WA.state.saveVariable("dontShowCollaboratePopup",!0).then(()=>p())}]},{zone:"playDesk",message:"CoolKids love games right?",cta:[{label:"Dismiss",className:"normal",callback:()=>WA.state.saveVariable("dontShowPlayPopup",!0).then(()=>p())}]},{zone:"createDesk",message:"Are you ready to become CoolKid?",cta:[{label:"Dismiss",className:"normal",callback:()=>WA.state.saveVariable("dontShowCreatePopup",!0).then(()=>p())}]}];function r(a){E!==void 0&&p(),console.log("Attempting to open popup for zone:",a);const s=a+"Popup",i=n.find(l=>l.zone==a);console.log("Found zone config:",i),typeof i<"u"?(console.log("Opening popup with name:",s,"message:",i.message),E=WA.ui.openPopup(s,i.message,i.cta)):console.log("No zone config found for:",a)}WA.room.onEnterLayer("needHelpZone").subscribe(()=>{console.log("Entered needHelp zone"),r("needHelp")}),WA.room.onLeaveLayer("needHelpZone").subscribe(p),WA.room.onEnterLayer("followUs1Zone").subscribe(()=>r("followUs1")),WA.room.onLeaveLayer("followUs1Zone").subscribe(p),WA.room.onEnterLayer("followUs2Zone").subscribe(()=>r("followUs2")),WA.room.onLeaveLayer("followUs2Zone").subscribe(p),WA.room.onEnterLayer("followUs3Zone").subscribe(()=>r("followUs3")),WA.room.onLeaveLayer("followUs3Zone").subscribe(p),WA.room.onEnterLayer("zone/meetDeskZone").subscribe(()=>{p(),!WA.state.loadVariable("dontShowMeetPopup")&&r("meetDesk")}),WA.room.onLeaveLayer("zone/meetDeskZone").subscribe(()=>{p()}),WA.room.onEnterLayer("zone/workDeskZone").subscribe(()=>{p(),!WA.state.loadVariable("dontShowWorkPopup")&&r("workDesk")}),WA.room.onLeaveLayer("zone/workDeskZone").subscribe(()=>{p()}),WA.room.onEnterLayer("zone/collaborateDeskZone").subscribe(()=>{p(),!WA.state.loadVariable("dontShowCollaboratePopup")&&r("collaborateDesk")}),WA.room.onLeaveLayer("zone/collaborateDeskZone").subscribe(()=>{p()}),WA.room.onEnterLayer("zone/playDeskZone").subscribe(()=>{p(),!WA.state.loadVariable("dontShowPlayPopup")&&r("playDesk")}),WA.room.onLeaveLayer("zone/playDeskZone").subscribe(()=>{p()}),WA.room.onEnterLayer("zone/createDeskZone").subscribe(()=>{p(),!WA.state.loadVariable("dontShowCreatePopup")&&r("createDesk")}),WA.room.onLeaveLayer("zone/createDeskZone").subscribe(()=>{p()}),Ge().then(()=>{console.log("Scripting API Extra ready")}).catch(a=>console.error(a))}).catch(t=>console.error(t));function p(){E!==void 0&&(E.close(),E=void 0)}
//# sourceMappingURL=main-92388661.js.map
