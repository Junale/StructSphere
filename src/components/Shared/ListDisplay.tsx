import { useState } from "react";
import { Link } from "react-router-dom";
import ListFilterDisplay from "./ListFilterDisplay";

export type TItem = {
	slug: string;
	title: string;
	description: string;
};

type props = {
	itemType: string;
	items: TItem[];
	enableView?: boolean;
	onDelete?: (slug: string) => void;
	onCreate?: () => void;
};

const ListDisplay = ({
	itemType,
	items,
	enableView = true,
	onDelete,
	onCreate,
}: props) => {
	const [filteredItems, setFilteredItems] = useState<TItem[]>(items);
	const itemTypeCapitalized =
		itemType.charAt(0).toUpperCase() + itemType.slice(1);

	return (
		<div className="flex flex-col w-full">
			<h2 className="text-2xl font-bold mb-4 flex w-full items-center justify-center">
				{itemTypeCapitalized} List
			</h2>

			<div className="flex items-center w-full justify-start mb-4">
				<ListFilterDisplay
					itemType={itemType}
					items={items}
					onFilterChange={setFilteredItems}
				/>
				<div className="flex items-center w-full justify-end mb-4">
					<button
						type="button"
						className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
						onClick={onCreate}
					>
						Create New {itemTypeCapitalized}
					</button>
				</div>
			</div>

			<table className="table-auto w-full border-collapse border border-gray-300">
				<thead className="bg-gray-200">
					<tr>
						<th className="border border-gray-300 p-2">Slug</th>
						<th className="border border-gray-300 p-2">Title</th>
						<th className="border border-gray-300 p-2">Description</th>
						<th className="border border-gray-300 p-2">Actions</th>
					</tr>
				</thead>
				<tbody>
					{filteredItems.map((item) => (
						<tr key={item.slug}>
							<td className="border border-gray-300 p-2">{item.slug}</td>
							<td className="border border-gray-300 p-2">{item.title}</td>
							<td className="border border-gray-300 p-2">{item.description}</td>
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
									to={`/${itemType}/${item.slug}/edit`}
									className="text-blue-500 hover:underline"
								>
									Edit
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
	);
};

export default ListDisplay;
