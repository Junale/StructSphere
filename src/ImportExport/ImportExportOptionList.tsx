import ChatIcon from "@/Shared/Components/Icons/ChatIcon";
import DiagramIcon from "@/Shared/Components/Icons/DiagramIcon";
import EntityIcon from "@/Shared/Components/Icons/EntityIcon";
import NodeIcon from "@/Shared/Components/Icons/NodeIcon";
import RelationshipIcon from "@/Shared/Components/Icons/RelationshipIcon";
import SettingsIcon from "@/Shared/Components/Icons/SettingsIcon";

type ImportExportOptionListProps = {
	prefix?: string;
};

const ImportExportOptionList = ({
	prefix = "",
}: ImportExportOptionListProps) => {
	const options = [
		{
			id: "entities",
			label: "Entities",
			icon: EntityIcon,
			gradient: "from-blue-400 to-blue-600",
		},
		{
			id: "diagrams",
			label: "Diagrams",
			icon: DiagramIcon,
			gradient: "from-purple-400 to-purple-600",
		},
		{
			id: "relationships",
			label: "Relationships",
			icon: RelationshipIcon,
			gradient: "from-green-400 to-green-600",
		},
		{
			id: "nodes",
			label: "Nodes",
			icon: NodeIcon,
			gradient: "from-orange-400 to-orange-600",
		},
		{
			id: "settings",
			label: "Settings",
			icon: SettingsIcon,
			gradient: "from-pink-400 to-pink-600",
		},
		{
			id: "sessions",
			label: "Chat Sessions",
			icon: ChatIcon,
			gradient: "from-teal-400 to-teal-600",
		},
	];

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
			{options.map((option) => {
				const uniqueId = `${prefix}${option.id}`;
				return (
					<label
						key={uniqueId}
						htmlFor={uniqueId}
						className="relative flex items-start p-4 border-2 border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-md transition-all duration-200 cursor-pointer group bg-white"
					>
						<input type="checkbox" id={uniqueId} className="peer sr-only" />
						<div className="flex items-start gap-3 w-full">
							<div
								className={`flex-shrink-0 w-10 h-10 p-2 bg-gradient-to-br ${option.gradient} rounded-lg flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-110`}
							>
								<option.icon />
							</div>
							<div className="flex-1 min-w-0">
								<div className="font-semibold text-slate-800 group-hover:text-slate-900">
									{option.label}
								</div>
								<div className="text-xs text-slate-500 mt-0.5"></div>
							</div>
						</div>
						<div className="absolute inset-0 border-2 border-blue-500 rounded-xl opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
					</label>
				);
			})}
		</div>
	);
};

export default ImportExportOptionList;
