import { ShareButton } from "./shareButton";
import { ShareWidgetOptions, NetworkConfig, ShareData } from "../types/shareWidget";

export class ShareWidget {
	public button: { color: string };
	public header: { background: string; color: string; title: string };
	public networks: NetworkConfig[];
	private package = "{{package}}";
	private shareData: ShareData;
	private url = "{{url}}";
	private version = "{{version}}";
	private $widget!: HTMLElement;

	constructor({
		button = { color: "" },
		header = { background: "", color: "", title: "" },
		networks = []
	}: ShareWidgetOptions) {
		this.button = { color: button?.color || "" };
		this.header = {
			background: header?.background || "",
			color: header?.color || "",
			title: header?.title || ""
		};
		this.networks = networks;
		this.shareData = {
			title: document.title,
			url: window.location.href,
		};
		if (!this.networks.length) return;
		this.#setVariables();
		this.render();
	}

	get widget(): HTMLElement {
		return this.$widget;
	}

	set widget($element: HTMLElement) {
		this.$widget = $element;
	}

	#button(): DocumentFragment {
		const button = document.createRange().createContextualFragment(
			`<button class="sh-w_b" title="${this.header.title}">
			<span class="sh-w-i-share"></span>
		</button>`
		);
		return button;
	}

	async #click(): Promise<void> {
		const hasShare = "share" in navigator && typeof navigator.share === "function";
		if (window.dataLayer) {
			window.dataLayer.push({
				event: "ga_event",
				category: "Widget Share",
				action: "Click Share",
				label: `Click Icono${hasShare ? " mobile" : ""}`
			});
		}
		if (hasShare) {
			await navigator.share(this.shareData).then(() => {
				if (window.dataLayer) {
					window.dataLayer.push({
						event: "ga_event",
						category: "Widget Share",
						action: "Click Share",
						label: "mobile",
					});
				}
			});
		} else {
			this.widget.classList.toggle("open");
		}
	}

	#header(): DocumentFragment {
		return document.createRange().createContextualFragment(
			`<header class="sh-w_h">
			<span class="sh-w_h_t">${this.header.title}</span>
		</header>`
		);
	}

	#networks(): HTMLElement {
		const networksContainer = document.createElement("section");
		networksContainer.classList.add("sh-w_l");

		this.networks.forEach(network => {
			const button = new ShareButton(network).render();
			if (typeof button !== "string") {
				networksContainer.append(button);
			}
		});
		return networksContainer;
	}

	#setVariables(): string {
		return `:root {
			${(this.header.background.length) ? `--share-title-bg: ${this.header.background};` : ""}
			${(this.button.color.length) ? `--share-icon-color: ${this.button.color};` : ""}
		}`;
	}

	async #styles(): Promise<void> {
		const styles = document.createElement("style");
		await fetch(`${this.url}@${this.version}/dist/css/${this.package}.css`)
			.then(res => res.text())
			.then(style => {
				styles.append(this.#setVariables());
				styles.append(style);
			});
		document.head.append(styles);
	}

	async render(): Promise<HTMLElement> {
		await this.#styles();

		const isPDP = (document.querySelector("#js-AnchorGeneralTab") !== null) ? true : false;
		const widget = document.createElement("div");
		const widgetContainer = document.createElement("div");
		widget.classList.add("sh-w");
		widgetContainer.classList.add("sh-w_c");
		if (isPDP) widget.classList.add("pdp");
		if ("share" in navigator && typeof navigator.share === "function") widget.classList.add("native");
		widgetContainer.append(this.#header());
		widgetContainer.append(this.#networks());
		widget.append(this.#button());
		widget.append(widgetContainer);

		if (isPDP) {
			const gallery = document.querySelector(".js-gallery");
			if (gallery) {
				gallery.append(widget);
			}
		} else {
			document.body.append(widget);
		}

		//button click
		const button = widget.querySelector(".sh-w_b");
		if (button) {
			button.addEventListener("click", async (e: Event) => {
				e.preventDefault();
				await this.#click();
			});
		}

		return this.widget = widget;
	}
}
