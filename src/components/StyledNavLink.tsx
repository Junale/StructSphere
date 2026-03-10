import { NavLink } from "react-router-dom";

type props = {
	to: string;
	label: string;
};

const StyledNavLink = ({ to, label }: props) => {
	return (
		<NavLink
			to={to}
			className={({ isActive }) =>
				`px-5 py-2 rounded-lg font-medium transition-all duration-200 ${
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
