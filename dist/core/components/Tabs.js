"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, Children, isValidElement } from "react";
import { motion } from "framer-motion";
import { Ripple } from "./Ripples";
import { useRipples } from "../hook/useRipples";
import { TAB_CLASSES } from "../constants/classes";
export const Tabs = ({ children, defaultTab, color = "primary", variant = "solid", radius = "none", className = "", size = "md", onSelectionChange, }) => {
    const [activeTab, setActiveTab] = useState(() => {
        // Si no se proporciona un defaultTab, busca la pestaña con isDefault
        if (!defaultTab) {
            const defaultTabChild = Children.toArray(children)
                .filter(isValidElement)
                .find((child) => child.props.isDefault);
            return defaultTabChild
                ? defaultTabChild.props.title
                : "";
        }
        return defaultTab;
    });
    const handleTabChange = (title, event) => {
        setActiveTab(title);
        if (onSelectionChange)
            onSelectionChange(title);
    };
    return (_jsxs("div", { className: `w-full flex flex-col gap-4 ${className}`, children: [_jsx("div", { className: "overflow-x-auto", children: _jsx(motion.div, { className: "flex", initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, children: children &&
                        Children.toArray(children)
                            .filter(isValidElement)
                            .map((child) => {
                            if (!isValidElement(child))
                                return null;
                            const { title, leftContent, rightContent, topContent, bottomContent, active, } = child.props;
                            const isActive = active !== undefined ? active : activeTab === title;
                            const { createRipple, ripples } = useRipples();
                            return (_jsxs("button", { onClick: (e) => {
                                    handleTabChange(title, e);
                                    createRipple(e);
                                }, className: `relative overflow-hidden px-6 py-3 font-medium 
                      inline-flex flex-col items-center gap-2
                      transition-all duration-200 ease-in-out
                      disabled:opacity-50 disabled:cursor-not-allowed z-20
                      cursor-pointer whitespace-nowrap
                      ${getRadiusClasses(radius)}
                      ${getSizeClasses(size)}
                      ${getTabClasses(color, variant, isActive)}`, type: "button", children: [topContent && _jsx("div", { children: topContent }), _jsxs("div", { className: "flex items-center gap-2", children: [leftContent && _jsx("div", { children: leftContent }), title, rightContent && _jsx("div", { children: rightContent })] }), bottomContent && _jsx("div", { children: bottomContent }), _jsx(Ripple, { variant: variant, ripples: ripples, color: color })] }, title));
                        }) }) }), _jsx("div", { className: "relative", children: Children.map(children, (child) => {
                    if (!isValidElement(child))
                        return null;
                    const { title, active } = child.props;
                    const isActive = active !== undefined ? active : activeTab === title;
                    if (!isActive)
                        return null;
                    return _jsx("div", { children: child.props.children }, title);
                }) })] }));
};
// Funciones de utilidad
const getTabClasses = (color, variant, isActive) => {
    return isActive
        ? TAB_CLASSES[variant][color].active
        : TAB_CLASSES[variant][color].inactive;
};
const getRadiusClasses = (radius) => {
    const radiusMap = {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
    };
    return radiusMap[radius];
};
const getSizeClasses = (size) => {
    const sizeMap = {
        sm: "text-xs px-3 py-1.5",
        md: "text-sm px-6 py-3",
        lg: "text-base px-9 py-4",
    };
    return sizeMap[size];
};
export const Tab = ({ title, children, leftContent, rightContent, topContent, bottomContent, as: Component = "div", href, }) => {
    return (_jsxs(Component, { href: href, className: "w-full", children: [topContent && _jsx("div", { children: topContent }), _jsxs("div", { className: "flex items-center gap-2", children: [leftContent && _jsx("div", { children: leftContent }), title, rightContent && _jsx("div", { children: rightContent })] }), bottomContent && _jsx("div", { children: bottomContent }), children] }));
};
