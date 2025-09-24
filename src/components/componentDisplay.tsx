import { TComponent } from "@/types";
import ChildDisplay from "./childDisplay";

type props = {
    component: TComponent;
};

const ComponentDisplay = ({ component }: props) => {


    return (
        <div className="flex flex-col size-full">
            {/* Component Info Header */}
            <div className="flex flex-col w-full h-fit p-4 border rounded-lg shadow-md items-center justify-center">
                <h1 className="text-2xl font-bold mb-2">
                    {component.title}
                </h1>
                <span>
                    {component.description}
                </span>
            </div>
            {/* Component Content Visualization */}
            <div className="flex flex-1 w-full mt-4 p-4 border rounded-lg shadow-md bg-white relative">
                {component.children.map((child) => <ChildDisplay key={child.id} component={child} />)}
            </div>
        </div>
    );
};

export default ComponentDisplay;