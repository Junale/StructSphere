import type { FormEvent } from "react";
import { useDiagrams } from "@/Diagram/DiagramsContext";
import { useEntities } from "@/Entity/EntityContext";
import { useNodes } from "@/Node/NodesContext";
import { useRelationships } from "@/Relationship/RelationshipsContext";
import { useSettings } from "@/Settings/SettingsContext";

const ImportExportDisplay = () => {
	const { entities, setEntities } = useEntities();
	const { diagrams, setDiagrams } = useDiagrams();
	const { relationships, setRelationships } = useRelationships();
	const { nodes, setNodes } = useNodes();
	const { settings, setSettings } = useSettings();

	const handleImport = (event: FormEvent<HTMLFormElement>) => {
		const fileInput = event.currentTarget.parentElement?.querySelector(
			"input[type='file']",
		) as HTMLInputElement | null;
		if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
			alert("Please select a JSON file to import.");
			return;
		}

		const reader = new FileReader();
		reader.onload = (e: ProgressEvent<FileReader>) => {
			try {
				const content = e.target?.result as string;
				const data = JSON.parse(content);
				if (data.entities && typeof data.entities === "object") {
					setEntities(data.entities);
				} else {
					alert(
						"Invalid file format: 'entities' field is missing or not an object.",
					);
				}
				if (data.diagrams && typeof data.diagrams === "object") {
					setDiagrams(data.diagrams);
				} else {
					alert(
						"Invalid file format: 'diagrams' field is missing or not an object.",
					);
				}
				if (data.relationships && typeof data.relationships === "object") {
					setRelationships(data.relationships);
				} else {
					alert(
						"Invalid file format: 'relationships' field is missing or not an object.",
					);
				}
				if (data.nodes && typeof data.nodes === "object") {
					setNodes(data.nodes);
				} else {
					alert(
						"Invalid file format: 'nodes' field is missing or not an object.",
					);
				}
				if (data.settings && typeof data.settings === "object") {
					setSettings(data.settings);
				} else {
					alert(
						"Invalid file format: 'settings' field is missing or not an object.",
					);
				}
			} catch (error) {
				console.error("Error parsing JSON file:", error);
				alert(
					"An error occurred while parsing the JSON file. Please try again.",
				);
			}
		};
		reader.onerror = (e) => {
			console.error("Error reading file:", e);
			alert("An error occurred while reading the file. Please try again.");
		};
		reader.readAsText(fileInput.files[0]);
	};

	const handleExport = () => {
		const data = {
			entities,
			diagrams,
			nodes,
			relationships,
			settings,
		};
		const json = JSON.stringify(data, null, 2);
		const blob = new Blob([json], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = "structsphere-data.json";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
	};

	return (
		<div className="flex flex-col flex-1 w-full overflow-y-auto bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8">
			<div className="max-w-5xl mx-auto w-full">
				<div className="text-center mb-10">
					<h2 className="text-4xl font-bold mb-3 text-slate-800">
						Import & Export
					</h2>
					<p className="text-lg text-slate-600">
						Manage your StructSphere data with JSON file import and export
					</p>
				</div>

				<div className="grid md:grid-cols-2 gap-8">
					{/* Import Section */}
					<div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 hover:shadow-xl transition-shadow">
						<div className="flex items-center mb-6">
							<div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mr-4 shadow-md">
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
										d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
									/>
								</svg>
							</div>
							<div>
								<h3 className="text-2xl font-bold text-slate-800">Import</h3>
								<p className="text-sm text-slate-500">Upload your data</p>
							</div>
						</div>

						<form onSubmit={handleImport} className="space-y-6">
							<div>
								<p className="text-slate-600 mb-6 leading-relaxed">
									Import your entities, diagrams, nodes, relationships, and
									settings from a JSON file to restore or merge data.
								</p>

								<div className="mb-6">
									<label
										htmlFor="import-file"
										className="block text-sm font-medium text-slate-700 mb-3"
									>
										Choose JSON File
									</label>
									<input
										id="import-file"
										type="file"
										accept=".json"
										className="block w-full text-sm text-slate-500
											file:mr-4 file:py-3 file:px-6
											file:rounded-lg file:border-0
											file:text-sm file:font-semibold
											file:bg-green-50 file:text-green-700
											hover:file:bg-green-100
											file:cursor-pointer cursor-pointer
											border border-slate-300 rounded-lg
											focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500
											transition"
									/>
								</div>

								<button
									type="submit"
									className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-600 transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
								>
									Import Data
								</button>
							</div>
						</form>
					</div>

					{/* Export Section */}
					<div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 hover:shadow-xl transition-shadow">
						<div className="flex items-center mb-6">
							<div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center mr-4 shadow-md">
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
										d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
									/>
								</svg>
							</div>
							<div>
								<h3 className="text-2xl font-bold text-slate-800">Export</h3>
								<p className="text-sm text-slate-500">Download your data</p>
							</div>
						</div>

						<div className="space-y-6">
							<p className="text-slate-600 leading-relaxed">
								Export all your current data including entities, diagrams,
								nodes, relationships, and settings to a JSON file for backup or
								sharing.
							</p>

							<div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
								<h4 className="text-sm font-semibold text-slate-700 mb-2">
									Export includes:
								</h4>
								<ul className="space-y-1.5 text-sm text-slate-600">
									<li className="flex items-center">
										<span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
										All entities
									</li>
									<li className="flex items-center">
										<span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
										All diagrams
									</li>
									<li className="flex items-center">
										<span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
										All nodes
									</li>
									<li className="flex items-center">
										<span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
										All relationships
									</li>
									<li className="flex items-center">
										<span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
										Current settings
									</li>
								</ul>
							</div>

							<button
								type="button"
								className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-indigo-600 transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
								onClick={handleExport}
							>
								Export Data
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ImportExportDisplay;
