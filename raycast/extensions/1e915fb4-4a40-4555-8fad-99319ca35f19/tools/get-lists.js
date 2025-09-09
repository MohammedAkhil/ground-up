"use strict";var G=Object.create;var b=Object.defineProperty;var K=Object.getOwnPropertyDescriptor;var J=Object.getOwnPropertyNames;var H=Object.getPrototypeOf,Z=Object.prototype.hasOwnProperty;var q=(r,e)=>{for(var t in e)b(r,t,{get:e[t],enumerable:!0})},T=(r,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let a of J(e))!Z.call(r,a)&&a!==t&&b(r,a,{get:()=>e[a],enumerable:!(n=K(e,a))||n.enumerable});return r};var w=(r,e,t)=>(t=r!=null?G(H(r)):{},T(e||!r||!r.__esModule?b(t,"default",{value:r,enumerable:!0}):t,r)),Y=r=>T(b({},"__esModule",{value:!0}),r);var le={};q(le,{default:()=>ce});module.exports=Y(le);var m=require("@raycast/api");var f=w(require("react")),o=require("@raycast/api");var I=w(require("node:child_process")),C=require("node:buffer"),h=w(require("node:stream")),O=require("node:util");var j=require("react/jsx-runtime");var k=globalThis;var $=r=>!!r&&typeof r=="object"&&typeof r.removeListener=="function"&&typeof r.emit=="function"&&typeof r.reallyExit=="function"&&typeof r.listeners=="function"&&typeof r.kill=="function"&&typeof r.pid=="number"&&typeof r.on=="function",x=Symbol.for("signal-exit emitter"),S=class{constructor(){if(this.emitted={afterExit:!1,exit:!1},this.listeners={afterExit:[],exit:[]},this.count=0,this.id=Math.random(),k[x])return k[x];Object.defineProperty(k,x,{value:this,writable:!1,enumerable:!1,configurable:!1})}on(e,t){this.listeners[e].push(t)}removeListener(e,t){let n=this.listeners[e],a=n.indexOf(t);a!==-1&&(a===0&&n.length===1?n.length=0:n.splice(a,1))}emit(e,t,n){if(this.emitted[e])return!1;this.emitted[e]=!0;let a=!1;for(let i of this.listeners[e])a=i(t,n)===!0||a;return e==="exit"&&(a=this.emit("afterExit",t,n)||a),a}},E=class{onExit(){return()=>{}}load(){}unload(){}},A=class{#o;#t;#e;#s;#i;#a;#n;#r;constructor(e){this.#o=process.platform==="win32"?"SIGINT":"SIGHUP",this.#t=new S,this.#a={},this.#n=!1,this.#r=[],this.#r.push("SIGHUP","SIGINT","SIGTERM"),globalThis.process.platform!=="win32"&&this.#r.push("SIGALRM","SIGABRT","SIGVTALRM","SIGXCPU","SIGXFSZ","SIGUSR2","SIGTRAP","SIGSYS","SIGQUIT","SIGIOT"),globalThis.process.platform==="linux"&&this.#r.push("SIGIO","SIGPOLL","SIGPWR","SIGSTKFLT"),this.#e=e,this.#a={};for(let t of this.#r)this.#a[t]=()=>{let n=this.#e.listeners(t),{count:a}=this.#t,i=e;if(typeof i.__signal_exit_emitter__=="object"&&typeof i.__signal_exit_emitter__.count=="number"&&(a+=i.__signal_exit_emitter__.count),n.length===a){this.unload();let s=this.#t.emit("exit",null,t),c=t==="SIGHUP"?this.#o:t;s||e.kill(e.pid,c)}};this.#i=e.reallyExit,this.#s=e.emit}onExit(e,t){if(!$(this.#e))return()=>{};this.#n===!1&&this.load();let n=t?.alwaysLast?"afterExit":"exit";return this.#t.on(n,e),()=>{this.#t.removeListener(n,e),this.#t.listeners.exit.length===0&&this.#t.listeners.afterExit.length===0&&this.unload()}}load(){if(!this.#n){this.#n=!0,this.#t.count+=1;for(let e of this.#r)try{let t=this.#a[e];t&&this.#e.on(e,t)}catch{}this.#e.emit=(e,...t)=>this.#l(e,...t),this.#e.reallyExit=e=>this.#c(e)}}unload(){this.#n&&(this.#n=!1,this.#r.forEach(e=>{let t=this.#a[e];if(!t)throw new Error("Listener not defined for signal: "+e);try{this.#e.removeListener(e,t)}catch{}}),this.#e.emit=this.#s,this.#e.reallyExit=this.#i,this.#t.count-=1)}#c(e){return $(this.#e)?(this.#e.exitCode=e||0,this.#t.emit("exit",this.#e.exitCode,null),this.#i.call(this.#e,this.#e.exitCode)):0}#l(e,...t){let n=this.#s;if(e==="exit"&&$(this.#e)){typeof t[0]=="number"&&(this.#e.exitCode=t[0]);let a=n.call(this.#e,e,...t);return this.#t.emit("exit",this.#e.exitCode,null),a}else return n.call(this.#e,e,...t)}},v=null,X=(r,e)=>(v||(v=$(process)?new A(process):new E),v.onExit(r,e));function Q(r,{timeout:e}={}){let t=new Promise((c,l)=>{r.on("exit",(u,d)=>{c({exitCode:u,signal:d,timedOut:!1})}),r.on("error",u=>{l(u)}),r.stdin&&r.stdin.on("error",u=>{l(u)})}),n=X(()=>{r.kill()});if(e===0||e===void 0)return t.finally(()=>n());let a,i=new Promise((c,l)=>{a=setTimeout(()=>{r.kill("SIGTERM"),l(Object.assign(new Error("Timed out"),{timedOut:!0,signal:"SIGTERM"}))},e)}),s=t.finally(()=>{clearTimeout(a)});return Promise.race([i,s]).finally(()=>n())}var P=class extends Error{constructor(){super("The output is too big"),this.name="MaxBufferError"}};function ee(r){let{encoding:e}=r,t=e==="buffer",n=new h.default.PassThrough({objectMode:!1});e&&e!=="buffer"&&n.setEncoding(e);let a=0,i=[];return n.on("data",s=>{i.push(s),a+=s.length}),n.getBufferedValue=()=>t?Buffer.concat(i,a):i.join(""),n.getBufferedLength=()=>a,n}async function R(r,e){let t=ee(e);return await new Promise((n,a)=>{let i=s=>{s&&t.getBufferedLength()<=C.constants.MAX_LENGTH&&(s.bufferedData=t.getBufferedValue()),a(s)};(async()=>{try{await(0,O.promisify)(h.default.pipeline)(r,t),n()}catch(s){i(s)}})(),t.on("data",()=>{t.getBufferedLength()>8e7&&i(new P)})}),t.getBufferedValue()}async function _(r,e){r.destroy();try{return await e}catch(t){return t.bufferedData}}async function te({stdout:r,stderr:e},{encoding:t},n){let a=R(r,{encoding:t}),i=R(e,{encoding:t});try{return await Promise.all([n,a,i])}catch(s){return Promise.all([{error:s,exitCode:null,signal:s.signal,timedOut:s.timedOut||!1},_(r,a),_(e,i)])}}function re(r){let e=typeof r=="string"?`
`:10,t=typeof r=="string"?"\r":13;return r[r.length-1]===e&&(r=r.slice(0,-1)),r[r.length-1]===t&&(r=r.slice(0,-1)),r}function U(r,e){return r.stripFinalNewline?re(e):e}function ne({timedOut:r,timeout:e,signal:t,exitCode:n}){return r?`timed out after ${e} milliseconds`:t!=null?`was killed with ${t}`:n!=null?`failed with exit code ${n}`:"failed"}function ae({stdout:r,stderr:e,error:t,signal:n,exitCode:a,command:i,timedOut:s,options:c,parentError:l}){let d=`Command ${ne({timedOut:s,timeout:c?.timeout,signal:n,exitCode:a})}: ${i}`,g=t?`${d}
${t.message}`:d,y=[g,e,r].filter(Boolean).join(`
`);return t?t.originalMessage=t.message:t=l,t.message=y,t.shortMessage=g,t.command=i,t.exitCode=a,t.signal=n,t.stdout=r,t.stderr=e,"bufferedData"in t&&delete t.bufferedData,t}function se({stdout:r,stderr:e,error:t,exitCode:n,signal:a,timedOut:i,command:s,options:c,parentError:l}){if(t||n!==0||a!==null)throw ae({error:t,exitCode:n,signal:a,stdout:r,stderr:e,command:s,timedOut:i,options:c,parentError:l});return r}async function D(r,e,t){if(process.platform!=="darwin")throw new Error("AppleScript is only supported on macOS");let{humanReadableOutput:n,language:a,timeout:i,...s}=Array.isArray(e)?t||{}:e||{},c=n!==!1?[]:["-ss"];a==="JavaScript"&&c.push("-l","JavaScript"),Array.isArray(e)&&c.push("-",...e);let l=I.default.spawn("osascript",c,{...s,env:{PATH:"/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"}}),u=Q(l,{timeout:i??1e4});l.stdin.end(r);let[{error:d,exitCode:g,signal:y,timedOut:W},z,V]=await te(l,{encoding:"utf8"},u),F=U({stripFinalNewline:!0},z),B=U({stripFinalNewline:!0},V);return se({stdout:F,stderr:B,error:d,exitCode:g,signal:y,timedOut:W,command:"osascript",options:t,parentError:new Error})}var L=(0,m.getPreferenceValues)(),p=class extends Error{constructor(t,n,a){super(t);this.type=n;this.originalError=a;this.name="ThingsError"}},N=async r=>{try{let e=await D(`(function(){${r}})()`,{humanReadableOutput:!1,language:"JavaScript"});return e?JSON.parse(e.replace(/:\s*undefined/g,": null")):void 0}catch(e){let n=(typeof e=="string"?e:e instanceof Error?e.message:String(e)).replace("execution error: Error: ","");throw n.match(/Application can't be found/i)?new p("Things application not found. Please make sure Things is installed and running.","APP_NOT_FOUND",n):n.match(/not allowed assistive access/i)||n.match(/permission/i)||n.match(/-1743/)?new p("Permission denied. Please grant Raycast access to Things in System Settings > Privacy & Security > Automation > Raycast > Things.","PERMISSION_DENIED",n):n.match(/doesn't understand/i)||n.match(/can't get/i)?new p("Things automation interface error. This might be due to a Things version incompatibility or the app not being ready.","EXECUTION_ERROR",n):new p(`Unexpected error: ${n}`,"UNKNOWN_ERROR",n)}};var ie=async()=>N(`
    const things = Application('${L.thingsAppIdentifier}');
    const projects = things.projects();

    return projects.map(project => ({
      id: project.id(),
      name: project.name(),
      status: project.status(),
      notes: project.notes(),
      tags: project.tagNames(),
      dueDate: project.dueDate() && project.dueDate().toISOString(),
      activationDate: project.activationDate() && project.activationDate().toISOString(),
      area: project.area() && {
        id: project.area().id(),
        name: project.area().name(),
        tags: project.area().tagNames(),
      },
      todos: project.toDos().map(todo => ({
        id: todo.id(),
        name: todo.name(),
        status: todo.status(),
        notes: todo.notes(),
        tags: todo.tagNames(),
        dueDate: todo.dueDate() && todo.dueDate().toISOString(),
        activationDate: todo.activationDate() && todo.activationDate().toISOString(),
      }))
    }));
  `),oe=async()=>N(`
    const things = Application('${L.thingsAppIdentifier}');
    const areas = things.areas();

    return areas.map(area => ({
      id: area.id(),
      name: area.name(),
      tags: area.tagNames(),
      todos: area.toDos().map(todo => ({
        id: todo.id(),
        name: todo.name(),
        status: todo.status(),
        notes: todo.notes(),
        tags: todo.tagNames(),
        dueDate: todo.dueDate() && todo.dueDate().toISOString(),
        activationDate: todo.activationDate() && todo.activationDate().toISOString(),
        isProject: todo.properties().pcls === "project",
      }))
    }));
  `),M=async()=>{let r=await ie()||[],e=await oe()||[],t=r.filter(a=>!a.area).map(a=>({...a,type:"project"})),n=[];return e.forEach(a=>{n.push({...a,type:"area"});let i=r.filter(s=>s.area&&s.area.id===a.id).map(s=>({...s,type:"project"}));n.push(...i)}),[...t,...n]};async function ce(){return await M()}
