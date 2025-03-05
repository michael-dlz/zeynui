import React, { ComponentPropsWithoutRef } from "react";
type SizeVariant = "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";
type AsProp<C extends React.ElementType> = {
    as?: C;
};
type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);
type PolymorphicComponentProp<C extends React.ElementType, Props = {}> = React.PropsWithChildren<Props & AsProp<C>> & Omit<ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;
type TypographyProps = {
    size?: SizeVariant;
    className?: string;
    weight?: "normal" | "medium" | "semibold" | "bold";
};
type TypographyComponentProps<C extends React.ElementType> = PolymorphicComponentProp<C, TypographyProps>;
export declare const Typography: <C extends React.ElementType = "p">({ size, className, weight, children, as, ...props }: TypographyComponentProps<C>) => import("react/jsx-runtime").JSX.Element;
export {};
