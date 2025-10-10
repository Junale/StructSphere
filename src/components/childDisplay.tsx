import { TComponent } from "@/types";

type props = {
    component: TComponent;
    onClick: () => void;
}

const ChildDisplay = ({ component, onClick }: props) => (
    <div
        className="p-2 border rounded shadow-sm overflow-hidden z-10 cursor-pointer"
        style={{
            width: component.size.width,
            height: component.size.height,
            backgroundColor: component.color,
            position: 'absolute',
            left: component.position.x,
            top: component.position.y,
        }}
        onClick={onClick}
    >
        <h2 className="text-lg font-semibold">
            {component.title}
        </h2>
        <p className="text-sm">
            {component.description}
        </p>
    </div>
);

export default ChildDisplay;