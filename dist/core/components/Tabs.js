"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, Children, isValidElement } from "react";
import { motion } from "framer-motion";
import { Ripple } from "./Ripples";
import { useRipples } from "../hook/useRipples";
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
    const tabClasses = {
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
                inactive: "bg-transparent border border-primary/50 text-primary -ml-px first:ml-0",
            },
            secondary: {
                active: "border bg-secondary border-secondary/50 text-white",
                inactive: "bg-transparent border border-secondary/50 text-secondary -ml-px first:ml-0",
            },
            danger: {
                active: "border bg-danger border-danger/50 text-white",
                inactive: "bg-transparent border border-danger/50 text-danger -ml-px first:ml-0",
            },
            warning: {
                active: "border bg-warning border-warning/50 text-white",
                inactive: "bg-transparent border border-warning/50 text-warning -ml-px first:ml-0",
            },
            success: {
                active: "border bg-success border-success/50 text-white",
                inactive: "bg-transparent border border-success/50 text-success -ml-px first:ml-0",
            },
            info: {
                active: "border bg-info border-info/50 text-white",
                inactive: "bg-transparent border border-info/50 text-info -ml-px first:ml-0",
            },
            whatsapp: {
                active: "border bg-whatsapp border-whatsapp/50 text-white",
                inactive: "bg-transparent border border-whatsapp/50 text-whatsapp -ml-px first:ml-0",
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
