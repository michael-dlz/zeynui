import React, { useState, Children, isValidElement, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Ripple } from "./Ripples";
import {
  ColorVariant,
  RadiusVariant,
  SizeVariant,
  StyleVariant,
  VarianActiveClasses,
} from "../types";
import { useRipples } from "../hook/useRipples";

export interface TabsProps {
  children: React.ReactNode;
  defaultTab?: string;
  color?: ColorVariant;
  variant?: StyleVariant;
  radius?: RadiusVariant;
  className?: string;
  isIconOnly?: boolean;
  size?: SizeVariant;
  onSelectionChange?: (selectedKey: string) => void;
}

export const Tabs = ({
  children,
  defaultTab,
  color = "danger",
  variant = "soft",
  radius = "none",
  className = "",
  isIconOnly = false,
  size = "md",
  onSelectionChange,
}: TabsProps) => {
  const [activeTab, setActiveTab] = useState<string>("");

  const tabClasses: VarianActiveClasses = {
    solid: {
      primary: { active: "bg-primary text-white", inactive: "text-primary" },
      secondary: {
        active: "bg-secondary text-white",
        inactive: "text-secondary",
      },
      danger: { active: "bg-danger text-white", inactive: "text-danger" },
      warning: { active: "bg-warning text-white", inactive: "text-warning" },
      success: { active: "bg-success text-white", inactive: "text-success" },
      info: { active: "bg-info text-white", inactive: "text-info" },
      whatsapp: { active: "bg-whatsapp text-white", inactive: "text-whatsapp" },
    },
    outline: {
      primary: {
        active: "border bg-primary border-primary/50 text-white",
        inactive:
          "bg-transparent border border-primary/50 text-primary -ml-px first:ml-0",
      },
      secondary: {
        active: "border bg-secondary border-secondary/50 text-white",
        inactive:
          "bg-transparent border border-secondary/50 text-secondary -ml-px first:ml-0",
      },
      danger: {
        active: "border bg-danger border-danger/50 text-white",
        inactive:
          "bg-transparent border border-danger/50 text-danger -ml-px first:ml-0",
      },
      warning: {
        active: "border bg-warning border-warning/50 text-white",
        inactive:
          "bg-transparent border border-warning/50 text-warning -ml-px first:ml-0",
      },
      success: {
        active: "border bg-success border-success/50 text-white",
        inactive:
          "bg-transparent border border-success/50 text-success -ml-px first:ml-0",
      },
      info: {
        active: "border bg-info border-info/50 text-white",
        inactive:
          "bg-transparent border border-info/50 text-info -ml-px first:ml-0",
      },
      whatsapp: {
        active: "border bg-whatsapp border-whatsapp/50 text-white",
        inactive:
          "bg-transparent border border-whatsapp/50 text-whatsapp -ml-px first:ml-0",
      },
    },
    soft: {
      primary: {
        active: "bg-primary/10 text-primary",
        inactive: "bg-primary/5 text-primary",
      },
      secondary: {
        active: "bg-secondary/10 text-secondary",
        inactive: "bg-secondary/5 text-secondary",
      },
      danger: {
        active: "bg-danger/10 text-danger",
        inactive: "bg-danger/5 text-danger",
      },
      warning: {
        active: "bg-warning/10 text-warning",
        inactive: "bg-warning/5 text-warning",
      },
      success: {
        active: "bg-success/10 text-success",
        inactive: "bg-success/5 text-success",
      },
      info: { active: "bg-info/10 text-info", inactive: "bg-info/5 text-info" },
      whatsapp: {
        active: "bg-whatsapp/10 text-whatsapp",
        inactive: "bg-whatsapp/5 text-whatsapp",
      },
    },
    light: {
      primary: {
        active: "bg-primary/5 text-primary",
        inactive: "bg-primary/2 text-primary/50",
      },
      secondary: {
        active: "bg-secondary/5 text-secondary",
        inactive: "bg-secondary/2 text-secondary/50",
      },
      danger: {
        active: "bg-danger/5 text-danger",
        inactive: "bg-danger/2 text-danger/50",
      },
      warning: {
        active: "bg-warning/5 text-warning",
        inactive: "bg-warning/2 text-warning/50",
      },
      success: {
        active: "bg-success/5 text-success",
        inactive: "bg-success/2 text-success/50",
      },
      info: {
        active: "bg-info/5 text-info",
        inactive: "bg-info/2 text-info/50",
      },
      whatsapp: {
        active: "bg-whatsapp/5 text-whatsapp",
        inactive: "bg-whatsapp/2 text-whatsapp/50",
      },
    },
    underline: {
      primary: {
        active: "border-b-2 border-primary text-primary",
        inactive: "border-b-2 border-transparent text-primary",
      },
      secondary: {
        active: "border-b-2 border-secondary text-secondary",
        inactive: "border-b-2 border-transparent text-secondary",
      },
      danger: {
        active: "border-b-2 border-danger text-danger",
        inactive: "border-b-2 border-transparent text-danger",
      },
      warning: {
        active: "border-b-2 border-warning text-warning",
        inactive: "border-b-2 border-transparent text-warning",
      },
      success: {
        active: "border-b-2 border-success text-success",
        inactive: "border-b-2 border-transparent text-success",
      },
      info: {
        active: "border-b-2 border-info text-info",
        inactive: "border-b-2 border-transparent text-info",
      },
      whatsapp: {
        active: "border-b-2 border-whatsapp text-whatsapp",
        inactive: "border-b-2 border-transparent text-whatsapp",
      },
    },
    ghost: {
      primary: {
        active: "text-primary",
        inactive: "text-primary/50",
      },
      secondary: {
        active: "text-secondary",
        inactive: "text-secondary/50",
      },
      danger: {
        active: "text-danger",
        inactive: "text-danger/50",
      },
      warning: {
        active: "text-warning",
        inactive: "text-warning/50",
      },
      success: {
        active: "text-success",
        inactive: "text-success/50",
      },
      info: {
        active: "text-info",
        inactive: "text-info/50",
      },
      whatsapp: {
        active: "text-whatsapp",
        inactive: "text-whatsapp/50",
      },
    },
  };

  // Obtener los títulos de las pestañas
  const tabs = Children.toArray(children)
    .filter(
      (child): child is React.ReactElement<{ title: string }> =>
        isValidElement(child) &&
        typeof (child as React.ReactElement<{ title: string }>).props.title ===
          "string"
    )
    .map((child) => isValidElement(child) && child.props.title);

  // Establecer la pestaña activa por defecto
  useEffect(() => {
    setActiveTab(defaultTab || tabs[0] || "");
  }, [defaultTab]);

  // Notificar cuando cambia la pestaña seleccionada
  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(activeTab);
    }
  }, [activeTab, onSelectionChange]);

  // Mapeo de clases de color (con estados activo e inactivo)

  // Funciones de utilidad
  const getTabClasses = (
    colorName: ColorVariant,
    variant: StyleVariant,
    isActive: boolean
  ): string => {
    return tabClasses[variant][colorName][isActive ? "active" : "inactive"];
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

  const getSizeClasses = (
    buttonSize: SizeVariant,
    isIconOnly: boolean
  ): string => {
    if (isIconOnly) {
      const iconSizeMap = {
        sm: "w-8 h-8 text-lg",
        md: "w-10 h-10 text-xl",
        lg: "w-12 h-12 text-2xl",
        xl: "w-14 h-14 text-3xl",
        "2xl": "w-16 h-16 text-4xl",
      };
      return iconSizeMap[buttonSize];
    }
    const sizeMap = {
      sm: "text-xs px-3 py-1.5",
      md: "text-sm px-6 py-3",
      lg: "text-base px-9 py-4",
      xl: "text-lg px-12 py-5",
      "2xl": "text-xl px-14 py-6",
    };
    return sizeMap[buttonSize];
  };

  return (
    <div className={`w-full flex flex-col gap-4 ${className}`}>
      {/* Botones de las pestañas */}
      <motion.div
        className={`flex`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {Children.map(children, (child) => {
          if (!isValidElement(child)) return null;
          const { title } = (child as React.ReactElement<{ title: string }>)
            .props;
          const isActive = activeTab === title;

          // Cada botón tiene su propio estado de ripples
          const { createRipple, ripples } = useRipples();

          return (
            <button
              onClick={(e) => {
                setActiveTab(title);
                createRipple(e);
              }}
              className={`
                  relative overflow-hidden px-6 py-3 font-medium 
                  inline-flex items-center gap-2
                  transition-all duration-200 ease-in-out
                  disabled:opacity-50 disabled:cursor-not-allowed z-20
                  cursor-pointer
                  ${getRadiusClasses(radius)}
                  ${getSizeClasses(size, isIconOnly)}
                  ${getTabClasses(color, variant, isActive)}
                `}
            >
              {title}
              <Ripple variant={variant} ripples={ripples} color={color} />
            </button>
          );
        })}
      </motion.div>

      {/* Contenido de las pestañas */}
      <div className="relative">
        <AnimatePresence mode="wait">
          {Children.map(children, (child) => {
            if (!isValidElement(child)) return null;
            const { title } = (child as React.ReactElement<{ title: string }>)
              .props;
            if (activeTab !== title) return null;
            return (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {child}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export interface TabProps {
  title: string;
  children?: React.ReactNode;
  className?: string;
}

export const Tab: React.FC<TabProps> = ({ children, className = "" }) => {
  return <div className={`${className}`}>{children}</div>;
};
