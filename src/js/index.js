"use strict";
class ShareWidget {
	constructor({
		button = {
			color: ""
		},
		header = {
			background: "",
			color     : "",
			title     : ""
		},
		networks = []
	}) {
		this.button = button,
		this.header = header,
		this.networks = networks,
		this.package = "{{package}}",
		this.shareData = {
			title: encodeURI(document.title),
			url: window.location.href,
		},
		this.url = "{{url}}",
		this.version = "{{version}}",
		this.$widget;
		if (!this.networks.length) return;
		this._setVariables();
		this.render();
	}
	_button() {
		const button = document.createRange().createContextualFragment(
			`<button class="sh-w_b" title="${this.header.title}">
			<span class="sh-w-i-share"></span>
		</button>`);
		return button;
	}
	async _click() {
		if ("dataLayer" in window) {
			// eslint-disable-next-line no-undef
			dataLayer.push({
				event: "ga_event",
				category: "Widget Share",
				action: `Click Share ${(navigator.share) ? "mobile" : ""}`,
				label: "Click Icono"
			});
		}
		(navigator.share) ?
			// eslint-disable-next-line no-undef
			await navigator.share(this.shareData).then(() => dataLayer.push({
				event: "ga_event",
				category: "Widget Share",
				action: "Share mobile",
				label: "mobile",
			})) :
			this.widget.classList.toggle("open");

	}
	_header() {
		return document.createRange().createContextualFragment(
			`<header class="sh-w_h">
			<span class="sh-w_h_t">${this.header.title}</span>
		</header>`);
	}
	_networks() {
		const networksContainer = document.createElement("section");
		networksContainer.classList.add("sh-w_l");

		this.networks.forEach(network =>
			networksContainer.append(new ShareButton(network).render())
		);
		return networksContainer;
	}
	_setVariables() {
		return `:root {
			${(this.header.background.length) ? `--share-title-bg: ${this.header.background};` : ""}
			${(this.button.color.length) ? `--share-icon-color: ${this.button.color};` : ""}
		}`;
	}
	async _styles() {
		const styles = document.createElement("style");
		await fetch(`${this.url}@${this.version}/dist/css/${this.package}.css`)
			.then(res => res.text())
			.then(style => {
				styles.append(this._setVariables());
				styles.append(style);
			});
		return document.head.append(styles);
	}
	async render() {
		await this._styles();

		const widget = document.createElement("div");
		widget.classList.add("sh-w");
		widget.append(this._header());
		widget.append(this._networks());
		widget.append(this._button());

		document.body.append(widget);

		//button click
		widget.querySelector(".sh-w_b").addEventListener("click", async e => {
			e.preventDefault();
			this._click();
		});

		return this.widget = widget;
	}
	get widget() {
		return this.$widget;
	}
	set widget($element) {
		this.$widget = $element;
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
			title: encodeURI(document.title),
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

		this.button.addEventListener("click", e => {
			e.preventDefault();
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