import { HashRouter } from "react-router-dom";
import NavBar from "./NavBar";
import RouterCustom from "./RouterCustom";
import { SystemProvider } from "./SystemContext";

const App = () => {
	return (
		<div className="flex flex-col w-screen h-screen p-2 overflow-hidden">
			<SystemProvider>
				<HashRouter>
					<NavBar />
					<div className="flex flex-1 flex-col overflow-hidden">
						<RouterCustom />
					</div>
				</HashRouter>
			</SystemProvider>
		</div>
	);
};

export default App;
