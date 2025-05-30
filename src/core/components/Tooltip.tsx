import React, { ReactNode, useState, useRef, useEffect } from "react";
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
  maxWidth?: string | number;
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
  maxWidth = "none",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipDimensions, setTooltipDimensions] = useState({
    width: 0,
    height: 0,
  });
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  let timeoutId: NodeJS.Timeout;

  // Medir el tooltip cuando se monta y cuando cambia el contenido
  useEffect(() => {
    if (tooltipRef.current && isVisible) {
      const { width, height } = tooltipRef.current.getBoundingClientRect();
      setTooltipDimensions({ width, height });
    }
  }, [isVisible, content]);

  const handleMouseEnter = () => {
    timeoutId = setTimeout(() => setIsVisible(true), delay);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutId);
    setIsVisible(false);
  };

  const getPositionStyles = () => {
    if (!triggerRef.current) return {};

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const offset = 8; // Espacio entre el trigger y el tooltip

    switch (placement) {
      case "top":
        return {
          bottom: `calc(100% + ${offset}px)`,
          left: "50%",
          transform: "translateX(-50%)",
        };
      case "bottom":
        return {
          top: `calc(100% + ${offset}px)`,
          left: "50%",
          transform: "translateX(-50%)",
        };
      case "left":
        return {
          right: `calc(100% + ${offset}px)`,
          top: "50%",
          transform: "translateY(-50%)",
        };
      case "right":
        return {
          left: `calc(100% + ${offset}px)`,
          top: "50%",
          transform: "translateY(-50%)",
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
      <div ref={triggerRef} className="inline-block" aria-describedby="tooltip">
        {children}
      </div>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={tooltipRef}
            initial={{
              opacity: 0,
              scale: 0.95,
              y: placement === "top" ? 5 : placement === "bottom" ? -5 : 0,
            }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: placement === "top" ? 5 : placement === "bottom" ? -5 : 0,
            }}
            transition={{ duration: 0.15 }}
            style={{
              position: "absolute",
              maxWidth:
                typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth,
              ...getPositionStyles(),
            }}
            className={`
              z-50 whitespace-normal text-center
              shadow-md
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
