"use client";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Ripple } from "./Ripples";
import { useRipples } from "../hook/useRipples";
export const Button = (_a) => {
    var { children, className = "", color = "primary", radius = "md", size = "md", variant = "solid", startContent, endContent, isIconOnly = false, isRelative = true, bounce = true, fullWidth = false, isElevation = true, align = "center", as, onClick } = _a, props = __rest(_a, ["children", "className", "color", "radius", "size", "variant", "startContent", "endContent", "isIconOnly", "isRelative", "bounce", "fullWidth", "isElevation", "align", "as", "onClick"]);
    const { ripples, createRipple } = useRipples();
    const Component = as || "button";
    const BUTTON_CLASSES = {
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
            primary: "border border-primary/50 text-primary hover:bg-primary hover:text-white",
            secondary: "border border-secondary/50 text-secondary hover:bg-secondary hover:text-white",
            danger: "border border-danger/50 text-danger hover:bg-danger hover:text-white",
            warning: "border border-warning/50 text-warning hover:bg-warning hover:text-white",
            success: "border border-success/50 text-success hover:bg-success hover:text-white",
            info: "border border-info/50 text-info hover:bg-info hover:text-white",
            whatsapp: "border border-whatsapp/50 text-whatsapp hover:bg-whatsapp hover:text-white",
        },
        soft: {
            primary: "bg-primary/10 text-primary hover:bg-primary hover:text-white",
            secondary: "bg-secondary/10 text-secondary hover:bg-secondary hover:text-white",
            danger: "bg-danger/10 text-danger hover:bg-danger hover:text-white",
            warning: "bg-warning/10 text-warning hover:bg-warning hover:text-white",
            success: "bg-success/10 text-success hover:bg-success hover:text-white",
            info: "bg-info/10 text-info hover:bg-info hover:text-white",
            whatsapp: "bg-whatsapp/10 text-whatsapp hover:bg-whatsapp hover:text-white",
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
            secondary: "text-secondary border-b border-secondary hover:bg-secondary/10",
            danger: "text-danger border-b border-danger hover:bg-danger/10",
            warning: "text-warning border-b border-warning hover:bg-warning/10",
            success: "text-success border-b border-success hover:bg-success/10",
            info: "text-info border-b border-info hover:bg-info/10",
            whatsapp: "text-whatsapp border-b border-whatsapp hover:bg-whatsapp/10",
        },
    };
    const handleClick = (event) => {
        createRipple(event);
        if (onClick) {
            onClick(event);
        }
    };
    const getColorClasses = (colorName, variant) => {
        return BUTTON_CLASSES[variant][colorName];
    };
    const alignmentClasses = {
        left: "justify-start",
        center: "justify-center",
        right: "justify-end",
    };
    const getSizeClasses = (buttonSize, isIconOnly) => {
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
    const getRadiusClasses = (radiusSize) => {
        const radiusMap = {
            none: "rounded-none",
            sm: "rounded-sm",
            md: "rounded-md",
            lg: "rounded-lg",
            full: "rounded-full",
        };
        return radiusMap[radiusSize];
    };
    const finalIsElevation = variant === "light" || variant === "underline" ? false : isElevation;
    return (_jsxs(Component, Object.assign({ className: `
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
        ${bounce ? "active:scale-95" : ""}
        ${isRelative ? "relative" : ""}
        ${getColorClasses(color, variant)}
        ${getRadiusClasses(radius)}
        ${getSizeClasses(size, isIconOnly)}
        ${isIconOnly ? "p-0" : ""}
        ${className}
      `, onClick: handleClick }, props, { children: [_jsx(Ripple, { variant: variant, ripples: ripples, color: color }), _jsxs("span", { className: "relative z-20 inline-flex items-center gap-2", children: [startContent, children, endContent] })] })));
};
