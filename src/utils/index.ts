import { TColor } from "@/types";


export const isColor = (color: any): color is TColor => {

    if (typeof color != "string") return false;

    if (!/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(color)) return false;

    return true;
}

let counter = 0;
export const getId = (): number => {
    return counter++;
}