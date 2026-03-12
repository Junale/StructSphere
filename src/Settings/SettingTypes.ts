export type TLayoutSettings = {
	nodeWidth: number;
	nodeHeight: number;
	horizontalGap: number;
	verticalGap: number;
	labelCollisionThreshold: number;
	arrowSize: number;
};

export type TChatSettings = {
	geminiApiKey: string;
	maxIterations: number;
	model: string;
};

export type TSettings = {
	layout: TLayoutSettings;
	chat: TChatSettings;
};
