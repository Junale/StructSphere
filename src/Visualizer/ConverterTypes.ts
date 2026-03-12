export type TConversionStatus = "idle" | "converting" | "success" | "error";

export type TConversionResult = {
	status: TConversionStatus;
	message?: string;
	downloadUrl?: string;
};
