import { createContext } from "react";
import LayerContextType from "./type";


const LayerContext = createContext<LayerContextType | null>(null);

export default LayerContext;