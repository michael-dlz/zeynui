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
import { TAB_CLASSES } from "../constants/classes";

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

  const handleTabChange = (title: string, event: React.MouseEvent) => {
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
                  active,
                } = child.props as TabProps;
                const isActive =
                  active !== undefined ? active : activeTab === title;

                const { createRipple, ripples } = useRipples();

                return (
                  <button
                    key={title}
                    onClick={(e) => {
                      handleTabChange(title, e);
                      createRipple(e);
                    }}
                    className={`relative overflow-hidden px-6 py-3 font-medium 
                      inline-flex flex-col items-center gap-2
                      transition-all duration-200 ease-in-out
                      disabled:opacity-50 disabled:cursor-not-allowed z-20
                      cursor-pointer whitespace-nowrap
                      ${getRadiusClasses(radius)}
                      ${getSizeClasses(size)}
                      ${getTabClasses(color, variant, isActive)}`}
                    type="button"
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
  return isActive
    ? TAB_CLASSES[variant][color].active
    : TAB_CLASSES[variant][color].inactive;
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
