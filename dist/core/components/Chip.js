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
export const Chip = (_a) => {
    var { children, className = "", color = "primary", radius = "md", size = "md", variant = "solid", leftContent, rightContent, isIconOnly = false, isRelative = true, fullWidth = false, align = "center", onClick, onClose } = _a, props = __rest(_a, ["children", "className", "color", "radius", "size", "variant", "leftContent", "rightContent", "isIconOnly", "isRelative", "fullWidth", "align", "onClick", "onClose"]);
    const chipClasses = {
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
            info: "bg-info/10 text-info",
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
    };
    const getColorClasses = (colorName, variant) => {
        return chipClasses[variant][colorName];
    };
    const alignmentClasses = {
        left: "justify-start",
        center: "justify-center",
        right: "justify-end",
    };
    const getSizeClasses = (chipSize, isIconOnly) => {
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
    return (_jsx("div", Object.assign({ className: `
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
      ` }, props, { children: _jsxs("span", { className: "relative z-10 inline-flex items-center gap-2", children: [leftContent, _jsx("span", { children: children }), rightContent, onClose && (_jsx("button", { onClick: (e) => {
                        e.stopPropagation();
                        onClose();
                    }, className: "hover:opacity-70 transition-opacity", children: _jsx("span", { children: "x" }) }))] }) })));
};
