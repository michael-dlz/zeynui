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
import { jsx as _jsx } from "react/jsx-runtime";
export const Text = (_a) => {
    var { size = "base", className = "", weight = "normal", children, as } = _a, props = __rest(_a, ["size", "className", "weight", "children", "as"]);
    const getSizeClasses = (size) => {
        const sizeMap = {
            xs: `
        text-xs
        leading-normal
        tracking-normal
      `,
            sm: `
        text-sm
        leading-normal
        tracking-normal
      `,
            base: `
        text-base
        leading-relaxed
        tracking-normal
      `,
            lg: `
        text-lg sm:text-xl
        leading-relaxed
        tracking-normal
      `,
            xl: `
        text-xl sm:text-2xl
        leading-snug
        tracking-tight
      `,
            "2xl": `
        text-2xl sm:text-3xl lg:text-4xl
        leading-tight
        tracking-tight
      `,
            "3xl": `
        text-3xl sm:text-4xl lg:text-5xl
        leading-tight
        tracking-tighter
      `,
        };
        return sizeMap[size];
    };
    const getWeightClasses = (weight) => {
        const weightMap = {
            normal: "font-normal",
            medium: "font-medium",
            semibold: "font-semibold",
            bold: "font-bold",
        };
        return weightMap[weight] || weightMap.normal;
    };
    const getDefaultElement = (size) => {
        if (size === "3xl" || size === "2xl")
            return "h1";
        if (size === "xl")
            return "h2";
        if (size === "lg")
            return "h3";
        return "p";
    };
    const Component = as || getDefaultElement(size);
    return (_jsx(Component, Object.assign({ className: `
        ${getSizeClasses(size)}
        ${getWeightClasses(weight)}
        ${as === "p" ? "text-[#545c75]" : ""}
        ${className}
      ` }, props, { children: children })));
};
