"use client";

import React, { useState, Children, isValidElement, ReactElement } from "react";
import { motion } from "framer-motion";
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
  size?: SizeVariant;
  onSelectionChange?: (selectedKey: string) => void;
}

export const Tabs = ({
  children,
  defaultTab,
  color = "primary",
  variant = "solid",
  radius = "none",
  className = "",
  size = "md",
  onSelectionChange,
}: TabsProps) => {
  const [activeTab, setActiveTab] = useState<string>(() => {
    // Si no se proporciona un defaultTab, busca la pestaña con isDefault
    if (!defaultTab) {
      const defaultTabChild = Children.toArray(children)
        .filter(isValidElement)
        .find((child) => (child as ReactElement<TabProps>).props.isDefault);

      return defaultTabChild
        ? (defaultTabChild as ReactElement<TabProps>).props.title
        : "";
    }
    return defaultTab;
  });

  const handleTabChange = (title: string) => {
    setActiveTab(title);
    if (onSelectionChange) onSelectionChange(title);
  };

  return (
    <div className={`w-full flex flex-col gap-4 ${className}`}>
      <div className="overflow-x-auto">
        <motion.div
          className="flex"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {children &&
            Children.toArray(children)
              .filter(isValidElement)
              .map((child) => {
                if (!isValidElement(child)) return null;
                const {
                  title,
                  leftContent,
                  rightContent,
                  topContent,
                  bottomContent,
                  active, // Prop active
                } = child.props as TabProps;
                const isActive =
                  active !== undefined ? active : activeTab === title;

                const { createRipple, ripples } = useRipples();

                return (
                  <button
                    onClick={(e) => {
                      handleTabChange(title);
                      createRipple(e);
                    }}
                    className={`
                      relative overflow-hidden px-6 py-3 font-medium 
                      inline-flex flex-col items-center gap-2
                      transition-all duration-200 ease-in-out
                      disabled:opacity-50 disabled:cursor-not-allowed z-20
                      cursor-pointer whitespace-nowrap
                      ${getRadiusClasses(radius)}
                      ${getSizeClasses(size)}
                      ${getTabClasses(color, variant, isActive)}
                    `}
                  >
                    {topContent && <div>{topContent}</div>}
                    <div className="flex items-center gap-2">
                      {leftContent && <div>{leftContent}</div>}
                      {title}
                      {rightContent && <div>{rightContent}</div>}
                    </div>
                    {bottomContent && <div>{bottomContent}</div>}
                    <Ripple variant={variant} ripples={ripples} color={color} />
                  </button>
                );
              })}
        </motion.div>
      </div>

      <div className="relative">
        {Children.map(children, (child) => {
          if (!isValidElement(child)) return null;
          const { title, active } = child.props as TabProps;
          const isActive = active !== undefined ? active : activeTab === title;
          if (!isActive) return null;
          return <div key={title}>{(child.props as TabProps).children}</div>;
        })}
      </div>
    </div>
  );
};

// Funciones de utilidad
const getTabClasses = (
  color: ColorVariant,
  variant: StyleVariant,
  isActive: boolean
): string => {
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
  return isActive
    ? tabClasses[variant][color].active
    : tabClasses[variant][color].inactive;
};

const getRadiusClasses = (radius: RadiusVariant): string => {
  const radiusMap = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };
  return radiusMap[radius];
};

const getSizeClasses = (size: SizeVariant): string => {
  const sizeMap = {
    sm: "text-xs px-3 py-1.5",
    md: "text-sm px-6 py-3",
    lg: "text-base px-9 py-4",
    xl: "text-lg px-12 py-5",
    "2xl": "text-xl px-14 py-6",
  };
  return sizeMap[size];
};

export interface TabProps {
  title: string;
  children?: React.ReactNode;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  topContent?: React.ReactNode;
  bottomContent?: React.ReactNode;
  as?: React.ElementType;
  href?: string;
  isDefault?: boolean;
  active?: boolean;
}

export const Tab = ({
  title,
  children,
  leftContent,
  rightContent,
  topContent,
  bottomContent,
  as: Component = "div",
  href,
}: TabProps) => {
  return (
    <Component href={href} className="w-full">
      {topContent && <div>{topContent}</div>}
      <div className="flex items-center gap-2">
        {leftContent && <div>{leftContent}</div>}
        {title}
        {rightContent && <div>{rightContent}</div>}
      </div>
      {bottomContent && <div>{bottomContent}</div>}
      {children}
    </Component>
  );
};
