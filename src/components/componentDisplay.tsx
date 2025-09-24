import { TComponent } from "@/types";
import ChildDisplay from "./childDisplay";
import ComponentEditorModal from "./ComponentEditorModal";
import { Component, useState } from "react";
import { getId } from "@/utils";

type props = {
    component: TComponent;
    setComponent: React.Dispatch<React.SetStateAction<TComponent>>
};

const ComponentDisplay = ({ component, setComponent }: props) => {
    const [editedComponent, setEditedComponent] = useState<TComponent | undefined>(undefined);

    const handleUpdateComponent = (callBack: (component: TComponent) => TComponent) => {
        setComponent((prev) => ({
            ...prev, children: prev.children.map((child) => {
                if (child.id != editedComponent?.id) return child;
                return callBack(child);
            })
        }))
    }

    const handleAddChild = () => {
        setComponent(
            (prev) => ({
                ...prev, children: [
                    ...prev.children,
                    {
                        children: [],
                        color: "#000",
                        id: getId(),
                        description: "",
                        position: {
                            x: 0,
                            y: 0
                        },
                        size: {
                            height: 50,
                            width: 50
                        },
                        title: "",
                        relationships: []
                    }
                ]
            })
        )
    }

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
            <div className="flex">
                <button className="bg-green-400" onClick={handleAddChild}>Add Child</button>
            </div>
            {/* Component Content Visualization */}
            <div
                className="flex flex-1 w-full mt-4 p-4 border rounded-lg shadow-md bg-white relative"
            >
                {component.children.map((child) => <ChildDisplay key={child.id} component={child} onClick={() => setEditedComponent(child)} />)}
            </div>
            <ComponentEditorModal key={editedComponent?.id} component={editedComponent} onClose={() => setEditedComponent(undefined)} updateComponent={handleUpdateComponent} />

        </div>
    );
};

export default ComponentDisplay;