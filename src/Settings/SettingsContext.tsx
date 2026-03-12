import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import type { TSettings } from "./SettingTypes";

type SettingsContextType = {
	settings: TSettings;

	setSettings: React.Dispatch<React.SetStateAction<TSettings>>;
	resetSettings: () => void;
};

const SettingsContext = createContext<SettingsContextType | null>(null);

const STORAGE_KEY = "structsphere-settings";

const defaultSettings: TSettings = {
	layout: {
		nodeWidth: 150,
		nodeHeight: 100,
		horizontalGap: 80,
		verticalGap: 40,
		labelCollisionThreshold: 80,
		arrowSize: 12,
	},
	chat: {
		geminiApiKey: "",
		maxIterations: 20,
		model: "gemini-3.1-flash-lite-preview",
	},
};

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [settings, setSettings] = useState<TSettings>(() => {
		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			return stored ? JSON.parse(stored) : defaultSettings;
		} catch {
			return defaultSettings;
		}
	});

	useEffect(() => {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
		} catch (error) {
			console.error("Failed to save settings to localStorage:", error);
		}
	}, [settings]);

	const resetSettings = () => {
		setSettings(defaultSettings);
	};

	return (
		<SettingsContext.Provider
			value={{
				settings,
				setSettings,
				resetSettings,
			}}
		>
			{children}
		</SettingsContext.Provider>
	);
};

export const useSettings = () => {
	const ctx = useContext(SettingsContext);
	if (!ctx) throw new Error("useSettings must be used inside SettingsProvider");
	return ctx;
};
