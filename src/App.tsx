import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import RouterCustom from "./components/RouterCustom";

const App = () => {
	return (
		<div className="flex flex-col w-screen h-screen p-2 overflow-hidden">
			<BrowserRouter>
				<NavBar />
				<RouterCustom />
			</BrowserRouter>
		</div>
	);
};

export default App;
