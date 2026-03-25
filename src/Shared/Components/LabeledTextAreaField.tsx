type LabeledTextAreaFieldProps = {
	id: string;
	label: string;
	placeholder?: string;
	defaultValue?: string;
	value?: string;
	disabled?: boolean;
	rows?: number;
};

const LabeledTextAreaField = ({
	id,
	label,
	placeholder,
	defaultValue,
	value,
	disabled,
	rows = 4,
}: LabeledTextAreaFieldProps) => {
	const textAreaClassName = [
		"w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900",
		"placeholder:text-slate-400",
		"focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20",
		"transition-colors resize-y min-h-28",
		disabled ? "disabled:bg-slate-100 text-slate-500 cursor-not-allowed" : "",
	]
		.filter(Boolean)
		.join(" ");

	return (
		<div className="flex flex-col gap-2">
			<label htmlFor={id} className="font-semibold text-slate-700">
				{label}:
			</label>
			<textarea
				id={id}
				name={id}
				placeholder={placeholder}
				defaultValue={defaultValue}
				value={value}
				disabled={disabled}
				rows={rows}
				className={textAreaClassName}
			/>
		</div>
	);
};

export default LabeledTextAreaField;
