import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import { useSettings } from "../SettingsContext";
import type { TSettings } from "../SettingTypes";

const SettingsDisplay = () => {
	const { settings, setSettings, resetSettings } = useSettings();
	const [tempSettings, setTempSettings] = useState<TSettings>({ ...settings });
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);

	useEffect(() => {
		setTempSettings({ ...settings });
	}, [settings]);

	const handleSave = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setSettings({ ...tempSettings });
		setShowSuccessMessage(true);
		setTimeout(() => setShowSuccessMessage(false), 3000);
	};

	return (
		<div className="flex flex-col flex-1 overflow-y-auto w-full bg-gradient-to-br from-slate-50 to-slate-100 p-8">
			<div className="flex flex-col max-w-2xl mx-auto w-full">
				<div className=" flex flex-col text-center mb-8">
					<h2 className="text-4xl font-bold mb-2 text-slate-800">Settings</h2>
					<p className="text-slate-600">
						Configure your StructSphere visualization preferences
					</p>
				</div>

				<div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 flex-1 flex flex-col ">
					{showSuccessMessage && (
						<div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3 animate-fade-in">
							<svg
								className="w-6 h-6 text-green-500 flex-shrink-0"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							<span className="text-green-700 font-medium">
								Settings saved successfully!
							</span>
						</div>
					)}

					<form onSubmit={handleSave} className="space-y-6">
						{/* AI Settings Section */}
						<div className="mb-8">
							<div className="flex items-center gap-3 mb-2">
								<div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center shadow-md">
									<svg
										className="w-6 h-6 text-white"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										aria-hidden="true"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
										/>
									</svg>
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

							<svg
								className="w-6 h-6 text-white"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
								/>
							</svg>
						</div>
						<div>
							<h3 className="text-2xl font-semibold text-slate-800">
								Layout Settings
							</h3>
							<p className="text-sm text-slate-600">
								Adjust the force-directed graph layout parameters
							</p>
						</div>
						<div className="border-b border-slate-200" />

						<div className="grid md:grid-cols-2 gap-6">
							<div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
								<label
									htmlFor="iterations"
									className="block text-sm font-semibold text-slate-700 mb-1"
								>
									Iterations
								</label>
								<p className="text-xs text-slate-500 mb-3">
									Number of simulation steps
								</p>
								<input
									type="number"
									id="iterations"
									value={tempSettings.layout.iterations}
									onChange={(e) =>
										setTempSettings({
											...tempSettings,
											layout: {
												...tempSettings.layout,
												iterations: parseInt(e.target.value, 10),
											},
										})
									}
									className="w-full border-2 border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white font-medium text-slate-800"
								/>
							</div>
							<div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
								<label
									htmlFor="repulsion"
									className="block text-sm font-semibold text-slate-700 mb-1"
								>
									Repulsion Force
								</label>
								<p className="text-xs text-slate-500 mb-3">
									Force between unconnected nodes
								</p>
								<input
									type="number"
									id="repulsion"
									value={tempSettings.layout.repulsion}
									onChange={(e) =>
										setTempSettings({
											...tempSettings,
											layout: {
												...tempSettings.layout,
												repulsion: parseInt(e.target.value, 10),
											},
										})
									}
									className="w-full border-2 border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white font-medium text-slate-800"
								/>
							</div>
							<div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
								<label
									htmlFor="springLength"
									className="block text-sm font-semibold text-slate-700 mb-1"
								>
									Spring Length
								</label>
								<p className="text-xs text-slate-500 mb-3">
									Ideal distance between connected nodes
								</p>
								<input
									type="number"
									id="springLength"
									value={tempSettings.layout.springLength}
									onChange={(e) =>
										setTempSettings({
											...tempSettings,
											layout: {
												...tempSettings.layout,
												springLength: parseInt(e.target.value, 10),
											},
										})
									}
									className="w-full border-2 border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white font-medium text-slate-800"
								/>
							</div>
							<div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
								<label
									htmlFor="springStrength"
									className="block text-sm font-semibold text-slate-700 mb-1"
								>
									Spring Strength
								</label>
								<p className="text-xs text-slate-500 mb-3">
									Strength of connection forces
								</p>
								<input
									type="number"
									id="springStrength"
									step="0.01"
									value={tempSettings.layout.springStrength}
									onChange={(e) =>
										setTempSettings({
											...tempSettings,
											layout: {
												...tempSettings.layout,
												springStrength: parseFloat(e.target.value),
											},
										})
									}
									className="w-full border-2 border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white font-medium text-slate-800"
								/>
							</div>
							<div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
								<label
									htmlFor="damping"
									className="block text-sm font-semibold text-slate-700 mb-1"
								>
									Damping
								</label>
								<p className="text-xs text-slate-500 mb-3">
									Stabilization factor
								</p>
								<input
									type="number"
									id="damping"
									step="0.01"
									value={tempSettings.layout.damping}
									onChange={(e) =>
										setTempSettings({
											...tempSettings,
											layout: {
												...tempSettings.layout,
												damping: parseFloat(e.target.value),
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
									Minimum distance between edge labels
								</p>
								<input
									type="number"
									id="labelCollisionThreshold"
									value={tempSettings.layout.labelCollisionThreshold}
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
							</div>{" "}
						</div>

						<div className="flex flex-wrap gap-3 pt-6 border-t border-slate-200">
							<button
								type="submit"
								className="flex-1 min-w-[200px] px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-600 transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
							>
								<svg
									className="w-5 h-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M5 13l4 4L19 7"
									/>
								</svg>
								Save Changes
							</button>
							<button
								type="button"
								className="px-6 py-3 bg-slate-500 text-white font-semibold rounded-lg hover:bg-slate-600 transition shadow-md hover:shadow-lg flex items-center justify-center gap-2"
								onClick={() => setTempSettings({ ...settings })}
							>
								<svg
									className="w-5 h-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
									/>
								</svg>
								Reset
							</button>
							<button
								type="button"
								className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition shadow-md hover:shadow-lg flex items-center justify-center gap-2"
								onClick={resetSettings}
							>
								<svg
									className="w-5 h-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
									/>
								</svg>
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
