import { upperFirstChar } from "@/utils";
import { type FormEvent, type ReactNode, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type props = {
	itemType: string;
	onSubmit: (elements: HTMLFormControlsCollection) => null | string; //
	children?: ReactNode;
};

const UpdateDisplay = ({ itemType, onSubmit, children }: props) => {
	const [error, setError] = useState<string | null>(null);
	const itemTypeCapitalized = upperFirstChar(itemType);
	const navigate = useNavigate();
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const error = onSubmit(e.currentTarget.elements);
		if (!error) {
			navigate(`/${itemType}`);
		} else {
			setError(`Couldn't validate ${itemTypeCapitalized}: ${error}`);
		}
	};
	return (
		<div className="flex flex-1 overflow-hidden flex-col w-full">
			<h2 className="text-2xl font-bold mb-4 flex w-full items-center justify-center">
				Update {itemTypeCapitalized}
			</h2>
			<form
				className="flex flex-1 overflow-y-scroll flex-col w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
				onSubmit={handleSubmit}
			>
				{error && <span className="text-red-500 text-sm">{error}</span>}
				{children}
				<button
					type="submit"
					className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-4"
				>
					Update {itemTypeCapitalized}
				</button>
				<Link
					to={`/${itemType}`}
					className=" flex px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 mt-2 justify-center items-center"
				>
					Cancel
				</Link>
			</form>
		</div>
	);
};

export default UpdateDisplay;
