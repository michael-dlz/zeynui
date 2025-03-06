import React, { JSX } from "react";
import { SizeVariant } from "../types";
interface ContainerProps {
    children: React.ReactNode;
    className?: string;
    as?: keyof JSX.IntrinsicElements;
    size?: SizeVariant;
}
export declare const Container: ({ children, className, as: Component, size, }: ContainerProps) => import("react/jsx-runtime").JSX.Element;
export {};
