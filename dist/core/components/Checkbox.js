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
const Checkbox = forwardRef((_a, ref) => {
    var { checked, onChange, indeterminate = false, className = "", label = "" } = _a, props = __rest(_a, ["checked", "onChange", "indeterminate", "className", "label"]);
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
    return (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("input", Object.assign({ type: "checkbox", ref: innerRef, checked: checked, onChange: onChange, className: twMerge("h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary checked:bg-primary", className) }, props)), label && (_jsx(Text, { as: "label", size: "sm", weight: "semibold", children: label }))] }));
});
Checkbox.displayName = "Checkbox";
export default Checkbox;
