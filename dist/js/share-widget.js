/*! share-widget - v1.1.0 - 2021-02-15 */
"use strict";class ShareWidget{constructor({button:t={color:""},header:e={background:"",color:"",title:""},networks:a=[]}){this.button=t,this.header=e,this.networks=a,this.package="share-widget",this.shareData={title:encodeURI(document.title),url:window.location.href},this.url="https://cdn.jsdelivr.net/gh/miguelcolmenares/share-widget",this.version="1.1.0",this.$widget,this.networks.length&&(this._setVariables(),this.render())}_button(){return document.createRange().createContextualFragment(`<button class="sh-w_b" title="${this.header.title}">\n\t\t\t<span class="sh-w-i-share"></span>\n\t\t</button>`)}async _click(){"dataLayer"in window&&dataLayer.push({event:"ga_event",category:"Widget Share",action:"Click Share",label:`Click Icono${navigator.share?" mobile":""}`}),navigator.share?await navigator.share(this.shareData).then(()=>dataLayer.push({event:"ga_event",category:"Widget Share",action:"Click Share",label:"mobile"})):this.widget.classList.toggle("open")}_header(){return document.createRange().createContextualFragment(`<header class="sh-w_h">\n\t\t\t<span class="sh-w_h_t">${this.header.title}</span>\n\t\t</header>`)}_networks(){const t=document.createElement("section");return t.classList.add("sh-w_l"),this.networks.forEach(e=>t.append(new ShareButton(e).render())),t}_setVariables(){return`:root {\n\t\t\t${this.header.background.length?`--share-title-bg: ${this.header.background};`:""}\n\t\t\t${this.button.color.length?`--share-icon-color: ${this.button.color};`:""}\n\t\t}`}async _styles(){const t=document.createElement("style");return await fetch(`${this.url}@${this.version}/dist/css/${this.package}.css`).then(t=>t.text()).then(e=>{t.append(this._setVariables()),t.append(e)}),document.head.append(t)}async render(){await this._styles();const t=document.createElement("div");return t.classList.add("sh-w"),navigator.share&&t.classList.add("native"),t.append(this._header()),t.append(this._networks()),t.append(this._button()),document.body.append(t),t.querySelector(".sh-w_b").addEventListener("click",async t=>{t.preventDefault(),this._click()}),this.widget=t}get widget(){return this.$widget}set widget(t){this.$widget=t}}class ShareButton{constructor({color:t="",name:e="",network:a=""}){this.button=document.createElement("a"),this.color=t,this.icon=a,this.name=e,this.network=a,this.shareData={title:encodeURI(document.title),url:window.location.href}}render(){if(!this.name.length)return"";const t=/iPad|iPhone|iPod/.test(navigator.userAgent),e=/Android/i.test(navigator.userAgent);this.button.classList.add("sh-w_l_b"),this.button.title=`Compartir por ${this.name}`,this.button.style.color=this.color,this.button.style.borderColor=this.color;const a=document.createElement("span");a.classList.add("sh-w_l_b_i"),a.classList.add(`sh-w-i-${this.icon}`);const s=document.createElement("span");s.classList.add("sh-w_l_b_i"),s.classList.add("sh-w-i-external");const n=document.createElement("span");return n.classList.add("sh-w_l_b_t"),n.innerHTML=this.name,this.button.append(a),this.button.append(n),this.button.append(s),this.button.addEventListener("click",a=>{a.preventDefault();let s="";switch("dataLayer"in window&&dataLayer.push({event:"ga_event",category:"Widget Share",action:"Click Share",label:this.network}),this.network){case"email":s=`mailto:?to=&subject=${this.shareData.title}&body=${this.shareData.url}`;break;case"facebook":s=`https://www.facebook.com/sharer.php?display=popup&u=${this.shareData.url}&quote=${this.shareData.title}`;break;case"twitter":s=`https://twitter.com/intent/tweet?text=${this.shareData.title}&url=${this.shareData.url}`;break;case"whatsapp":s=(t||e?"whatsapp://send?":"https://web.whatsapp.com/send?")+`text=${this.shareData.title} ${this.shareData.url}`}window.open(s,"shareWidget","width=600,height=400,location=0,menubar=0")}),this.button.addEventListener("mouseenter",()=>{this.button.style.backgroundColor=this.color}),this.button.addEventListener("mouseleave",()=>{this.button.style.removeProperty("background-color")}),this.button}}window.shareWidget=ShareWidget;