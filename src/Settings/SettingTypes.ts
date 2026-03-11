export type TLayoutSettings = {
	iterations?: number;
	repulsion?: number;
	springLength?: number;
	springStrength?: number;
	damping?: number;
};

export type TSettings = {
	layout: TLayoutSettings;
};
