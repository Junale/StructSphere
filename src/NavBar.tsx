import StyledNavLink from "./StyledNavLink";

const NavBar = () => {
	return (
		<div className="flex flex-col items-center justify-center w-full bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 shadow-lg rounded-xl border border-blue-800 overflow-hidden">
			<div className="flex items-center justify-center py-5">
				<h1 className="text-4xl font-extrabold text-white tracking-wide drop-shadow-md">
					🌐 StructSphere
				</h1>
			</div>
			<nav className="flex items-center justify-center px-8 py-3 w-full gap-4 bg-blue-800/30 backdrop-blur-sm">
				<StyledNavLink to="/" label="Home" />
				<StyledNavLink to="/entity" label="Entities" />
				<StyledNavLink to="/diagram" label="Diagrams" />
				<StyledNavLink to="/node" label="Nodes" />
				<StyledNavLink to="/relationship" label="Relationships" />
				<StyledNavLink to="/import-export" label="Import/Export" />
				<StyledNavLink to="/settings" label="Settings" />
			</nav>
		</div>
	);
};

export default NavBar;
