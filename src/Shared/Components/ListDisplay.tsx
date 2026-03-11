import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDiagrams } from "@/Diagram/DiagramsContext";
import { useEntities } from "@/Entity/EntityContext";
import { useNodes } from "@/Node/NodesContext";
import type { TSlug } from "@/Shared/SharedTypes";
import { upperFirstChar } from "@/Shared/SharedUtil";
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
					<ListFilterDisplay
						itemType={itemType}
						items={items}
						onFilterChange={setFilteredItems}
					/>
					<Link
						to={`/${itemType}/add`}
						className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-indigo-600 transition shadow-md hover:shadow-lg whitespace-nowrap"
					>
						+ Create New {itemTypeCapitalized}
					</Link>
				</div>

				<div className="flex flex-1 overflow-hidden bg-white rounded-xl shadow-lg border border-slate-200">
					<div className="flex-1 overflow-auto">
						<table className="table-auto w-full h-fit border-collapse">
							<thead className="bg-gradient-to-r from-slate-100 to-slate-50 sticky top-0 z-10">
								<tr>
									{items.length > 0 &&
										Object.keys(items[0]).map((key) => (
											<th
												key={key}
												className="border-b-2 border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700"
											>
												{upperFirstChar(removeStringFromKey(key, "Slug"))}
											</th>
										))}
									<th className="border-b-2 border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">
										Actions
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-slate-100">
								{filteredItems.length > 0 ? (
									filteredItems.map((item, index) => (
										<tr
											key={item.slug}
											className={`hover:bg-slate-50 transition ${
												index % 2 === 0 ? "bg-white" : "bg-slate-50/30"
											}`}
										>
											{Object.entries(item).map(([key, value]) => (
												<td
													key={item.slug + key}
													className="px-4 py-3 text-sm text-slate-700"
												>
													{getTitle(key, value)}
												</td>
											))}
											<td className="px-4 py-3">
												<div className="flex items-center gap-2">
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
									))
								) : (
									<tr>
										<td
											colSpan={
												items.length > 0 ? Object.keys(items[0]).length + 1 : 1
											}
											className="px-4 py-12 text-center text-slate-500"
										>
											<div className="flex flex-col items-center justify-center">
												<svg
													className="w-16 h-16 text-slate-300 mb-4"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
													aria-hidden="true"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={1.5}
														d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
													/>
												</svg>
												<p className="text-lg font-medium mb-2">
													No {itemType}s found
												</p>
												<p className="text-sm">
													Try adjusting your filters or create a new {itemType}
												</p>
											</div>
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ListDisplay;
