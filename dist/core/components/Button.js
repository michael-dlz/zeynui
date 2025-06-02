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
import { BUTTON_CLASSES, RADIUS_CLASSES, SIZE_CLASSES, SIZE_CLASSES_ONLY_ICON, } from "../constants/classes";
export const Button = (_a) => {
    var { children, className = "", color = "primary", radius = "md", size = "md", variant = "solid", leftContent, rightContent, topContent, bottomContent, isIconOnly = false, isRelative = true, isBounce = true, fullWidth = false, isElevation = true, align = "center", as, onClick } = _a, props = __rest(_a, ["children", "className", "color", "radius", "size", "variant", "leftContent", "rightContent", "topContent", "bottomContent", "isIconOnly", "isRelative", "isBounce", "fullWidth", "isElevation", "align", "as", "onClick"]);
    const { ripples, createRipple } = useRipples();
    const Component = as || "button";
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
            return SIZE_CLASSES_ONLY_ICON[buttonSize];
        }
        return SIZE_CLASSES[buttonSize];
    };
    const getRadiusClasses = (radiusSize) => {
        return RADIUS_CLASSES[radiusSize];
    };
    return (_jsxs(Component, Object.assign({ className: `
        cursor-pointer
        overflow-hidden 
        font-medium
        flex
        ${leftContent || rightContent ? "" : "flex-col inline-flex"}
        items-center 
        gap-1
        transition-all 
        duration-200 
        ease-in-out
        disabled:opacity-50
        disabled:cursor-not-allowed
        focus-visible:ring-2
        focus-visible:ring-offset-1
        focus-visible:outline-none
        ${alignmentClasses[align]}
        ${fullWidth ? "w-full" : ""}
        ${isBounce ? "active:scale-95" : ""}
        ${isRelative ? "relative" : ""}
        ${getColorClasses(color, variant)}
        ${getRadiusClasses(radius)}
        ${getSizeClasses(size, isIconOnly)}
        ${isIconOnly ? "p-0" : ""}
        ${className}
      `, onClick: handleClick }, props, { children: [_jsx(Ripple, { variant: variant, ripples: ripples, color: color }), topContent && (_jsx("div", { className: "relative z-20 inline-flex items-center gap-2", children: topContent })), _jsxs("span", { className: "relative z-20 inline-flex items-center gap-2", children: [leftContent, _jsx("span", { children: children }), rightContent] }), bottomContent && (_jsx("div", { className: "relative z-20 inline-flex items-center gap-2", children: bottomContent }))] })));
};
