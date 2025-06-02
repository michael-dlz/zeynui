"use client";

import { ElementType, MouseEvent, ReactNode } from "react";
import { Ripple } from "./Ripples";
import {
  AlignmentVariant,
  ColorVariant,
  PolymorphicComponentProp,
  RadiusVariant,
  SizeVariant,
  StyleVariant,
} from "../types";
import { useRipples } from "../hook/useRipples";
import {
  BUTTON_CLASSES,
  RADIUS_CLASSES,
  SIZE_CLASSES,
  SIZE_CLASSES_ONLY_ICON,
} from "../constants/classes";

type ButtonVariantsProps = {
  color?: ColorVariant;
  radius?: RadiusVariant;
  size?: SizeVariant;
  variant?: StyleVariant;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  topContent?: ReactNode;
  bottomContent?: ReactNode;
  isIconOnly?: boolean;
  className?: string;
  isRelative?: boolean;
  isBounce?: boolean;
  fullWidth?: boolean;
  isElevation?: boolean;
  align?: AlignmentVariant;
};

type ButtonProps<C extends ElementType> = PolymorphicComponentProp<
  C,
  ButtonVariantsProps
>;

export const Button = <C extends ElementType = "button">({
  children,
  className = "",
  color = "primary",
  radius = "md",
  size = "md",
  variant = "solid",
  leftContent,
  rightContent,
  topContent,
  bottomContent,
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

  const handleClick = (event: MouseEvent<HTMLElement>) => {
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

  const alignmentClasses: Record<AlignmentVariant, string> = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };

  const getSizeClasses = (
    buttonSize: SizeVariant,
    isIconOnly: boolean
  ): string => {
    if (isIconOnly) {
      return SIZE_CLASSES_ONLY_ICON[buttonSize];
    }
    return SIZE_CLASSES[buttonSize];
  };

  const getRadiusClasses = (radiusSize: RadiusVariant): string => {
    return RADIUS_CLASSES[radiusSize];
  };

  return (
    <Component
      className={`
        cursor-pointer
        overflow-hidden 
        font-medium
        flex
        ${leftContent || rightContent ? "" : "flex-col inline-flex"}
        items-center 
        gap-1
        transition-all 
        duration-200 
        ease-in-out
        disabled:opacity-50
        disabled:cursor-not-allowed
        focus-visible:ring-2
        focus-visible:ring-offset-1
        focus-visible:outline-none
        ${alignmentClasses[align]}
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
      {topContent && (
        <div className="relative z-20 inline-flex items-center gap-2">
          {topContent}
        </div>
      )}
      <span className="relative z-20 inline-flex items-center gap-2">
        {leftContent}
        <span>{children}</span>
        {rightContent}
      </span>
      {bottomContent && (
        <div className="relative z-20 inline-flex items-center gap-2">
          {bottomContent}
        </div>
      )}
    </Component>
  );
};
