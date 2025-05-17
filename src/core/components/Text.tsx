"use client";

import React, { ComponentPropsWithoutRef } from "react";
type SizeVariant = "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";
type AsProp<C extends React.ElementType> = {
  as?: C;
};
type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);
type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = {}
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;
type TextProps = {
  size?: SizeVariant;
  className?: string;
  weight?: "normal" | "medium" | "semibold" | "bold";
};
type TextComponentProps<C extends React.ElementType> = PolymorphicComponentProp<
  C,
  TextProps
>;
export const Text = <C extends React.ElementType = "p">({
  size = "base",
  className = "",
  weight = "normal",
  children,
  as,
  ...props
}: TextComponentProps<C>) => {
  const getSizeClasses = (size: SizeVariant) => {
    const sizeMap = {
      xs: `
        text-xs
        leading-normal
        tracking-normal
      `,
      sm: `
        text-sm
        leading-normal
        tracking-normal
      `,
      base: `
        text-base
        leading-relaxed
        tracking-normal
      `,
      lg: `
        text-lg sm:text-xl
        leading-relaxed
        tracking-normal
      `,
      xl: `
        text-xl sm:text-2xl
        leading-snug
        tracking-tight
      `,
      "2xl": `
        text-2xl sm:text-3xl lg:text-4xl
        leading-tight
        tracking-tight
      `,
      "3xl": `
        text-3xl sm:text-4xl lg:text-5xl
        leading-tight
        tracking-tighter
      `,
    };
    return sizeMap[size];
  };
  const getWeightClasses = (weight: string) => {
    const weightMap = {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    };
    return weightMap[weight as keyof typeof weightMap] || weightMap.normal;
  };
  const getDefaultElement = (size: SizeVariant) => {
    if (size === "3xl" || size === "2xl") return "h1";
    if (size === "xl") return "h2";
    if (size === "lg") return "h3";
    return "p";
  };
  const Component = as || getDefaultElement(size);
  return (
    <Component
      className={`
        ${getSizeClasses(size)}
        ${getWeightClasses(weight)}
        ${as === "p" ? "text-[#545c75]" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </Component>
  );
};
