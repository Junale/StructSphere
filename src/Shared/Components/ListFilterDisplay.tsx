import { useEffect } from "react";
import type { TItem } from "./ListDisplay";

type props = {
	itemType: string;
	items: TItem[];
	onFilterChange: (filteredItems: TItem[]) => void;
};

const ListFilterDisplay = ({ itemType, items, onFilterChange }: props) => {
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const filtered = items.filter(
			(item) =>
				item.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
				item.description.toLowerCase().includes(e.target.value.toLowerCase()) ||
				item.slug.toLowerCase().includes(e.target.value.toLowerCase()),
		);
		onFilterChange(filtered);
	};

	useEffect(() => {
		onFilterChange(items);
	}, [items, onFilterChange]);

	return (
		<div className="flex items-center gap-3 bg-white rounded-lg border border-slate-200 px-4 py-2.5 shadow-sm">
			<svg
				className="w-5 h-5 text-slate-400"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				aria-hidden="true"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
				/>
			</svg>
			<input
				type="text"
				id="search-filter"
				className="flex-1 outline-none text-slate-700 placeholder-slate-400 bg-transparent min-w-[200px]"
				placeholder={`Search ${itemType}s...`}
				onChange={onChange}
			/>
		</div>
	);
};

export default ListFilterDisplay;
