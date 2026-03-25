import { useEffect } from "react";
import SearchIcon from "./Icons/SearchIcon";
import type { TItem } from "./ListDisplay";

type props = {
	items: TItem[];
	onFilterChange: (filteredItems: TItem[]) => void;
};

const ListFilterDisplay = ({ items, onFilterChange }: props) => {
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const filtered = items.filter(
			(item) =>
				("title" in item &&
					item.title.toLowerCase().includes(e.target.value.toLowerCase())) ||
				("description" in item &&
					item.description
						.toLowerCase()
						.includes(e.target.value.toLowerCase())) ||
				("slug" in item &&
					item.slug.toLowerCase().includes(e.target.value.toLowerCase())),
		);
		onFilterChange(filtered);
	};

	useEffect(() => {
		onFilterChange(items);
	}, [items, onFilterChange]);

	return (
		<div className="flex items-center gap-3 bg-white rounded-lg border border-slate-200 px-4 py-2.5 shadow-sm">
			<SearchIcon />
			<input
				type="text"
				id="search-filter"
				className="flex-1 outline-none text-slate-700 placeholder-slate-400 bg-transparent min-w-[200px]"
				placeholder={`Search...`}
				onChange={onChange}
			/>
		</div>
	);
};

export default ListFilterDisplay;
