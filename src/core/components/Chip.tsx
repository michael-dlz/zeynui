"use client";
import { CHIP_CLASSES } from "../constants/classes";
import {
  AlignmentVariant,
  ColorVariant,
  RadiusVariant,
  SizeVariant,
  StyleVariant,
  VariantClasses,
} from "../types";
type ChipProps = {
  color?: ColorVariant;
  radius?: RadiusVariant;
  size?: SizeVariant;
  variant?: StyleVariant;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  isIconOnly?: boolean;
  className?: string;
  isRelative?: boolean;
  bounce?: boolean;
  fullWidth?: boolean;
  align?: AlignmentVariant;
  children: React.ReactNode;
  onClick?: () => void;
  onClose?: () => void;
};

export const Chip = ({
  children,
  className = "",
  color = "primary",
  radius = "md",
  size = "sm",
  variant = "solid",
  leftContent,
  rightContent,
  isIconOnly = false,
  isRelative = true,
  fullWidth = false,
  align = "center",
  onClick,
  onClose,
  ...props
}: ChipProps) => {
  const getColorClasses = (
    colorName: ColorVariant,
    variant: StyleVariant
  ): string => {
    return CHIP_CLASSES[variant][colorName];
  };
  const alignmentClasses = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };
  const getSizeClasses = (
    chipSize: SizeVariant,
    isIconOnly: boolean
  ): string => {
    if (isIconOnly) {
      const iconSizeMap = {
        sm: "w-6 h-6 text-sm",
        md: "w-8 h-8 text-base",
        lg: "w-10 h-10 text-lg",
      };
      return iconSizeMap[chipSize];
    }
    const sizeMap = {
      sm: "text-xs px-2 py-1",
      md: "text-sm px-3 py-1.5",
      lg: "text-base px-4 py-2",
    };
    return sizeMap[chipSize];
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

  return (
    <div
      className={`
        overflow-hidden 
        font-medium
        inline-flex 
        items-center 
        gap-2
        cursor-default
        transition-all 
        duration-200 
        ease-in-out
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${alignmentClasses[align]}
        ${fullWidth ? "w-full" : ""}
        ${isRelative ? "relative" : ""}
        ${getColorClasses(color, variant)}
        ${getRadiusClasses(radius)}
        ${getSizeClasses(size, isIconOnly)}
        ${isIconOnly ? "p-0" : ""}
        ${className}
      `}
      {...props}
    >
      <span className="relative z-10 inline-flex items-center gap-2">
        {leftContent}
        <span>{children}</span>
        {rightContent}
        {onClose && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="hover:opacity-70 transition-opacity"
          >
            <span>{"x"}</span>
          </button>
        )}
      </span>
    </div>
  );
};
