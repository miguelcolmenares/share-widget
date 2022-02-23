/*! share-widget - v2.0.1 - 2022-02-23 */
"use strict";class ShareWidget{constructor({button:t={color:""},header:e={background:"",color:"",title:""},networks:a=[]}){this.button=t,this.header=e,this.networks=a,this.package="share-widget",this.shareData={title:document.title,url:window.location.href},this.url="https://cdn.jsdelivr.net/gh/miguelcolmenares/share-widget",this.version="2.0.1",this.$widget,this.networks.length&&(this._setVariables(),this.render())}_button(){return document.createRange().createContextualFragment(`<button class="sh-w_b" title="${this.header.title}">
			<span class="sh-w-i-share"></span>
		</button>`)}async _click(){"dataLayer"in window&&dataLayer.push({event:"ga_event",category:"Widget Share",action:"Click Share",label:"Click Icono"+(navigator.share?" mobile":"")}),navigator.share?await navigator.share(this.shareData).then(()=>dataLayer.push({event:"ga_event",category:"Widget Share",action:"Click Share",label:"mobile"})):this.widget.classList.toggle("open")}_header(){return document.createRange().createContextualFragment(`<header class="sh-w_h">
			<span class="sh-w_h_t">${this.header.title}</span>
		</header>`)}_networks(){const e=document.createElement("section");return e.classList.add("sh-w_l"),this.networks.forEach(t=>e.append(new ShareButton(t).render())),e}_setVariables(){return`:root {
			${this.header.background.length?`--share-title-bg: ${this.header.background};`:""}
			${this.button.color.length?`--share-icon-color: ${this.button.color};`:""}
		}`}async _styles(){const e=document.createElement("style");return await fetch(`${this.url}@${this.version}/dist/css/${this.package}.css`).then(t=>t.text()).then(t=>{e.append(this._setVariables()),e.append(t)}),document.head.append(e)}async render(){await this._styles();var t=null!==document.querySelector("#js-AnchorGeneralTab");const e=document.createElement("div"),a=document.createElement("div");return e.classList.add("sh-w"),a.classList.add("sh-w_c"),t&&e.classList.add("pdp"),navigator.share&&e.classList.add("native"),a.append(this._header()),a.append(this._networks()),e.append(this._button()),e.append(a),(t?document.querySelector(".js-gallery"):document.body).append(e),e.querySelector(".sh-w_b").addEventListener("click",async t=>{t.preventDefault(),this._click()}),this.widget=e}get widget(){return this.$widget}set widget(t){this.$widget=t}}class ShareButton{constructor({color:t="",name:e="",network:a=""}){this.button=document.createElement("a"),this.color=t,this.icon=a,this.name=e,this.network=a,this.shareData={title:encodeURI(document.title),url:window.location.href}}render(){if(!this.name.length)return"";const a=/iPad|iPhone|iPod/.test(navigator.userAgent),s=/Android/i.test(navigator.userAgent),t=(this.button.classList.add("sh-w_l_b"),this.button.title="Compartir por "+this.name,this.button.style.color=this.color,this.button.style.borderColor=this.color,document.createElement("span")),e=(t.classList.add("sh-w_l_b_i"),t.classList.add("sh-w-i-"+this.icon),document.createElement("span")),n=(e.classList.add("sh-w_l_b_i"),e.classList.add("sh-w-i-external"),document.createElement("span"));return n.classList.add("sh-w_l_b_t"),n.innerHTML=this.name,this.button.append(t),this.button.append(n),this.button.append(e),this.button.addEventListener("click",t=>{t.preventDefault();let e="";switch("dataLayer"in window&&dataLayer.push({event:"ga_event",category:"Widget Share",action:"Click Share",label:this.network}),this.network){case"email":e=`mailto:?to=&subject=${this.shareData.title}&body=`+this.shareData.url;break;case"facebook":e=`https://www.facebook.com/sharer.php?display=popup&u=${this.shareData.url}&quote=`+this.shareData.title;break;case"twitter":e=`https://twitter.com/intent/tweet?text=${encodeURI(this.shareData.title)}&url=`+this.shareData.url;break;case"whatsapp":e=(a||s?"whatsapp://send?":"https://web.whatsapp.com/send?")+`text=${this.shareData.title} `+this.shareData.url}window.open(e,"shareWidget","width=600,height=400,location=0,menubar=0")}),this.button.addEventListener("mouseenter",()=>{this.button.style.backgroundColor=this.color}),this.button.addEventListener("mouseleave",()=>{this.button.style.removeProperty("background-color")}),this.button}}window.shareWidget=ShareWidget;