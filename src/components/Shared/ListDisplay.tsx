import { useState } from "react";
import { Link } from "react-router-dom";
import type { TSlug } from "@/types/shared";
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
	const itemTypeCapitalized =
		itemType.charAt(0).toUpperCase() + itemType.slice(1);

	return (
		<div className="flex flex-1 flex-col w-full overflow-hidden">
			<h2 className="flex text-2xl font-bold mb-4 w-full items-center justify-center">
				{itemTypeCapitalized} List
			</h2>

			<div className="flex items-center w-full justify-start mb-4">
				<ListFilterDisplay
					itemType={itemType}
					items={items}
					onFilterChange={setFilteredItems}
				/>
				<div className="flex items-center w-full justify-end mb-4">
					<Link
						to={`/${itemType}/add`}
						className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
					>
						Create New {itemTypeCapitalized}
					</Link>
				</div>
			</div>

			<div className="flex flex-1 overflow-y-auto w-full">
				<table className="table-auto w-full h-fit border-collapse border border-gray-300">
					<thead className="bg-gray-200 sticky top-0">
						<tr>
							{items.length > 0 &&
								Object.keys(items[0]).map((key) => (
									<th key={key} className="border border-gray-300 p-2">
										{key.charAt(0).toUpperCase() + key.slice(1)}
									</th>
								))}
							<th className="border border-gray-300 p-2">Actions</th>
						</tr>
					</thead>
					<tbody>
						{filteredItems.map((item) => (
							<tr key={item.slug}>
								{Object.entries(item).map(([key, value]) => (
									<td
										key={item.slug + key}
										className="border border-gray-300 p-2"
									>
										{value}
									</td>
								))}
								<td className="border border-gray-300 p-2">
									{enableView && (
										<>
											<Link
												to={`/${itemType}/${item.slug}`}
												className="text-green-500 hover:underline"
											>
												View
											</Link>
											{" | "}
										</>
									)}
									<Link
										to={`/${itemType}/${item.slug}/update`}
										className="text-blue-500 hover:underline"
									>
										Update
									</Link>
									{" | "}
									<button
										type="button"
										className="text-red-500 hover:underline"
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
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ListDisplay;
