import type { FormEvent } from "react";
import { useEffect, useRef, useState } from "react";
import ChatIcon from "@/Shared/Components/Icons/ChatIcon";
import CheckmarkIcon from "@/Shared/Components/Icons/CheckmarkIcon";
import ResetIcon from "@/Shared/Components/Icons/ResetIcon";
import WarningIcon from "@/Shared/Components/Icons/WarningIcon";
import SuccessMessage from "@/Shared/Components/SuccessMessage";
import { useSettings } from "../SettingsContext";
import type { TSettings } from "../SettingTypes";

const SettingsDisplay = () => {
	const { settings, setSettings, resetSettings } = useSettings();
	const [tempSettings, setTempSettings] = useState<TSettings>({ ...settings });
	const [successMessage, setSuccessMessage] = useState<string | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setTempSettings({ ...settings });
	}, [settings]);

	const scrollToTop = () => {
		containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
	};

	const showSuccessMessage = (message: string) => {
		setSuccessMessage(message);
		setTimeout(() => setSuccessMessage(null), 3000);
	};

	const handleSave = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setSettings({ ...tempSettings });
		showSuccessMessage("Settings saved successfully!");
		scrollToTop();
	};

	return (
		<div
			ref={containerRef}
			className="flex flex-col flex-1 overflow-y-auto w-full bg-gradient-to-br from-slate-50 to-slate-100 p-8"
		>
			<div className="flex flex-col max-w-2xl mx-auto w-full">
				<div className=" flex flex-col text-center mb-8">
					<h2 className="text-4xl font-bold mb-2 text-slate-800">Settings</h2>
					<p className="text-slate-600">
						Configure your StructSphere visualization preferences
					</p>
				</div>

				<div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 flex-1 flex flex-col ">
					<SuccessMessage message={successMessage} />

					<form onSubmit={handleSave} className="space-y-6">
						{/* AI Settings Section */}
						<div className="mb-8">
							<div className="flex items-center gap-3 mb-2">
								<div className="size-10 text-white p-2 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center shadow-md">
									<ChatIcon />
								</div>
								<div>
									<h3 className="text-2xl font-semibold text-slate-800">
										AI Assistant Settings
									</h3>
									<p className="text-sm text-slate-600">
										Configure Gemini API for the AI chat assistant
									</p>
								</div>
							</div>
							<div className="border-b border-slate-200 mb-4" />

							<div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
								<label
									htmlFor="geminiApiKey"
									className="block text-sm font-semibold text-slate-700 mb-1"
								>
									Gemini API Key
								</label>
								<p className="text-xs text-slate-500 mb-3">
									Get your API key from{" "}
									<a
										href="https://aistudio.google.com/apikey"
										target="_blank"
										rel="noopener noreferrer"
										className="text-blue-600 hover:underline"
									>
										Google AI Studio
									</a>
								</p>
								<input
									type="password"
									id="geminiApiKey"
									value={tempSettings.chat?.geminiApiKey || ""}
									onChange={(e) =>
										setTempSettings({
											...tempSettings,
											chat: {
												...tempSettings.chat,
												geminiApiKey: e.target.value,
											},
										})
									}
									placeholder="Enter your Gemini API key"
									className="w-full border-2 border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition bg-white font-mono text-sm text-slate-800"
								/>
								<p className="text-xs text-slate-500 mt-2">
									Your API key is stored locally and never sent to any server
									except Google's Gemini API
								</p>
							</div>

							<div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
								<label
									htmlFor="maxIterations"
									className="block text-sm font-semibold text-slate-700 mb-1"
								>
									Max Function Call Iterations
								</label>
								<p className="text-xs text-slate-500 mb-3">
									Maximum number of function calling loops (default: 5)
								</p>
								<input
									type="number"
									id="maxIterations"
									min="1"
									max="20"
									value={tempSettings.chat?.maxIterations || 5}
									onChange={(e) =>
										setTempSettings({
											...tempSettings,
											chat: {
												...tempSettings.chat,
												maxIterations: parseInt(e.target.value, 10),
											},
										})
									}
									className="w-full border-2 border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition bg-white font-medium text-slate-800"
								/>
								<p className="text-xs text-slate-500 mt-2">
									Controls how many times the AI can call functions before
									returning a response
								</p>
							</div>

							<div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
								<label
									htmlFor="model"
									className="block text-sm font-semibold text-slate-700 mb-1"
								>
									AI Model
								</label>
								<p className="text-xs text-slate-500 mb-3">
									Specify the Gemini model to use (e.g., gemini-3-flash-preview,
									gemini-3.1-flash-lite-preview)
								</p>
								<input
									type="text"
									id="model"
									value={tempSettings.chat?.model || "gemini-3-flash-preview"}
									onChange={(e) =>
										setTempSettings({
											...tempSettings,
											chat: {
												...tempSettings.chat,
												model: e.target.value,
											},
										})
									}
									placeholder="gemini-3-flash-preview"
									className="w-full border-2 border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition bg-white font-mono text-sm text-slate-800"
								/>
								<p className="text-xs text-slate-500 mt-2">
									Choose a model that supports function calling for best results
								</p>
							</div>
						</div>
						<div>
							<h3 className="text-2xl font-semibold text-slate-800">
								Layout Settings
							</h3>
							<p className="text-sm text-slate-600">
								Adjust node dimensions and spacing for the diagram layout
							</p>
						</div>
						<div className="border-b border-slate-200" />

						<div className="grid md:grid-cols-2 gap-6">
							<div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
								<label
									htmlFor="nodeWidth"
									className="block text-sm font-semibold text-slate-700 mb-1"
								>
									Node Width
								</label>
								<p className="text-xs text-slate-500 mb-3">
									Width of each node in pixels (default: 150)
								</p>
								<input
									type="number"
									id="nodeWidth"
									min="80"
									max="400"
									value={tempSettings.layout.nodeWidth ?? 150}
									onChange={(e) =>
										setTempSettings({
											...tempSettings,
											layout: {
												...tempSettings.layout,
												nodeWidth: parseInt(e.target.value, 10),
											},
										})
									}
									className="w-full border-2 border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white font-medium text-slate-800"
								/>
							</div>
							<div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
								<label
									htmlFor="nodeHeight"
									className="block text-sm font-semibold text-slate-700 mb-1"
								>
									Node Height
								</label>
								<p className="text-xs text-slate-500 mb-3">
									Height of each node in pixels (default: 100)
								</p>
								<input
									type="number"
									id="nodeHeight"
									min="50"
									max="300"
									value={tempSettings.layout.nodeHeight ?? 100}
									onChange={(e) =>
										setTempSettings({
											...tempSettings,
											layout: {
												...tempSettings.layout,
												nodeHeight: parseInt(e.target.value, 10),
											},
										})
									}
									className="w-full border-2 border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white font-medium text-slate-800"
								/>
							</div>
							<div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
								<label
									htmlFor="horizontalGap"
									className="block text-sm font-semibold text-slate-700 mb-1"
								>
									Horizontal Gap
								</label>
								<p className="text-xs text-slate-500 mb-3">
									Gap between node columns in pixels (default: 80)
								</p>
								<input
									type="number"
									id="horizontalGap"
									min="20"
									max="400"
									value={tempSettings.layout.horizontalGap ?? 80}
									onChange={(e) =>
										setTempSettings({
											...tempSettings,
											layout: {
												...tempSettings.layout,
												horizontalGap: parseInt(e.target.value, 10),
											},
										})
									}
									className="w-full border-2 border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white font-medium text-slate-800"
								/>
							</div>
							<div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
								<label
									htmlFor="verticalGap"
									className="block text-sm font-semibold text-slate-700 mb-1"
								>
									Vertical Gap
								</label>
								<p className="text-xs text-slate-500 mb-3">
									Gap between nodes in the same column in pixels (default: 40)
								</p>
								<input
									type="number"
									id="verticalGap"
									min="10"
									max="200"
									value={tempSettings.layout.verticalGap ?? 40}
									onChange={(e) =>
										setTempSettings({
											...tempSettings,
											layout: {
												...tempSettings.layout,
												verticalGap: parseInt(e.target.value, 10),
											},
										})
									}
									className="w-full border-2 border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white font-medium text-slate-800"
								/>
							</div>
							<div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
								<label
									htmlFor="labelCollisionThreshold"
									className="block text-sm font-semibold text-slate-700 mb-1"
								>
									Label Collision Threshold
								</label>
								<p className="text-xs text-slate-500 mb-3">
									Minimum distance between edge labels (default: 80)
								</p>
								<input
									type="number"
									id="labelCollisionThreshold"
									min="0"
									value={tempSettings.layout.labelCollisionThreshold ?? 80}
									onChange={(e) =>
										setTempSettings({
											...tempSettings,
											layout: {
												...tempSettings.layout,
												labelCollisionThreshold: parseInt(e.target.value, 10),
											},
										})
									}
									className="w-full border-2 border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white font-medium text-slate-800"
								/>
							</div>
							<div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
								<label
									htmlFor="arrowSize"
									className="block text-sm font-semibold text-slate-700 mb-1"
								>
									Arrow Size
								</label>
								<p className="text-xs text-slate-500 mb-3">
									Size of relationship arrowheads in pixels (default: 12)
								</p>
								<input
									type="number"
									id="arrowSize"
									min="4"
									max="32"
									value={tempSettings.layout.arrowSize ?? 12}
									onChange={(e) =>
										setTempSettings({
											...tempSettings,
											layout: {
												...tempSettings.layout,
												arrowSize: parseInt(e.target.value, 10),
											},
										})
									}
									className="w-full border-2 border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white font-medium text-slate-800"
								/>
							</div>{" "}
						</div>

						<div className="flex items-center justify-center flex-wrap gap-3 pt-6 border-t border-slate-200">
							<button
								type="submit"
								className="flex-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-600 transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
							>
								<div className="h-6 w-6">
									<CheckmarkIcon />
								</div>
								Save Changes
							</button>
							<button
								type="button"
								className="flex-1 px-6 py-3 bg-slate-500 text-white font-semibold rounded-lg hover:bg-slate-600 transition shadow-md hover:shadow-lg flex items-center justify-center gap-2"
								onClick={() => {
									setTempSettings({ ...settings });
									showSuccessMessage("Settings reset to current values!");
									scrollToTop();
								}}
							>
								<div className="h-6 w-6">
									<ResetIcon />
								</div>
								Reset
							</button>
							<button
								type="button"
								className="flex-1 px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition shadow-md hover:shadow-lg flex items-center justify-center gap-2"
								onClick={() => {
									resetSettings();
									showSuccessMessage("Settings reset to defaults!");
									scrollToTop();
								}}
							>
								<div className="h-6 w-6">
									<WarningIcon />
								</div>
								Defaults
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SettingsDisplay;
