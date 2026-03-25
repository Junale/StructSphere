import type { ReactNode } from "react";

type LabeledSelectFieldProps = {
	id: string;
	label: string;
	children: ReactNode;
	defaultValue?: string;
	value?: string;
	disabled?: boolean;
	onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const LabeledSelectField = ({
	id,
	label,
	children,
	defaultValue,
	value,
	disabled,
	onChange,
}: LabeledSelectFieldProps) => {
	const selectClassName = [
		"w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900",
		"focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20",
		"transition-colors",
		disabled ? "bg-slate-100 text-slate-500 cursor-not-allowed" : "",
	]
		.filter(Boolean)
		.join(" ");

	return (
		<div className="flex flex-col gap-2">
			<label htmlFor={id} className="font-semibold text-slate-700">
				{label}:
			</label>
			<select
				id={id}
				name={id}
				defaultValue={defaultValue}
				value={value}
				disabled={disabled}
				onChange={onChange}
				className={selectClassName}
			>
				{children}
			</select>
		</div>
	);
};

export default LabeledSelectField;
