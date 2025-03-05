import React, { JSX } from "react";
interface ContainerProps {
    children: React.ReactNode;
    className?: string;
    as?: keyof JSX.IntrinsicElements;
}
export declare const Container: ({ children, className, as: Component, }: ContainerProps) => import("react/jsx-runtime").JSX.Element;
export {};
