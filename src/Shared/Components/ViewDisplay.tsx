import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { upperFirstChar } from "@/Shared/SharedUtil";

type props = {
	itemType: string;
	children?: ReactNode;
	backTo?: string;
	updateTo?: string;
	hideUpdateAction?: boolean;
	actions?: ReactNode;
};

const ViewDisplay = ({
	itemType,
	children,
	backTo,
	updateTo,
	hideUpdateAction = false,
	actions,
}: props) => {
	const itemTypeCapitalized = upperFirstChar(itemType);
	const resolvedBackTo = backTo || `/${itemType}`;
	const resolvedUpdateTo = updateTo || `/${itemType}/update`;

	return (
		<div className="flex flex-col w-full flex-1 overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-8">
			<div className="max-w-2xl mx-auto w-full flex flex-col flex-1 overflow-hidden">
				<div className="text-center mb-6">
					<h2 className="text-4xl font-bold text-slate-800 mb-2">
						View {itemTypeCapitalized}
					</h2>
					<p className="text-slate-600">{`Details for this ${itemType}`}</p>
				</div>

				<div className="flex-1 overflow-y-auto">
					<div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 space-y-6">
						<div className="space-y-4">{children}</div>

						<div className="flex gap-3 pt-6 border-t border-slate-200">
							{actions || (
								<>
									{!hideUpdateAction && (
										<Link
											to={resolvedUpdateTo}
											className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-teal-600 transition shadow-md hover:shadow-lg text-center"
										>
											Update {itemTypeCapitalized}
										</Link>
									)}
									<Link
										to={resolvedBackTo}
										className="px-6 py-3 bg-slate-500 text-white font-semibold rounded-lg hover:bg-slate-600 transition shadow-md hover:shadow-lg flex items-center justify-center"
									>
										Back
									</Link>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ViewDisplay;
