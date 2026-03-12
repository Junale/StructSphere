import { HashRouter } from "react-router-dom";
import ChatButton from "./Chat/Components/ChatButton";
import ChatModal from "./Chat/Components/ChatModal";
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
					<ChatButton />
					<ChatModal />
				</HashRouter>
			</SystemProvider>
		</div>
	);
};

export default App;
