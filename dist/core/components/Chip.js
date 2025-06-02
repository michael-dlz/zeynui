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
import { CHIP_CLASSES } from "../constants/classes";
export const Chip = (_a) => {
    var { children, className = "", color = "primary", radius = "md", size = "sm", variant = "solid", leftContent, rightContent, isIconOnly = false, isRelative = true, fullWidth = false, align = "center", onClick, onClose } = _a, props = __rest(_a, ["children", "className", "color", "radius", "size", "variant", "leftContent", "rightContent", "isIconOnly", "isRelative", "fullWidth", "align", "onClick", "onClose"]);
    const getColorClasses = (colorName, variant) => {
        return CHIP_CLASSES[variant][colorName];
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
