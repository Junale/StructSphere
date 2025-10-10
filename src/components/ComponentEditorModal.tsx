import { TComponent, TRelationship } from "@/types"
import { isColor } from "@/utils";
import React, { MouseEventHandler } from "react";


type props = {
    component: TComponent | undefined;
    updateComponent: (callback: (prev: TComponent) => TComponent) => void;
    onClose: () => void;
    siblings: TComponent[];
    relationshipIds: number[];
    onNewRelationship: (id1: number, id2: number) => void
    onRemoveRelationship: (id1: number, id2: number) => void
}

const ComponentEditorModal = ({
    component,
    siblings,
    relationshipIds,
    onClose,
    updateComponent,
    onNewRelationship,
    onRemoveRelationship
}: props) => {

    if (!component) return;

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        if (typeof title != "string") return;
        updateComponent((prev) => ({
            ...prev,
            title: title
        }))
    }
    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const description = e.target.value;
        if (typeof description != "string") return;
        updateComponent((prev) => ({
            ...prev,
            description: description
        }))
    }

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const colorCode = e.target.value;
        if (!isColor(colorCode)) return;
        updateComponent((prev) => ({
            ...prev,
            color: colorCode
        }))
    }

    const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const width = Number(e.target.value)
        if (typeof width != "number") return;
        updateComponent((prev) => ({
            ...prev,
            size: {
                ...prev.size,
                width: width
            }
        }))
    }
    const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const height = Number(e.target.value)
        if (typeof height != "number") return;
        updateComponent((prev) => ({
            ...prev,
            size: {
                ...prev.size,
                height: height
            }
        }))
    }

    const handleXChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const x = Number(e.target.value)
        if (typeof x != "number") return;
        if (x < 0) return;
        updateComponent((prev) => ({
            ...prev,
            position: {
                ...prev.position,
                x: x
            }
        }))
    }

    const handleYChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const y = Number(e.target.value)
        if (typeof y != "number") return;
        if (y < 0) return;
        updateComponent((prev) => ({
            ...prev,
            position: {
                ...prev.position,
                y: y
            }
        }))
    }

    const handleRelationshipChange = (e: React.MouseEvent<HTMLSelectElement, MouseEvent>) => {
        const updatedRelation = Number(e.currentTarget.value);
        const existingRelationship = relationshipIds.find((id) => updatedRelation);
        console.log(relationshipIds);
        if (!existingRelationship) {
            onNewRelationship(component.id, updatedRelation);
        }
        else {
            onRemoveRelationship(component.id, updatedRelation)
        }
    }

    return (
        <div className="flex flex-col z-20 p-4 absolute right-0 top-0 w-1/5 min-w-72  h-full">
            <div className=" relative flex flex-col size-full border rounded-xl bg-white">
                <div className="absolute top-0 right-0 p-2">
                    <span className="cursor-pointer hover:underline" onClick={onClose}>
                        close
                    </span>
                </div>
                <div className="flex flex-col size-full p-4">
                    <div className="flex flex-col">
                        <label htmlFor="title">Title: </label>
                        <input defaultValue={component.title} type="text" onChange={handleTitleChange} />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="description">Description: </label>
                        <input defaultValue={component.description} type="text" onChange={handleDescriptionChange} />
                    </div>
                    <div className="flex">
                        <label htmlFor="color">Color: </label>
                        <input defaultValue={component.color} type="color" onChange={handleColorChange} />
                    </div>
                    <h2>
                        Size:
                    </h2>
                    <div className="flex">
                        <label htmlFor="Height">Height: </label>
                        <input defaultValue={component.size.height} type="number" onChange={handleHeightChange} />
                    </div>
                    <div className="flex">
                        <label htmlFor="Width">Width: </label>
                        <input defaultValue={component.size.width} type="number" onChange={handleWidthChange} />
                    </div>
                    <h2>
                        Position:
                    </h2>
                    <div className="flex">
                        <label htmlFor="X">X: </label>
                        <input defaultValue={component.position.x} type="number" onChange={handleXChange} />
                    </div>
                    <div className="flex">
                        <label htmlFor="Y">Y: </label>
                        <input defaultValue={component.position.y} type="number" onChange={handleYChange} />
                    </div>
                    <h2>

                    </h2>
                    <div className="flex">
                        <label htmlFor="relations">Relations: </label>
                        <select defaultValue={relationshipIds.map(toString)} name="relations" id="relations" onClick={handleRelationshipChange} multiple >
                            {siblings.map((sibling) => <option value={sibling.id}>{sibling.title}</option>)}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ComponentEditorModal;