import ComponentDisplay from "@/components/componentDisplay";
import { TComponent } from "@/types";
import { useEffect, useState } from "react";
import { getId } from "./utils";



const App = () => {
    const [component, setComponent] = useState<TComponent>({
        id: getId(),
        title: "Test Component",
        description: "This is a test component",
        size: { width: 100, height: 100 },
        color: "#ff0000",
        position: { x: 0, y: 0 },
        children: [],
        relationships: []
    })

    return (
        <div className="flex w-screen h-screen p-2 overflow-hidden">
            <ComponentDisplay component={component} setComponent={setComponent} />
        </div>
    );
};

export default App;