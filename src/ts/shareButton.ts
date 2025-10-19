import { NetworkConfig, ShareData } from "../types/shareWidget";

export class ShareButton {
	private button: HTMLAnchorElement;
	private color: string;
	private icon: string;
	private name: string;
	private network: string;
	private shareData: ShareData;

	constructor({ color = "", name = "", network = "" }: NetworkConfig) {
		this.button = document.createElement("a");
		this.color = color;
		this.icon = network;
		this.name = name;
		this.network = network;
		this.shareData = {
			title: encodeURI(document.title),
			url: window.location.href,
		};
	}

	render(): HTMLAnchorElement | string {
		if (!this.name.length) return "";
		const iphone = /iPad|iPhone|iPod/.test(navigator.userAgent);
		const android = /Android/i.test(navigator.userAgent);

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
			if (window.dataLayer) {
				window.dataLayer.push({
					event: "ga_event",
					category: "Widget Share",
					action: "Click Share",
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
					url = `https://twitter.com/intent/tweet?text=${encodeURI(this.shareData.title)}&url=${this.shareData.url}`;
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
