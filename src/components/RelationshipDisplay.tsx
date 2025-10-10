import { TComponent, TRelationship } from "@/types";
import { getComponentCenterPosition } from "@/utils";


type props = {
    relationship: TRelationship
    firstComponent: TComponent | undefined;
    secondComponent: TComponent | undefined;
}

const RelationshipDisplay = ({ relationship, firstComponent, secondComponent }: props) => {
    if (!firstComponent || !secondComponent) return;
    const firstComponentCenterPosition = getComponentCenterPosition(firstComponent);
    const secondComponentCenterPosition = getComponentCenterPosition(secondComponent);

    const height = secondComponentCenterPosition.y - firstComponentCenterPosition.y;
    const width = secondComponentCenterPosition.x - firstComponentCenterPosition.x;

    const diagonal = Math.sqrt((height * height) + (width * width));


    const angle = `${width == Math.abs(width) && height == Math.abs(height) || width != Math.abs(width) && height != Math.abs(height) ? "" : "-"}${Math.asin(Math.abs(height) / diagonal)}rad`;

    return (
        <div className="absolute flex" style={{
            top: Math.min(firstComponentCenterPosition.y, secondComponentCenterPosition.y),
            left: Math.min(firstComponentCenterPosition.x, secondComponentCenterPosition.x),
            height: Math.abs(height),
            width: Math.abs(width)
        }}>
            <div className="flex size-full relative">
                <div
                    className={`absolute text-center bg-black ${firstComponentCenterPosition.x < secondComponentCenterPosition.x ? "left-0" : "right-0"} ${firstComponentCenterPosition.y < secondComponentCenterPosition.y ? "top-0" : "bottom-0"}`}
                    style={{
                        width: diagonal,
                        height: 2,
                        rotate: angle,
                        transformOrigin: `${firstComponentCenterPosition.x < secondComponentCenterPosition.x ? "left" : "right"} ${firstComponentCenterPosition.y < secondComponentCenterPosition.y ? "top" : "bottom"}`
                    }}
                >
                    {relationship.type}
                </div>
            </div>
        </div >
    );
}

export default RelationshipDisplay;