import { NavLink } from "react-router-dom";

const NavBar = () => {
	return (
		<div className="flex flex-col items-center justify-center py-4 w-full bg-slate-500 rounded-xl border">
			<h1 className="text-4xl font-bold underline">StructSphere</h1>
			<nav className="flex items-center justify-center px-8 py-2 w-full gap-2">
				<NavLink
					to="/"
					className={({ isActive, isPending }) =>
						isPending ? "" : isActive ? " text-white" : ""
					}
				>
					Home
				</NavLink>
				<NavLink
					to="/entity"
					className={({ isActive, isPending }) =>
						isPending ? "" : isActive ? " text-white" : ""
					}
				>
					Entities
				</NavLink>
				<NavLink
					to="/diagram"
					className={({ isActive, isPending }) =>
						isPending ? "" : isActive ? " text-white" : ""
					}
				>
					Diagrams
				</NavLink>
				<NavLink
					to="/import-export"
					className={({ isActive, isPending }) =>
						isPending ? "" : isActive ? " text-white" : ""
					}
				>
					Import/Export
				</NavLink>
			</nav>
		</div>
	);
};

export default NavBar;
