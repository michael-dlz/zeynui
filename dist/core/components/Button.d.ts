import React, { ComponentPropsWithoutRef } from "react";
import { ColorVariant, RadiusVariant, SizeVariant, StyleVariant } from "../types";
type AsProp<C extends React.ElementType> = {
    as?: C;
};
type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);
type PolymorphicComponentProp<C extends React.ElementType, Props = {}> = React.PropsWithChildren<Props & AsProp<C>> & Omit<ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;
type ButtonVariantsProps = {
    color?: ColorVariant;
    radius?: RadiusVariant;
    size?: SizeVariant;
    variant?: StyleVariant;
    startContent?: React.ReactNode;
    endContent?: React.ReactNode;
    isIconOnly?: boolean;
    className?: string;
    isRelative?: boolean;
    bounce?: boolean;
    fullWidth?: boolean;
    isElevation?: boolean;
    align?: "left" | "center" | "right";
};
type ButtonProps<C extends React.ElementType> = PolymorphicComponentProp<C, ButtonVariantsProps>;
export declare const Button: <C extends React.ElementType = "button">({ children, className, color, radius, size, variant, startContent, endContent, isIconOnly, isRelative, bounce, fullWidth, isElevation, align, as, onClick, ...props }: ButtonProps<C>) => import("react/jsx-runtime").JSX.Element;
export {};
