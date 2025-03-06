import React, { ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ColorVariant,
  RadiusVariant,
  SizeVariant,
  StyleVariant,
  VariantClasses,
} from "../types";

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
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  placement = "top",
  color = "primary",
  variant = "solid",
  size = "md",
  radius = "md",
  delay = 0,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  let timeoutId: NodeJS.Timeout;
  const handleMouseEnter = () => {
    timeoutId = setTimeout(() => setIsVisible(true), delay);
  };
  const handleMouseLeave = () => {
    clearTimeout(timeoutId);
    setIsVisible(false);
  };
  const getPosition = () => {
    switch (placement) {
      case "top":
        return {
          bottom: "100%",
          marginBottom: "0.5rem",
        };
      case "bottom":
        return {
          top: "100%",
          marginTop: "0.5rem",
        };
      case "left":
        return {
          right: "100%",
          marginRight: "0.5rem",
        };
      case "right":
        return {
          left: "100%",
          marginLeft: "0.5rem",
        };
    }
  };
  const colorClasses: VariantClasses = {
    solid: {
      primary: "bg-primary text-white",
      secondary: "bg-secondary text-white",
      danger: "bg-danger text-white",
      warning: "bg-warning text-white",
      success: "bg-success text-white",
      info: "bg-info text-black",
      whatsapp: "bg-whatsapp text-white",
    },
    outline: {
      primary: "border border-primary/50 text-primary",
      secondary: "border border-secondary/50 text-secondary",
      danger: "border border-danger/50 text-danger",
      warning: "border border-warning/50 text-warning",
      success: "border border-success/50 text-success",
      info: "border border-info/50 text-info",
      whatsapp: "border border-whatsapp/50 text-whatsapp",
    },
    soft: {
      primary: "bg-primary/10 text-primary",
      secondary: "bg-secondary/10 text-secondary",
      danger: "bg-danger/10 text-danger",
      warning: "bg-warning/10 text-warning",
      success: "bg-success/10 text-success",
      info: "bg-info/10 text-info hover:bg-info",
      whatsapp: "bg-whatsapp/10 text-whatsapp",
    },
    light: {
      primary: "text-primary",
      secondary: "text-secondary",
      danger: "text-danger",
      warning: "text-warning",
      success: "text-success",
      info: "text-info",
      whatsapp: "text-whatsapp",
    },
    underline: {
      primary: "text-primary border-b border-primary",
      secondary: "text-secondary border-b border-secondary",
      danger: "text-danger border-b border-danger",
      warning: "text-warning border-b border-warning",
      success: "text-success border-b border-success",
      info: "text-info border-b border-info",
      whatsapp: "text-whatsapp border-b border-whatsapp",
    },
    ghost: {
      primary: "text-black",
      secondary: "text-black",
      danger: "text-black",
      warning: "text-black",
      success: "text-black",
      info: "text-black",
      whatsapp: "text-black",
    },
  };
  const getColorClasses = (
    colorName: ColorVariant,
    variant: StyleVariant
  ): string => {
    return colorClasses[variant][colorName];
  };
  const getSizeClasses = (chipSize: SizeVariant): string => {
    const sizeMap = {
      sm: "px-2 py-1 text-xs",
      md: "px-3 py-1.5 text-sm",
      lg: "px-4 py-2 text-base",
      xl: "px-5 py-2.5 text-lg",
      "2xl": "px-6 py-3 text-xl",
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
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      <div className="inline-block" aria-describedby="tooltip">
        {children}
      </div>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
            }}
            transition={{
              duration: 0.15,
            }}
            style={getPosition()}
            className={`
              absolute z-50 whitespace-nowrap w-full text-center
              ${getColorClasses(color, variant)}
              ${getRadiusClasses(radius)}
              ${getSizeClasses(size)}
              ${className}
            `}
            role="tooltip"
            id="tooltip"
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
