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
			icon: (
				<svg
					aria-hidden="true"
					className="w-5 h-5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
					/>
				</svg>
			),
			gradient: "from-blue-400 to-blue-600",
		},
		{
			id: "diagrams",
			label: "Diagrams",
			icon: (
				<svg
					aria-hidden="true"
					className="w-5 h-5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
					/>
				</svg>
			),
			gradient: "from-purple-400 to-purple-600",
		},
		{
			id: "relationships",
			label: "Relationships",
			icon: (
				<svg
					aria-hidden="true"
					className="w-5 h-5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
					/>
				</svg>
			),
			gradient: "from-green-400 to-green-600",
		},
		{
			id: "nodes",
			label: "Nodes",
			icon: (
				<svg
					aria-hidden="true"
					className="w-5 h-5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
					/>
				</svg>
			),
			gradient: "from-orange-400 to-orange-600",
		},
		{
			id: "settings",
			label: "Settings",
			icon: (
				<svg
					aria-hidden="true"
					className="w-5 h-5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
					/>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
					/>
				</svg>
			),
			gradient: "from-pink-400 to-pink-600",
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
								className={`flex-shrink-0 w-10 h-10 bg-gradient-to-br ${option.gradient} rounded-lg flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-110`}
							>
								{option.icon}
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
