import { TComponent } from "@/types";


type props = {
    component: TComponent;
}

const ChildDisplay = ({ component }: props) => {
    return (
        <div className="p-2 border rounded shadow-sm overflow-hidden" style={{
            width: component.size.width,
            height: component.size.height,
            backgroundColor: component.color,
            position: 'absolute',
            left: component.position.x,
            top: component.position.y,
        }}>
            <h2 className="text-lg font-semibold">
                {component.title}
            </h2>
            <p className="text-sm">
                {component.description}
            </p>
        </div>
    );
};

export default ChildDisplay;