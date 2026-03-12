export type TLayoutSettings = {
	iterations?: number;
	repulsion?: number;
	springLength?: number;
	springStrength?: number;
	damping?: number;
	labelCollisionThreshold?: number;
};

export type TChatSettings = {
	geminiApiKey?: string;
	maxIterations?: number;
	model?: string;
};

export type TSettings = {
	layout: TLayoutSettings;
	chat: TChatSettings;
};
