import { NavLink } from "react-router-dom";

type props = {
	to: string;
	label: string;
	onClick?: () => void;
};

const StyledNavLink = ({ to, label, onClick }: props) => {
	return (
		<NavLink
			to={to}
			onClick={onClick}
			className={({ isActive }) =>
				`px-5 py-3 md:py-2 md:rounded-lg font-medium transition-all duration-200 block text-center ${
					isActive
						? "bg-white text-blue-700 shadow-md"
						: "text-blue-100 hover:bg-blue-600/50 hover:text-white hover:shadow-sm"
				}`
			}
		>
			{label}
		</NavLink>
	);
};

export default StyledNavLink;
