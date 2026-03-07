import { HashRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import RouterCustom from "./components/RouterCustom";
import { SystemProvider } from "./contexts/SystemContext";

const App = () => {
	return (
		<div className="flex flex-col w-screen h-screen p-2 overflow-hidden">
			<SystemProvider>
				<HashRouter>
					<NavBar />
					<RouterCustom />
				</HashRouter>
			</SystemProvider>
		</div>
	);
};

export default App;
