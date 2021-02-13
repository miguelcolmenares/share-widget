/*! share-widget - v1.0.3 - 2021-02-13 */
"use strict";class ShareWidget{constructor({backgroundTitle:t="",buttons:e=[],colorIcon:s="",colorTitle:a="",title:i="Comparte en"}){this.backgroundTitle=t,this.buttons=e,this.colorIcon=s,this.colorTitle=a,this.url="https://cdn.jsdelivr.net/gh/miguelcolmenares/share-widget",this.shareData={title:document.getElementsByTagName("title")[0].innerHTML,url:window.location.href},this.title=i,this.version="1.0.3",this.widget=document.createElement("div"),this._setVariables(),this.render()}_button(){const t=document.createElement("button"),e=document.createElement("span");return t.classList.add("sh-w_b"),e.classList.add("sh-w-i-share"),t.append(e),t.title=this.title,t.addEventListener("click",async t=>{t.preventDefault(),"dataLayer"in window&&dataLayer.push({event:"ga_event",category:"Widget WhatsApp",action:"Click WhatsApp",label:"Click Icono"}),navigator.share?await navigator.share(this.shareData):this.widget.classList.toggle("open")}),t}_header(){const t=document.createElement("header"),e=document.createElement("span");return t.classList.add("sh-w_h"),e.classList.add("sh-w_h_t"),e.innerHTML=this.title,t.append(e),t}async _styles(){const t=document.createElement("style");return await fetch(`${this.url}@${this.version}/dist/css/share-widget.css`).then(t=>t.text()).then(e=>t.append(e)),document.head.append(t)}_setVariables(){this.backgroundTitle.length&&document.documentElement.style.setProperty("--share-title-bg",this.backgroundTitle),this.colorIcon.length&&document.documentElement.style.setProperty("--share-icon-color",this.colorIcon),this.colorTitle.length&&document.documentElement.style.setProperty("--share-title-color",this.colorTitle)}async render(){if(!this.buttons.length)return;await this._styles();const t=document.createElement("section");t.classList.add("sh-w_l"),this.buttons.forEach(e=>t.append(new ShareButton(e).render())),this.widget.classList.add("sh-w"),this.widget.append(this._header()),this.widget.append(t),this.widget.append(this._button()),document.body.append(this.widget)}}class ShareButton{constructor({color:t="",name:e="",network:s=""}){this.button=document.createElement("a"),this.color=t,this.icon=s,this.name=e,this.network=s,this.shareData={title:encodeURI(document.title),url:window.location.href}}render(){if(!this.name.length)return"";const t=/iPad|iPhone|iPod/.test(navigator.userAgent),e=/Android/i.test(navigator.userAgent);this.button.classList.add("sh-w_l_b"),this.button.title=`Compartir por ${this.name}`,this.button.style.color=this.color,this.button.style.borderColor=this.color;const s=document.createElement("span");s.classList.add("sh-w_l_b_i"),s.classList.add(`sh-w-i-${this.icon}`);const a=document.createElement("span");a.classList.add("sh-w_l_b_i"),a.classList.add("sh-w-i-external");const i=document.createElement("span");return i.classList.add("sh-w_l_b_t"),i.innerHTML=this.name,this.button.append(s),this.button.append(i),this.button.append(a),this.button.addEventListener("click",()=>{let s="";switch("dataLayer"in window&&dataLayer.push({event:"ga_event",category:"Widget Share",action:`Click ${this.name}`,label:this.network}),this.network){case"email":s=`mailto:?to=&subject=${this.shareData.title}&body=${this.shareData.url}`;break;case"facebook":s=`https://www.facebook.com/sharer.php?display=popup&u=${this.shareData.url}&quote=${this.shareData.title}`;break;case"twitter":s=`https://twitter.com/intent/tweet?text=${this.shareData.title}&url=${this.shareData.url}`;break;case"whatsapp":s=(t||e?"whatsapp://send?":"https://web.whatsapp.com/send?")+`text=${this.shareData.title} ${this.shareData.url}`}window.open(s,"shareWidget","width=600,height=400,location=0,menubar=0")}),this.button.addEventListener("mouseenter",()=>{this.button.style.backgroundColor=this.color}),this.button.addEventListener("mouseleave",()=>{this.button.style.removeProperty("background-color")}),this.button}}window.shareWidget=ShareWidget;
//# sourceMappingURL=share-widget.js.map