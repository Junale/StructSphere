import ComponentDisplay from "./components/componentDisplay"
import { TComponent } from "./types";



const App = () => {

    const TestComponent: TComponent = {
        id: 1,
        title: "Test Component",
        description: "This is a test component",
        size: { width: 100, height: 100 },
        color: "#ff0000",
        position: { x: 0, y: 0 },
        children: [
            {
                id: 2,
                title: "Child Component 1",
                description: "This is the first child component",
                size: { width: 50, height: 50 },
                color: "#00ff00",
                position: { x: 10, y: 10 },
                children: [],
                relationships: []
            }
        ],
        relationships: []
    };

    return <ComponentDisplay component={TestComponent} />;
};

export default App;