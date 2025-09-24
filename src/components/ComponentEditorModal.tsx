import { TComponent } from "@/types"
import { isColor } from "@/utils";


type props = {
    component: TComponent | undefined;
    updateComponent: (callback: (prev: TComponent) => TComponent) => void;
    onClose: () => void;
}

const ComponentEditorModal = ({ component, onClose, updateComponent }: props) => {

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

    return (
        <div className="flex flex-col absolute right-0 top-0 h-full border rounded-xl bg-white w-1/5 min-w-72">
            <div className="absolute top-0 right-0 p-2">
                <span className="cursor-pointer hover:underline" onClick={onClose}>
                    close
                </span>
            </div>
            <div className="flex flex-col size-full p-4">
                <div className="flex">
                    <label htmlFor="title">Title: </label>
                    <input defaultValue={component.title} type="text" onChange={handleTitleChange} />
                </div>
                <div className="flex">
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
            </div>
        </div>
    )
}

export default ComponentEditorModal;