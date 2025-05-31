import React, { ReactNode } from "react";
import { ColorVariant, RadiusVariant, SizeVariant, StyleVariant } from "../types";
type Placement = "top" | "bottom" | "left" | "right";
export interface TooltipProps {
    content: ReactNode;
    children: ReactNode;
    placement?: Placement;
    color?: ColorVariant;
    variant?: StyleVariant;
    size?: SizeVariant;
    radius?: RadiusVariant;
    delay?: number;
    className?: string;
    maxWidth?: string | number;
}
export declare const Tooltip: React.FC<TooltipProps>;
export {};
