export interface ShareWidgetOptions {
	button?: {
		color?: string;
	};
	header?: {
		background?: string;
		color?: string;
		title?: string;
	};
	networks?: NetworkConfig[];
}

export interface NetworkConfig {
	color?: string;
	name?: string;
	network?: string;
}

export interface ShareData {
	title: string;
	url: string;
}
