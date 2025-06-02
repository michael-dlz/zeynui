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
import { Text } from "@zeynui/react";
import { useEffect, useRef, forwardRef } from "react";
import { twMerge } from "tailwind-merge";
export const Checkbox = forwardRef((_a, ref) => {
    var { checked, onChange, indeterminate = false, className = "", label = "", color = "primary", disabled = false } = _a, props = __rest(_a, ["checked", "onChange", "indeterminate", "className", "label", "color", "disabled"]);
    const innerRef = useRef(null);
    // Combina las refs
    useEffect(() => {
        if (typeof ref === "function") {
            ref(innerRef.current);
        }
        else if (ref) {
            ref.current = innerRef.current;
        }
    }, [ref]);
    useEffect(() => {
        if (innerRef.current) {
            innerRef.current.indeterminate = indeterminate;
        }
    }, [indeterminate]);
    const getColorClasses = (colorName) => {
        const colorMap = {
            primary: "text-primary focus:ring-primary checked:bg-primary checked:border-primary",
            secondary: "text-secondary focus:ring-secondary checked:bg-secondary checked:border-secondary",
            success: "text-success focus:ring-success checked:bg-success checked:border-success",
            danger: "text-danger focus:ring-danger checked:bg-danger checked:border-danger",
            warning: "text-warning focus:ring-warning checked:bg-warning checked:border-warning",
            info: "text-info focus:ring-info checked:bg-info checked:border-info",
            whatsapp: "text-whatsapp focus:ring-whatsapp checked:bg-whatsapp checked:border-whatsapp",
        };
        return colorMap[colorName];
    };
    return (_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("div", { className: "relative flex items-center", children: [_jsx("input", Object.assign({ type: "checkbox", ref: innerRef, checked: checked, onChange: onChange, disabled: disabled, className: twMerge("peer relative size-5 cursor-pointer appearance-none rounded-md border border-gray-300", "transition-all duration-200 ease-in-out", "focus:outline-none focus:ring-2 focus:ring-offset-2", "disabled:cursor-not-allowed disabled:opacity-50", "checked:border-transparent", getColorClasses(color), className) }, props)), _jsx("svg", { className: twMerge("pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-3", "fill-none stroke-white stroke-[4] opacity-0 transition-opacity", "peer-checked:opacity-100", indeterminate ? "peer-checked:hidden" : ""), viewBox: "0 0 24 24", children: _jsx("polyline", { points: "20 6 9 17 4 12" }) }), indeterminate && (_jsx("div", { className: twMerge("pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-2", "rounded-sm bg-white opacity-0 transition-opacity", "peer-checked:opacity-100") }))] }), label && (_jsx(Text, { as: "label", size: "sm", weight: "semibold", className: twMerge("cursor-pointer select-none", disabled && "cursor-not-allowed opacity-50"), children: label }))] }));
});
Checkbox.displayName = "Checkbox";
