window.onload=function(){document.querySelector(".link_logs"),document.createElement("li");const e=document.querySelector(".plus-icon-container-li"),l=document.querySelector("#linkForm"),t=document.querySelector("#JSaddLinkFormClose"),o=document.querySelector("#JSsubmit");document.querySelector("#JScontainer");const r=document.querySelector("#JSlinkLogs"),c=document.querySelector(".plus-icon-container-li");document.querySelector(".close"),document.querySelectorAll(".close");const a=document.querySelector(".selectDiv"),n=document.querySelector(".dashDiv"),i=document.querySelector(".dashDivSelectd"),s=document.querySelector("#JSsetting");function u(l){JSON.parse(localStorage.getItem("displaySelect"));for(let e=0;e<=r.childNodes.length;e++)r.childNodes[e]&&"plus-icon-container-li"!==r.childNodes[e].className&&r.removeChild(r.childNodes[e]);l=l.map(e=>(""===e.image_url&&(e.image_url=e.url+"/favicon.ico"),e));for(let t=0;t<l.length;t++){var{url:o,image_url:a,linkName:n}=l[t];let e=document.createElement("li");e.innerHTML=`<a title = ${n} href = ${o} class = 'link-url' ><img src="${a}" )><i class = "close" index= ${t}></i></a>`,c&&r.insertBefore(e,c)}}function d(t){try{let e=t.split("//")[1].split(".")[0];return console.log(),e=e[0].toUpperCase()+e.slice(1,100)}catch(e){return""}}null===JSON.parse(localStorage.getItem("FormData"))&&ajax("static/data/FormData.json",function(e){e=new Function(`return (${e})`)();localStorage.setItem("FormData",JSON.stringify(e.data))}),u(JSON.parse(localStorage.getItem("FormData"))),s.onclick=function(){a.parentNode.parentNode.style.visibility="visible"},a.parentNode.parentNode.addEventListener("mouseleave",e=>{a.parentNode.parentNode.style.visibility="hidden"}),a.addEventListener("click",e=>{var t;"none"===JSON.parse(localStorage.getItem("displaySelect"))?localStorage.setItem("displaySelect",JSON.stringify("block")):localStorage.setItem("displaySelect",JSON.stringify("none")),t=JSON.parse(localStorage.getItem("displaySelect")),document.querySelector(".plus-icon-container-li").style.display="none"===t?"none":"inline-block",n.style.display="none"===t?"block":"none",i.style.display=t;for(let e=0;e<document.querySelectorAll(".close").length;e++){const l=document.querySelectorAll(".close")[e];l.style.display=t}}),e.addEventListener("click",async e=>{console.log("0000"),l.style.display="block";const t=await navigator.clipboard.readText();-1!==t.indexOf("://")&&(l[0].value=t,l[1].value=l[0].value+"/favicon.ico",l[2].value=d(l[0].value))}),l[0].addEventListener("keydown",e=>{l[1].value=l[0].value+"/favicon.ico",l[2].value=d(l[0].value)}),t.addEventListener("click",function(){l.style.display="none"}),o.onclick=function(){var o,e=l[1].value;o=e,new Promise(function(t,l){const e=new Image;e.src=o,e.onload=function(e){t(e)},e.onerror=function(e){l(e)}}).then(()=>{console.log("有效链接"),l.style.display="none"}).catch(()=>{console.log("无效链接"),alert("图片url链接无效")});let t=[{url:"",image_url:""}];console.log(null!==localStorage.getItem("FormData")),null!==localStorage.getItem("FormData")&&(t=JSON.parse(localStorage.getItem("FormData"))),console.log(e),t.push({url:l[0].value,image_url:l[1].value,linkName:l[2].value});var a;t=t.filter(e=>-1!==e.url.indexOf("://")),e=t,a="url",u(t=e.filter((e,t,l)=>l.map(e=>e[a]).indexOf(e[a])===t&&e[a])),localStorage.removeItem("FormData"),localStorage.setItem("FormData",JSON.stringify(t))},r.addEventListener("click",t=>{if("close"===t.target.className){var l=t.target.getAttribute("index");t.target.parentNode.parentNode.removeChild(t.target.parentNode);let e=JSON.parse(localStorage.getItem("FormData"));e.splice(l,1),console.log(e),localStorage.removeItem("FormData"),localStorage.setItem("FormData",JSON.stringify(e)),t.preventDefault()}})};