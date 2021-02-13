"use strict";
class ShareWidget {
	constructor({
		backgroundTitle = "",
		buttons = [],
		colorIcon = "",
		colorTitle = "",
		title = "Comparte en"
	}) {
		this.backgroundTitle = backgroundTitle,
		this.buttons = buttons,
		this.colorIcon = colorIcon,
		this.colorTitle = colorTitle,
		this.title = title;
		this.widget = document.createElement("div");
		this.shareData = {
			title: document.getElementsByTagName("title")[0].innerHTML,
			url: window.location.href,
		};
		this._setVariables();
		this.render();
	}

	_button() {
		const button = document.createElement("button");
		const buttonIcon = document.createElement("span");
		button.classList.add("sh-w_b");
		buttonIcon.classList.add("sh-w-i-share");
		button.append(buttonIcon);
		button.title = this.title;
		button.addEventListener("click", async e => {
			e.preventDefault();
			if ("dataLayer" in window) {
				// eslint-disable-next-line no-undef
				dataLayer.push({
					event: "ga_event",
					category: "Widget WhatsApp",
					action: "Click WhatsApp",
					label: "Click Icono"
				});
			}
			if (navigator.share)
				await navigator.share(this.shareData);
			else
				this.widget.classList.toggle("open");
		});

		return button;
	}
	_header() {
		const header = document.createElement("header");
		const title = document.createElement("span");
		header.classList.add("sh-w_h");
		title.classList.add("sh-w_h_t");
		title.innerHTML = this.title;
		header.append(title);
		return header;
	}
	async _styles() {
		return await fetch("./dist/css/share-widget.css").then(res => res.text()).then(style => `<style>${style}</style>`);
	}
	_setVariables() {
		if (this.backgroundTitle.length)
			document.documentElement.style.setProperty("--share-title-bg", this.backgroundTitle);
		if (this.colorIcon.length)
			document.documentElement.style.setProperty("--share-icon-color", this.colorIcon);
		if (this.colorTitle.length)
			document.documentElement.style.setProperty("--share-title-color", this.colorTitle);
	}
	async render() {
		if (!this.buttons.length) return;

		const buttonsContainer = document.createElement("section");
		buttonsContainer.classList.add("sh-w_l");

		this.buttons.forEach(button => buttonsContainer.append(new ShareButton(button).render()));

		this.widget.classList.add("sh-w");
		this.widget.append(this._header());
		this.widget.append(buttonsContainer);
		this.widget.append(this._button());

		document.body.insertAdjacentHTML("beforeend", `${await this._styles()}`);
		document.body.append(this.widget);
	}
}

class ShareButton {
	constructor({
		color = "",
		name = "",
		network = ""
	}) {
		this.button = document.createElement("a"),
		this.color = color,
		this.icon = network,
		this.name = name;
		this.network = network,
		this.shareData = {
			title: document.title,
			url: window.location.href,
		};
	}
	render() {
		if (!this.name.length) return "";
		const iphone = /iPad|iPhone|iPod/.test(navigator.userAgent),
		android = /Android/i.test(navigator.userAgent);

		this.button.classList.add("sh-w_l_b");
		this.button.title = `Compartir por ${this.name}`;
		this.button.style.color = this.color;
		this.button.style.borderColor = this.color;

		const networkIcon = document.createElement("span");
		networkIcon.classList.add("sh-w_l_b_i");
		networkIcon.classList.add(`sh-w-i-${this.icon}`);

		const externalIcon = document.createElement("span");
		externalIcon.classList.add("sh-w_l_b_i");
		externalIcon.classList.add("sh-w-i-external");

		const title = document.createElement("span");
		title.classList.add("sh-w_l_b_t");
		title.innerHTML = this.name;

		this.button.append(networkIcon);
		this.button.append(title);
		this.button.append(externalIcon);

		this.button.addEventListener("click", () => {
			let url = "";
			if ("dataLayer" in window) {
				// eslint-disable-next-line no-undef
				dataLayer.push({
					event: "ga_event",
					category: "Widget Share",
					action: `Click ${this.name}`,
					label: this.network,
				});
			}

			switch (this.network) {
				case "email":
					url = `mailto:?to=&subject=${this.shareData.title}&body=${this.shareData.url}`;
					break;
				case "facebook":
					url = `https://www.facebook.com/sharer.php?display=popup&u=${this.shareData.url}&quote=${this.shareData.title}`;
					break;
				case "twitter":
					url = `https://twitter.com/intent/tweet?text=${this.shareData.title}&url=${this.shareData.url}`;
					break;
				case "whatsapp":
					url = ((iphone || android) ? "whatsapp://send?" : "https://web.whatsapp.com/send?") + `text=${this.shareData.title} ${this.shareData.url}`;
					break;
			}
			window.open(
				url,
				"shareWidget",
				"width=600,height=400,location=0,menubar=0"
			);
		});
		this.button.addEventListener("mouseenter", () => {
			this.button.style.backgroundColor = this.color;
		});
		this.button.addEventListener("mouseleave", () => {
			this.button.style.removeProperty("background-color");
		});

		return this.button;
	}
}

window.shareWidget = ShareWidget;