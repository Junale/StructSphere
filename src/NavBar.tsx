import { useState } from "react";
import MenuIcon from "@/Shared/Components/Icons/MenuIcon";
import StyledNavLink from "./StyledNavLink";

const NavBar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const closeMenu = () => {
		setIsMenuOpen(false);
	};

	return (
		<div className="flex flex-col items-center justify-center w-full bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 shadow-lg rounded-xl border border-blue-800 overflow-hidden">
			<div className="flex items-center justify-between w-full px-4 md:px-6 py-2.5 gap-4">
				<h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-wide drop-shadow-md">
					🌐 StructSphere
				</h1>

				{/* Desktop navigation */}
				<nav className="hidden md:flex items-center justify-end flex-1 gap-2">
					<StyledNavLink to="/" label="Home" />
					<StyledNavLink to="/diagram" label="Diagrams" />
					<StyledNavLink to="/entity" label="Entities" />
					<StyledNavLink to="/node" label="Nodes" />
					<StyledNavLink to="/relationship" label="Relationships" />
					<StyledNavLink to="/import-export" label="Import/Export" />
					<StyledNavLink to="/settings" label="Settings" />
				</nav>

				{/* Mobile menu button */}
				<button
					type="button"
					onClick={toggleMenu}
					className="md:hidden p-2 rounded-lg text-white hover:bg-blue-600/50 transition-colors"
					aria-label="Toggle menu"
					aria-expanded={isMenuOpen}
				>
					<div className="flex size-8">
						<MenuIcon isMenuOpen={isMenuOpen} />
					</div>
				</button>
			</div>

			{/* Mobile navigation */}
			{isMenuOpen && (
				<nav className="md:hidden flex flex-col items-stretch w-full bg-blue-800/30 backdrop-blur-sm">
					<StyledNavLink to="/" label="Home" onClick={closeMenu} />
					<StyledNavLink to="/entity" label="Entities" onClick={closeMenu} />
					<StyledNavLink to="/diagram" label="Diagrams" onClick={closeMenu} />
					<StyledNavLink to="/node" label="Nodes" onClick={closeMenu} />
					<StyledNavLink
						to="/relationship"
						label="Relationships"
						onClick={closeMenu}
					/>
					<StyledNavLink
						to="/import-export"
						label="Import/Export"
						onClick={closeMenu}
					/>
					<StyledNavLink to="/settings" label="Settings" onClick={closeMenu} />
				</nav>
			)}
		</div>
	);
};

export default NavBar;
