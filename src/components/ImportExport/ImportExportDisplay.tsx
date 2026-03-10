import type { FormEvent } from "react";
import { useDiagrams } from "@/contexts/DiagramsContext";
import { useEntities } from "@/contexts/EntityContext";
import { useNodes } from "@/contexts/NodesContext";
import { useRelationships } from "@/contexts/RelationshipsContext";

const ImportExportDisplay = () => {
	const { entities, setEntities } = useEntities();
	const { diagrams, setDiagrams } = useDiagrams();
	const { relationships, setRelationships } = useRelationships();
	const { nodes, setNodes } = useNodes();

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
		<div className="flex flex-col w-full">
			<h2 className="text-2xl font-bold mb-4 flex w-full items-center justify-center">
				Import/Export
			</h2>
			<p className="text-lg flex w-full items-center justify-center">
				Import and export your entities and diagrams here.
			</p>
			<div className="flex w-full">
				<div className="flex flex-col w-1/2 p-4 rounded-xl border">
					<form onSubmit={handleImport}>
						<h3 className="text-xl font-bold mb-2">Import</h3>
						<p className="mb-4">
							Import your entities and diagrams from a JSON file.
						</p>
						<label htmlFor="import-file" className="mb-2 block">
							Choose JSON file to import
						</label>
						<input
							id="import-file"
							type="file"
							accept=".json"
							className="mb-4"
						/>
						<button
							type="submit"
							className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
						>
							Import
						</button>
					</form>
				</div>
				<div className="flex flex-col w-1/2 p-4 rounded-xl border">
					<h3 className="text-xl font-bold mb-2">Export</h3>
					<p className="mb-4">
						Export your entities and diagrams to a JSON file.
					</p>
					<button
						type="button"
						className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
						onClick={handleExport}
					>
						Export
					</button>
				</div>
			</div>
		</div>
	);
};

export default ImportExportDisplay;
