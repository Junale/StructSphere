import { TComponent } from "@/types";
import { getId, getIdsOfRelatedComponents } from "@/utils";
import { Children, useEffect, useState } from "react";
import ChildDisplay from "./childDisplay";
import ComponentEditorModal from "./ComponentEditorModal";
import RelationshipDisplay from "./RelationshipDisplay";

type props = {
    component: TComponent;
    setComponent: React.Dispatch<React.SetStateAction<TComponent>>
};

const ComponentDisplay = ({ component, setComponent }: props) => {
    const [editedComponent, setEditedComponent] = useState<TComponent | undefined>(undefined);

    useEffect(() => { console.log(component) }, [component])
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
                        color: "#ffffff",
                        id: getId(),
                        description: "",
                        position: {
                            x: 0,
                            y: 0
                        },
                        size: {
                            height: 100,
                            width: 100
                        },
                        title: "",
                        relationships: []
                    }
                ]
            })
        )
    }

    const handleAddRelationship = (id1: number, id2: number) => {
        console.log("test")
        setComponent((prev) => ({
            ...prev, relationships: [...prev.relationships, {
                firstComponentId: id1,
                secondComponentId: id2,
                type: "association"
            }]
        }))
    }
    const handleRemoveRelationship = (id1: number, id2: number) => {
        setComponent((prev) => ({
            ...prev, relationships: prev.relationships.filter((relationship) =>
                !(relationship.firstComponentId === id1 && relationship.secondComponentId === id2
                    || relationship.secondComponentId === id1 && relationship.firstComponentId === id2)
            )
        }))
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
            <div className="flex p-6">
                <button className="bg-green-400 w-full border rounded-md py-4 " onClick={handleAddChild}>Add Child</button>
            </div>
            {/* Component Content Visualization */}
            <div
                className="flex flex-1 size-full p-4 border rounded-lg shadow-md bg-white relative overflow-auto"
            >
                {component.children.map((child) => <ChildDisplay key={child.id} component={child} onClick={() => setEditedComponent(child)} />)}
                {component.relationships.map((relationship) => <RelationshipDisplay key={relationship.firstComponentId + "_" + relationship.secondComponentId} relationship={relationship} firstComponent={component.children.find(c => c.id === relationship.firstComponentId)} secondComponent={component.children.find(c => c.id === relationship.secondComponentId)} />)}
            </div>

            {editedComponent &&
                <ComponentEditorModal
                    key={editedComponent.id}
                    component={editedComponent}
                    relationshipIds={getIdsOfRelatedComponents(editedComponent.id, component.relationships)}
                    siblings={component.children.filter((child) => child.id != editedComponent.id)}
                    onClose={() => setEditedComponent(undefined)}
                    updateComponent={handleUpdateComponent}
                    onNewRelationship={handleAddRelationship}
                    onRemoveRelationship={handleRemoveRelationship}
                />
            }

        </div>
    );
};

export default ComponentDisplay;