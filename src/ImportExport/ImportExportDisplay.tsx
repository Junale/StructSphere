import type { FormEvent } from "react";
import { useRef, useState } from "react";
import { useChat } from "@/Chat/ChatContext";
import { useDiagrams } from "@/Diagram/DiagramsContext";
import { useEntities } from "@/Entity/EntityContext";
import { useNodes } from "@/Node/NodesContext";
import { useRelationships } from "@/Relationship/RelationshipsContext";
import { useSettings } from "@/Settings/SettingsContext";
import ExportIcon from "@/Shared/Components/Icons/ExportIcon";
import ImportIcon from "@/Shared/Components/Icons/ImportIcon";
import WarningIcon from "@/Shared/Components/Icons/WarningIcon";
import SuccessMessage from "@/Shared/Components/SuccessMessage";
import ImportExportOptionList from "./ImportExportOptionList";

const ImportExportDisplay = () => {
	const { entities, setEntities } = useEntities();
	const { diagrams, setDiagrams } = useDiagrams();
	const { relationships, setRelationships } = useRelationships();
	const { nodes, setNodes } = useNodes();
	const { settings, setSettings } = useSettings();
	const { sessions, setSessions } = useChat();
	const containerRef = useRef<HTMLDivElement>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);

	const scrollToTop = () => {
		containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
	};

	const showSuccessMessage = (message: string) => {
		setSuccessMessage(message);
		setTimeout(() => setSuccessMessage(null), 3000);
	};

	const getOptions = (event: FormEvent<HTMLFormElement>, prefix: string) => {
		const options = {
			entities: false,
			diagrams: false,
			relationships: false,
			nodes: false,
			settings: false,
			sessions: false,
		};
		event.currentTarget
			.querySelectorAll("input[type='checkbox']")
			.forEach((checkbox) => {
				const id = checkbox.id.replace(prefix, "");
				const checked = (checkbox as HTMLInputElement).checked;
				if (id in options) {
					options[id as keyof typeof options] = checked;
				}
			});

		return options;
	};

	const handleImport = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const fileInput = event.currentTarget.querySelector(
			"input[type='file']",
		) as HTMLInputElement | null;
		if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
			alert("Please select a JSON file to import.");
			return;
		}
		const options = getOptions(event, "import-");
		const importTechnique = event.currentTarget.querySelector(
			"input[name='import-technique']:checked",
		) as HTMLInputElement | null;
		if (!importTechnique) {
			alert("Please select an import technique.");
			return;
		}
		const reader = new FileReader();
		reader.onload = (e: ProgressEvent<FileReader>) => {
			try {
				const content = e.target?.result as string;
				const data = JSON.parse(content);
				if (
					data.entities &&
					typeof data.entities === "object" &&
					options.entities
				) {
					if (importTechnique.value === "merge") {
						setEntities((prev) => ({ ...prev, ...data.entities }));
					} else {
						setEntities(data.entities);
					}
				}
				if (
					data.diagrams &&
					typeof data.diagrams === "object" &&
					options.diagrams
				) {
					if (importTechnique.value === "merge") {
						setDiagrams((prev) => ({ ...prev, ...data.diagrams }));
					} else {
						setDiagrams(data.diagrams);
					}
				}
				if (
					data.relationships &&
					typeof data.relationships === "object" &&
					options.relationships
				) {
					if (importTechnique.value === "merge") {
						setRelationships((prev) => ({ ...prev, ...data.relationships }));
					} else {
						setRelationships(data.relationships);
					}
				}
				if (data.nodes && typeof data.nodes === "object" && options.nodes) {
					if (importTechnique.value === "merge") {
						setNodes((prev) => ({ ...prev, ...data.nodes }));
					} else {
						setNodes(data.nodes);
					}
				}
				if (
					data.settings &&
					typeof data.settings === "object" &&
					options.settings
				) {
					if (importTechnique.value === "merge") {
						setSettings((prev) => ({ ...prev, ...data.settings }));
					} else {
						setSettings(data.settings);
					}
				}
				if (
					data.sessions &&
					typeof data.sessions === "object" &&
					options.sessions
				) {
					if (importTechnique.value === "merge") {
						setSessions((prev) => ({ ...prev, ...data.sessions }));
					} else {
						setSessions(data.sessions);
					}
				}
			} catch (error) {
				console.error("Error parsing JSON file:", error);
				alert(
					"An error occurred while parsing the JSON file. Please try again.",
				);
			}
			showSuccessMessage("Data imported successfully!");
			scrollToTop();
		};
		reader.onerror = (e) => {
			console.error("Error reading file:", e);
			alert("An error occurred while reading the file. Please try again.");
		};
		reader.readAsText(fileInput.files[0]);
	};

	const handleExport = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const options = getOptions(event, "export-");
		const data = {
			entities: options.entities ? entities : undefined,
			diagrams: options.diagrams ? diagrams : undefined,
			nodes: options.nodes ? nodes : undefined,
			relationships: options.relationships ? relationships : undefined,
			settings: options.settings ? settings : undefined,
			sessions: options.sessions ? sessions : undefined,
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
		showSuccessMessage("Data exported successfully!");
		scrollToTop();
	};

	return (
		<div
			ref={containerRef}
			className="flex flex-col flex-1 w-full overflow-y-auto bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8"
		>
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
							<div className="size-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl text-white p-2 flex items-center justify-center mr-4 shadow-md">
								<ImportIcon />
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
								{successMessage && <SuccessMessage message={successMessage} />}
								<div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
									<h4 className="text-sm font-semibold text-slate-700 mb-2">
										Import options
									</h4>
									<h5 className="text-xs text-slate-500 mb-4">
										Select what to import:
									</h5>
									<ImportExportOptionList prefix="import-" />
									<h5 className="text-xs text-slate-500 mb-4">
										Select import technique:
									</h5>
									<div className="space-y-2">
										<label className="flex items-center gap-3">
											<input
												type="radio"
												name="import-technique"
												value="replace"
												className="text-green-600 focus:ring-green-500"
												defaultChecked
											/>
											<span>Replace existing data</span>
										</label>
										<label className="flex items-center gap-3">
											<input
												type="radio"
												name="import-technique"
												value="merge"
												className="text-green-600 focus:ring-green-500"
											/>
											<span>Merge with existing data</span>
										</label>
									</div>
								</div>

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
						<form onSubmit={handleExport}>
							<div className="flex items-center mb-6">
								<div className="size-12 bg-gradient-to-br text-white p-2 from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center mr-4 shadow-md">
									<ExportIcon />
								</div>
								<div>
									<h3 className="text-2xl font-bold text-slate-800">Export</h3>
									<p className="text-sm text-slate-500">Download your data</p>
								</div>
							</div>

							<div className="space-y-6">
								<p className="text-slate-600 leading-relaxed">
									Export all your current data including entities, diagrams,
									nodes, relationships, and settings to a JSON file for backup
									or sharing.
								</p>
								<div className="bg-yellow-100 border-l-4 text-yellow-700 flex items-center justify-center border-yellow-500 p-4">
									<div className="flex">
										<div className="size-6">
											<WarningIcon />
										</div>
										<div className="ml-3">
											<p className="text-sm ">
												Warning: Exporting data may include sensitive API keys.
											</p>
										</div>
									</div>
								</div>
								<div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
									<h4 className="text-sm font-semibold text-slate-700 mb-2">
										Export options
									</h4>
									<h5 className="text-xs text-slate-500 mb-4">
										Select what to export:
									</h5>
									<ImportExportOptionList prefix="export-" />
								</div>

								<button
									type="submit"
									className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-indigo-600 transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
								>
									Export Data
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ImportExportDisplay;
