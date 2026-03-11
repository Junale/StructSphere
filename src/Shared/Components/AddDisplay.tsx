import type { FormEvent, ReactNode } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { upperFirstChar } from "@/Shared/SharedUtil";

type props = {
	itemType: string;
	onSubmit: (elements: HTMLFormControlsCollection) => null | string; //
	children?: ReactNode;
};

const AddDisplay = ({ itemType, onSubmit, children }: props) => {
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
		<div className="flex flex-col w-full flex-1 overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8">
			<div className="max-w-2xl mx-auto w-full flex flex-col flex-1 overflow-hidden">
				<div className="text-center mb-6">
					<h2 className="text-4xl font-bold text-slate-800 mb-2">
						Create New {itemTypeCapitalized}
					</h2>
					<p className="text-slate-600">
						Fill in the details below to add a new {itemType}
					</p>
				</div>

				<div className="flex-1 overflow-y-auto">
					<form
						className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 space-y-6"
						onSubmit={handleSubmit}
					>
						{error && (
							<div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
								<svg
									className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								<span className="text-red-700 text-sm font-medium">
									{error}
								</span>
							</div>
						)}

						<div className="space-y-4">{children}</div>

						<div className="flex gap-3 pt-6 border-t border-slate-200">
							<button
								type="submit"
								className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-indigo-600 transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
							>
								Create {itemTypeCapitalized}
							</button>
							<Link
								to={`/${itemType}`}
								className="px-6 py-3 bg-slate-500 text-white font-semibold rounded-lg hover:bg-slate-600 transition shadow-md hover:shadow-lg flex items-center justify-center"
							>
								Cancel
							</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AddDisplay;
