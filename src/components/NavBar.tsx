import { NavLink } from "react-router-dom";

const NavBar = () => {
	return (
		<div className="flex flex-col items-center justify-center w-full bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 shadow-lg rounded-xl border border-blue-800">
			<div className="flex items-center justify-center py-5">
				<h1 className="text-4xl font-extrabold text-white tracking-wide drop-shadow-md">
					🌐 StructSphere
				</h1>
			</div>
			<nav className="flex items-center justify-center px-8 py-3 w-full gap-4 bg-blue-800/30 backdrop-blur-sm">
				<NavLink
					to="/"
					className={({ isActive }) =>
						`px-5 py-2 rounded-lg font-medium transition-all duration-200 ${
							isActive
								? "bg-white text-blue-700 shadow-md"
								: "text-blue-100 hover:bg-blue-600/50 hover:text-white hover:shadow-sm"
						}`
					}
				>
					Home
				</NavLink>
				<NavLink
					to="/entity"
					className={({ isActive }) =>
						`px-5 py-2 rounded-lg font-medium transition-all duration-200 ${
							isActive
								? "bg-white text-blue-700 shadow-md"
								: "text-blue-100 hover:bg-blue-600/50 hover:text-white hover:shadow-sm"
						}`
					}
				>
					Entities
				</NavLink>
				<NavLink
					to="/diagram"
					className={({ isActive }) =>
						`px-5 py-2 rounded-lg font-medium transition-all duration-200 ${
							isActive
								? "bg-white text-blue-700 shadow-md"
								: "text-blue-100 hover:bg-blue-600/50 hover:text-white hover:shadow-sm"
						}`
					}
				>
					Diagrams
				</NavLink>
				<NavLink
					to="/import-export"
					className={({ isActive }) =>
						`px-5 py-2 rounded-lg font-medium transition-all duration-200 ${
							isActive
								? "bg-white text-blue-700 shadow-md"
								: "text-blue-100 hover:bg-blue-600/50 hover:text-white hover:shadow-sm"
						}`
					}
				>
					Import/Export
				</NavLink>
			</nav>
		</div>
	);
};

export default NavBar;
