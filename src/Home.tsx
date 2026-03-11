const Home = () => {
	return (
		<div className="flex  flex-col w-full overflow-y-auto">
			<div className="flex  flex-col max-w-4xl mx-auto p-6 space-y-6">
				<div className="text-center space-y-2">
					<h1 className="text-4xl font-bold text-gray-800">
						Welcome to StructSphere
					</h1>
					<p className="text-xl text-gray-600">
						Design, visualize, and document your system architecture with ease
					</p>
				</div>

				<div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-3">
					<h2 className="text-2xl font-semibold text-blue-900">
						What is StructSphere?
					</h2>
					<p className="text-gray-700 leading-relaxed">
						StructSphere is a powerful yet intuitive diagramming tool for
						creating and visualizing entity relationships and system
						architectures. Whether you're designing UML diagrams, documenting
						database schemas, or mapping out complex system dependencies,
						StructSphere provides an intelligent, force-directed layout engine
						that automatically organizes your diagrams for maximum clarity.
					</p>
				</div>

				<div className="grid md:grid-cols-2 gap-4">
					<div className="border rounded-lg p-5 space-y-2 hover:shadow-md transition-shadow">
						<h3 className="text-lg font-semibold text-gray-800">
							📦 Manage Entities
						</h3>
						<p className="text-gray-600">
							Create and organize reusable entities representing components,
							classes, tables, or any structured concept in your system.
						</p>
					</div>

					<div className="border rounded-lg p-5 space-y-2 hover:shadow-md transition-shadow">
						<h3 className="text-lg font-semibold text-gray-800">
							🔄 Assemble diagrams
						</h3>
						<p className="text-gray-600">
							Connect entities with meaningful relationships to build
							comprehensive diagrams that capture the structure and interactions
							within your system.
						</p>
					</div>

					<div className="border rounded-lg p-5 space-y-2 hover:shadow-md transition-shadow">
						<h3 className="text-lg font-semibold text-gray-800">
							🎨 Automatic Visualization
						</h3>
						<p className="text-gray-600">
							Let our intelligent layout engine arrange your diagrams
							automatically using force-directed graph algorithms for optimal
							readability.
						</p>
					</div>

					<div className="border rounded-lg p-5 space-y-2 hover:shadow-md transition-shadow">
						<h3 className="text-lg font-semibold text-gray-800">
							💾 Import & Export
						</h3>
						<p className="text-gray-600">
							Save your work locally in your browser, or export to JSON for
							backup, sharing, and version control.
						</p>
					</div>
				</div>

				<div className="bg-green-50 border border-green-200 rounded-lg p-6 space-y-3">
					<h2 className="text-xl font-semibold text-green-900">
						Getting Started
					</h2>
					<ol className="list-decimal list-inside space-y-2 text-gray-700">
						<li>
							<strong>Create Entities:</strong> Navigate to the Entities page to
							define the building blocks of your system
						</li>
						<li>
							<strong>Build Diagrams:</strong> Create diagrams and add your
							entities as nodes with customizable relationships
						</li>
						<li>
							<strong>Visualize:</strong> View your diagrams with automatic
							intelligent layout and positioning
						</li>
						<li>
							<strong>Export & Share:</strong> Download your work as JSON to
							back up or share with your team
						</li>
					</ol>
				</div>

				<div className="text-center text-gray-600">
					<p>
						All your data is stored securely in your browser and never leaves
						your device.
					</p>
				</div>
			</div>
		</div>
	);
};

export default Home;
