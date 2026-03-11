import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import { useSettings } from "../SettingsContext";
import type { TSettings } from "../SettingTypes";

const SettingsDisplay = () => {
	const { settings, setSettings, resetSettings } = useSettings();
	const [tempSettings, setTempSettings] = useState<TSettings>({ ...settings });

	useEffect(() => {
		setTempSettings({ ...settings });
	}, [settings]);

	const handleSave = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setSettings({ ...tempSettings });
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
					<form onSubmit={handleSave} className="space-y-6">
						<div>
							<h3 className="text-2xl font-semibold mb-4 text-slate-800 border-b pb-2">
								Layout Settings
							</h3>
							<p className="text-sm text-slate-600 mb-6">
								Adjust the force-directed graph layout parameters
							</p>
						</div>

						<div className="space-y-4">
							<div>
								<label
									htmlFor="iterations"
									className="block text-sm font-medium text-slate-700 mb-2"
								>
									Iterations
									<span className="text-xs font-normal text-slate-500 ml-2">
										(Number of simulation steps)
									</span>
								</label>
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
									className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
								/>
							</div>

							<div>
								<label
									htmlFor="repulsion"
									className="block text-sm font-medium text-slate-700 mb-2"
								>
									Repulsion Force
									<span className="text-xs font-normal text-slate-500 ml-2">
										(Force between unconnected nodes)
									</span>
								</label>
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
									className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
								/>
							</div>

							<div>
								<label
									htmlFor="springLength"
									className="block text-sm font-medium text-slate-700 mb-2"
								>
									Spring Length
									<span className="text-xs font-normal text-slate-500 ml-2">
										(Ideal distance between connected nodes)
									</span>
								</label>
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
									className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
								/>
							</div>

							<div>
								<label
									htmlFor="springStrength"
									className="block text-sm font-medium text-slate-700 mb-2"
								>
									Spring Strength
									<span className="text-xs font-normal text-slate-500 ml-2">
										(Strength of connection forces)
									</span>
								</label>
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
									className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
								/>
							</div>

							<div>
								<label
									htmlFor="damping"
									className="block text-sm font-medium text-slate-700 mb-2"
								>
									Damping
									<span className="text-xs font-normal text-slate-500 ml-2">
										(Stabilization factor)
									</span>
								</label>
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
									className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
								/>
							</div>
						</div>

						<div className="flex gap-3 pt-6 border-t">
							<button
								type="submit"
								className="flex-1 px-6 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition shadow-sm hover:shadow-md cursor-pointer"
							>
								Save Changes
							</button>
							<button
								type="button"
								className="px-6 py-3 bg-slate-500 text-white font-medium rounded-lg hover:bg-slate-600 transition shadow-sm hover:shadow-md cursor-pointer"
								onClick={() => setTempSettings({ ...settings })}
							>
								Reset
							</button>
							<button
								type="button"
								className="px-6 py-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition shadow-sm hover:shadow-md cursor-pointer"
								onClick={resetSettings}
							>
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
