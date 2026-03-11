const Home = () => {
	return (
		<div className="flex flex-col w-full overflow-y-auto bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
			<div className="flex flex-col max-w-5xl mx-auto p-8 space-y-8">
				<div className="text-center space-y-4">
					<h1 className="text-5xl font-bold text-slate-800">
						Welcome to StructSphere
					</h1>
					<p className="text-xl text-slate-600">
						Design, visualize, and document your system architecture with ease
					</p>
				</div>

				<div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl shadow-lg p-8 space-y-4">
					<h2 className="text-3xl font-semibold">What is StructSphere?</h2>
					<p className="text-blue-50 leading-relaxed text-lg">
						StructSphere is a powerful yet intuitive diagramming tool for
						creating and visualizing entity relationships and system
						architectures. Whether you're designing UML diagrams, documenting
						database schemas, or mapping out complex system dependencies,
						StructSphere provides an intelligent, force-directed layout engine
						that automatically organizes your diagrams for maximum clarity.
					</p>
				</div>

				<div className="grid md:grid-cols-2 gap-6">
					<div className="bg-white border border-slate-200 rounded-2xl shadow-md p-6 space-y-3 hover:shadow-xl transition-all transform hover:-translate-y-1">
						<div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center text-2xl shadow-md">
							📦
						</div>
						<h3 className="text-xl font-semibold text-slate-800">
							Manage Entities
						</h3>
						<p className="text-slate-600">
							Create reusable entities representing components, classes, tables,
							or any structured concept. Entities are the building blocks you'll
							use across multiple diagrams.
						</p>
					</div>

					<div className="bg-white border border-slate-200 rounded-2xl shadow-md p-6 space-y-3 hover:shadow-xl transition-all transform hover:-translate-y-1">
						<div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center text-2xl shadow-md">
							🗂️
						</div>
						<h3 className="text-xl font-semibold text-slate-800">
							Create Diagrams
						</h3>
						<p className="text-slate-600">
							Build multiple diagrams to organize different views of your
							system. Each diagram is a canvas for visualizing specific aspects
							of your architecture.
						</p>
					</div>

					<div className="bg-white border border-slate-200 rounded-2xl shadow-md p-6 space-y-3 hover:shadow-xl transition-all transform hover:-translate-y-1">
						<div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center text-2xl shadow-md">
							🔗
						</div>
						<h3 className="text-xl font-semibold text-slate-800">
							Add Nodes & Relationships
						</h3>
						<p className="text-slate-600">
							Place entity instances as nodes within your diagrams and connect
							them with relationships. Nodes can even link to sub-diagrams for
							hierarchical navigation.
						</p>
					</div>

					<div className="bg-white border border-slate-200 rounded-2xl shadow-md p-6 space-y-3 hover:shadow-xl transition-all transform hover:-translate-y-1">
						<div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center text-2xl shadow-md">
							🎨
						</div>
						<h3 className="text-xl font-semibold text-slate-800">
							Automatic Visualization
						</h3>
						<p className="text-slate-600">
							Let our intelligent force-directed layout engine automatically
							arrange your diagrams for optimal readability using physics-based
							algorithms.
						</p>
					</div>

					<div className="bg-white border border-slate-200 rounded-2xl shadow-md p-6 space-y-3 hover:shadow-xl transition-all transform hover:-translate-y-1">
						<div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center text-2xl shadow-md">
							⚙️
						</div>
						<h3 className="text-xl font-semibold text-slate-800">
							Customizable Settings
						</h3>
						<p className="text-slate-600">
							Fine-tune the layout algorithm with configurable parameters like
							iterations, repulsion, spring length, spring strength, and damping
							for perfect results.
						</p>
					</div>

					<div className="bg-white border border-slate-200 rounded-2xl shadow-md p-6 space-y-3 hover:shadow-xl transition-all transform hover:-translate-y-1">
						<div className="w-12 h-12 bg-gradient-to-br from-violet-400 to-purple-500 rounded-xl flex items-center justify-center text-2xl shadow-md">
							💾
						</div>
						<h3 className="text-xl font-semibold text-slate-800">
							Import & Export
						</h3>
						<p className="text-slate-600">
							All data is stored locally in your browser. Export to JSON for
							backup, sharing, version control, or import existing projects to
							continue your work.
						</p>
					</div>
				</div>

				<div className="bg-white border-2 border-green-200 rounded-2xl shadow-lg p-8 space-y-4">
					<div className="flex items-center gap-3 mb-2">
						<div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
							→
						</div>
						<h2 className="text-2xl font-semibold text-slate-800">
							Getting Started
						</h2>
					</div>
					<ol className="list-decimal list-inside space-y-3 text-slate-700">
						<li className="pl-2">
							<strong className="text-slate-800">Create Entities:</strong>{" "}
							Navigate to the Entities page to define the building blocks of
							your system (components, classes, tables, etc.)
						</li>
						<li className="pl-2">
							<strong className="text-slate-800">Build Diagrams:</strong> Create
							one or more diagrams to organize different views of your
							architecture
						</li>
						<li className="pl-2">
							<strong className="text-slate-800">Add Nodes:</strong> Place
							entity instances as nodes within your diagrams and optionally link
							them to sub-diagrams
						</li>
						<li className="pl-2">
							<strong className="text-slate-800">Define Relationships:</strong>{" "}
							Connect nodes with meaningful relationships to show dependencies,
							associations, or interactions
						</li>
						<li className="pl-2">
							<strong className="text-slate-800">Visualize:</strong> View your
							diagrams with automatic intelligent layout that adapts to your
							structure
						</li>
						<li className="pl-2">
							<strong className="text-slate-800">Adjust Settings:</strong>{" "}
							Fine-tune the layout algorithm parameters to achieve your desired
							visualization style
						</li>
						<li className="pl-2">
							<strong className="text-slate-800">Export & Share:</strong>{" "}
							Download your complete project as JSON to back up or share with
							your team
						</li>
					</ol>
				</div>

				<div className="bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-xl shadow-lg p-6 text-center">
					<div className="flex items-center justify-center gap-2 mb-2">
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							aria-hidden="true"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
							/>
						</svg>
						<p className="font-semibold text-lg">Privacy First</p>
					</div>
					<p className="text-slate-200">
						All your data is stored securely in your browser's local storage and
						never leaves your device. You have complete control over your
						information.
					</p>
				</div>
			</div>
		</div>
	);
};

export default Home;
