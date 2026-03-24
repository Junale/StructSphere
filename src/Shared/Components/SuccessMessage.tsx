import CheckmarkIcon from "./Icons/CheckmarkIcon";

interface SuccessMessageProps {
	message: string | null;
}

const SuccessMessage = ({ message }: SuccessMessageProps) => {
	if (!message) return null;

	return (
		<div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3 animate-fade-in">
			<div className="flex size-8">
				<CheckmarkIcon />
			</div>
			<span className="text-green-700 font-medium">{message}</span>
		</div>
	);
};

export default SuccessMessage;
