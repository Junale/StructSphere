import { useState } from "react";
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
			<div className="flex items-center justify-between w-full px-4 md:px-8 py-5">
				<h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-wide drop-shadow-md">
					🌐 StructSphere
				</h1>

				{/* Mobile menu button */}
				<button
					type="button"
					onClick={toggleMenu}
					className="md:hidden p-2 rounded-lg text-white hover:bg-blue-600/50 transition-colors"
					aria-label="Toggle menu"
					aria-expanded={isMenuOpen}
				>
					<svg
						className="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						{isMenuOpen ? (
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						) : (
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M4 6h16M4 12h16M4 18h16"
							/>
						)}
					</svg>
				</button>
			</div>

			{/* Desktop navigation */}
			<nav className="hidden md:flex items-center justify-center px-8 py-3 w-full gap-4 bg-blue-800/30 backdrop-blur-sm">
				<StyledNavLink to="/" label="Home" />
				<StyledNavLink to="/entity" label="Entities" />
				<StyledNavLink to="/diagram" label="Diagrams" />
				<StyledNavLink to="/node" label="Nodes" />
				<StyledNavLink to="/relationship" label="Relationships" />
				<StyledNavLink to="/import-export" label="Import/Export" />
				<StyledNavLink to="/settings" label="Settings" />
			</nav>

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
