import { ShareWidget } from "../ts/shareWidget";

declare global {
	interface Window {
		dataLayer?: object[];
		shareWidget: typeof ShareWidget;
	}
}

export {};
