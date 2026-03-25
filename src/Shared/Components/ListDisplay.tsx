import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDiagrams } from "@/Diagram/DiagramsContext";
import { useEntities } from "@/Entity/EntityContext";
import { useNodes } from "@/Node/NodesContext";
import type { TSlug } from "@/Shared/SharedTypes";
import { upperFirstChar } from "@/Shared/SharedUtil";
import EmptyListIcon from "./Icons/EmptyListIcon";
import ListFilterDisplay from "./ListFilterDisplay";

export type TItem = {
	slug: TSlug;
} & Record<string, string>;

type props = {
	itemType: string;
	items: TItem[];
	enableView?: boolean;
	onDelete?: (slug: TSlug) => void;
};

const ListDisplay = ({
	itemType,
	items,
	enableView = false,
	onDelete,
}: props) => {
	const [filteredItems, setFilteredItems] = useState<TItem[]>(items);
	const itemTypeCapitalized = upperFirstChar(itemType);
	const { nodes } = useNodes();
	const { entities } = useEntities();
	const { diagrams } = useDiagrams();

	const itemWithMostKeys = useMemo(() => {
		let maxKeys = 0;
		let tempItemWithMostKeys: TItem | null = null;
		for (const item of items) {
			const keyCount = Object.keys(item).length;
			if (keyCount > maxKeys) {
				maxKeys = keyCount;
				tempItemWithMostKeys = item;
			}
		}
		return tempItemWithMostKeys;
	}, [items]);

	const removeStringFromKey = (key: string, string: string) => {
		if (key.includes(string)) {
			return key.replace(string, "");
		} else return key;
	};

	const getTitle = useMemo(
		() => (key: string, value: string) => {
			if (key.toLowerCase().includes("entity")) {
				return entities[value]?.title || value;
			}
			if (key.toLowerCase().includes("node")) {
				return entities[nodes[value]?.entitySlug || ""]?.title || value;
			}
			if (key.toLowerCase().includes("diagram")) {
				return diagrams[value]?.title || value;
			}

			return value;
		},
		[entities, nodes, diagrams],
	);

	return (
		<div className="flex flex-1 flex-col w-full overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 p-6">
			<div className="max-w-7xl mx-auto w-full flex flex-col flex-1 overflow-hidden">
				<div className="text-center mb-6">
					<h2 className="text-3xl font-bold text-slate-800 mb-2">
						{itemTypeCapitalized} List
					</h2>
				</div>

				<div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
					<ListFilterDisplay items={items} onFilterChange={setFilteredItems} />
					<Link
						to={`/${itemType}/add`}
						className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-indigo-600 transition shadow-md hover:shadow-lg whitespace-nowrap"
					>
						+ Create New {itemTypeCapitalized}
					</Link>
				</div>

				<div className="flex flex-1 overflow-hidden bg-white rounded-xl shadow-lg border border-slate-200">
					{filteredItems.length > 0 ? (
						<div className="flex-1 overflow-auto">
							<table className="table-auto w-full h-fit border-collapse">
								<thead className="bg-gradient-to-r from-slate-100 to-slate-50 sticky top-0 z-10">
									<tr>
										{filteredItems.length > 0 &&
											Object.keys(itemWithMostKeys || {}).map((key) => (
												<th
													key={key}
													className="border-b-2 border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700"
												>
													{upperFirstChar(removeStringFromKey(key, "Slug"))}
												</th>
											))}
										<th className="flex justify-center border-b-2 border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">
											Actions
										</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-slate-100">
									{filteredItems.map((item, index) => (
										<tr
											key={item.slug}
											className={`hover:bg-slate-50 transition ${
												index % 2 === 0 ? "bg-white" : "bg-slate-50/30"
											}`}
										>
											{Object.keys(itemWithMostKeys || {}).map((key) => (
												<td
													key={item.slug + key}
													className="px-4 py-3 text-sm text-slate-700"
												>
													{getTitle(key, item[key])}
												</td>
											))}
											<td className="px-4 py-3">
												<div className="flex items-center justify-center gap-2">
													{enableView && (
														<Link
															to={`/${itemType}/${item.slug}`}
															className="px-3 py-1.5 text-xs font-medium text-green-700 bg-green-50 hover:bg-green-100 rounded-md transition border border-green-200"
														>
															View
														</Link>
													)}
													<Link
														to={`/${itemType}/${item.slug}/update`}
														className="px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md transition border border-blue-200"
													>
														Update
													</Link>
													<button
														type="button"
														className="px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-md transition border border-red-200"
														onClick={(e) => {
															if (onDelete) {
																onDelete(item.slug);
															} else {
																e.preventDefault();
															}
														}}
													>
														Delete
													</button>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					) : (
						<div className="flex flex-col w-full h-full items-center justify-center">
							<div className="h-24 w-24">
								<EmptyListIcon />
							</div>
							<p className="text-lg font-medium mb-2">Nothing here...</p>
							<p className="text-sm">
								Try adjusting your filters or create a new {itemType}
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ListDisplay;
