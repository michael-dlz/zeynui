"use client";
import React, { ComponentPropsWithoutRef } from "react";
import { Ripple } from "./Ripples";
import {
  AlignmentVariant,
  ColorVariant,
  RadiusVariant,
  SizeVariant,
  StyleVariant,
  VariantClasses,
} from "../types";
import { useRipples } from "../hook/useRipples";
type AsProp<C extends React.ElementType> = {
  as?: C;
};
type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);
type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = {}
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

type ButtonVariantsProps = {
  color?: ColorVariant;
  radius?: RadiusVariant;
  size?: SizeVariant;
  variant?: StyleVariant;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  isIconOnly?: boolean;
  className?: string;
  isRelative?: boolean;
  isBounce?: boolean;
  fullWidth?: boolean;
  isElevation?: boolean;
  align?: AlignmentVariant;
};

type ButtonProps<C extends React.ElementType> = PolymorphicComponentProp<
  C,
  ButtonVariantsProps
>;

export const Button = <C extends React.ElementType = "button">({
  children,
  className = "",
  color = "primary",
  radius = "md",
  size = "md",
  variant = "solid",
  leftContent,
  rightContent,
  isIconOnly = false,
  isRelative = true,
  isBounce = true,
  fullWidth = false,
  isElevation = true,
  align = "center",
  as,
  onClick,
  ...props
}: ButtonProps<C>) => {
  const { ripples, createRipple } = useRipples();
  const Component = as || "button";

  const BUTTON_CLASSES: VariantClasses = {
    solid: {
      primary: "bg-primary hover:bg-primary/90 text-white",
      secondary: "bg-secondary hover:bg-secondary/90 text-white",
      danger: "bg-danger hover:bg-danger/90 text-white",
      warning: "bg-warning hover:bg-warning/90 text-white",
      success: "bg-success hover:bg-success/90 text-white",
      info: "bg-info hover:bg-info/90 text-black",
      whatsapp: "bg-whatsapp hover:bg-whatsapp/90 text-white",
    },
    outline: {
      primary:
        "border border-primary/50 text-primary hover:bg-primary hover:text-white",
      secondary:
        "border border-secondary/50 text-secondary hover:bg-secondary hover:text-white",
      danger:
        "border border-danger/50 text-danger hover:bg-danger hover:text-white",
      warning:
        "border border-warning/50 text-warning hover:bg-warning hover:text-white",
      success:
        "border border-success/50 text-success hover:bg-success hover:text-white",
      info: "border border-info/50 text-info hover:bg-info hover:text-white",
      whatsapp:
        "border border-whatsapp/50 text-whatsapp hover:bg-whatsapp hover:text-white",
    },
    soft: {
      primary: "bg-primary/10 text-primary hover:bg-primary hover:text-white",
      secondary:
        "bg-secondary/10 text-secondary hover:bg-secondary hover:text-white",
      danger: "bg-danger/10 text-danger hover:bg-danger hover:text-white",
      warning: "bg-warning/10 text-warning hover:bg-warning hover:text-white",
      success: "bg-success/10 text-success hover:bg-success hover:text-white",
      info: "bg-info/10 text-info hover:bg-info hover:text-white",
      whatsapp:
        "bg-whatsapp/10 text-whatsapp hover:bg-whatsapp hover:text-white",
    },
    light: {
      primary: "text-primary hover:bg-primary/10",
      secondary: "text-secondary hover:bg-secondary/10",
      danger: "text-danger hover:bg-danger/10",
      warning: "text-warning hover:bg-warning/10",
      success: "text-success hover:bg-success/10",
      info: "text-info hover:bg-info/10",
      whatsapp: "text-whatsapp hover:bg-whatsapp/10",
    },
    underline: {
      primary: "text-primary border-b border-primary hover:bg-primary/10",
      secondary:
        "text-secondary border-b border-secondary hover:bg-secondary/10",
      danger: "text-danger border-b border-danger hover:bg-danger/10",
      warning: "text-warning border-b border-warning hover:bg-warning/10",
      success: "text-success border-b border-success hover:bg-success/10",
      info: "text-info border-b border-info hover:bg-info/10",
      whatsapp: "text-whatsapp border-b border-whatsapp hover:bg-whatsapp/10",
    },
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    createRipple(event);
    if (onClick) {
      onClick(event);
    }
  };

  const getColorClasses = (
    colorName: ColorVariant,
    variant: StyleVariant
  ): string => {
    return BUTTON_CLASSES[variant][colorName];
  };

  const alignmentClasses = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };

  const getSizeClasses = (
    buttonSize: SizeVariant,
    isIconOnly: boolean
  ): string => {
    if (isIconOnly) {
      const iconSizeMap = {
        sm: "w-8 h-8 text-lg",
        md: "w-10 h-10 text-xl",
        lg: "w-12 h-12 text-2xl",
      };
      return iconSizeMap[buttonSize];
    }
    const sizeMap = {
      sm: "text-xs px-3 py-1.5",
      md: "text-sm px-6 py-3",
      lg: "text-base px-9 py-4",
    };
    return sizeMap[buttonSize];
  };

  const getRadiusClasses = (radiusSize: RadiusVariant): string => {
    const radiusMap = {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      full: "rounded-full",
    };
    return radiusMap[radiusSize];
  };

  const finalIsElevation =
    variant === "light" || variant === "underline" ? false : isElevation;

  return (
    <Component
      className={`
        cursor-pointer
        overflow-hidden 
        font-medium
        inline-flex 
        items-center 
        gap-2
        transition-all 
        duration-200 
        ease-in-out
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${alignmentClasses[align]}
        ${finalIsElevation ? "hover:shadow-xl" : ""}
        ${fullWidth ? "w-full" : ""}
        ${isBounce ? "active:scale-95" : ""}
        ${isRelative ? "relative" : ""}
        ${getColorClasses(color, variant)}
        ${getRadiusClasses(radius)}
        ${getSizeClasses(size, isIconOnly)}
        ${isIconOnly ? "p-0" : ""}
        ${className}
      `}
      onClick={handleClick}
      {...props}
    >
      <Ripple variant={variant} ripples={ripples} color={color} />
      <span className="relative z-20 inline-flex items-center gap-2">
        {leftContent}
        <span>{children}</span>
        {rightContent}
      </span>
    </Component>
  );
};
