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
import { forwardRef } from "react";
import { Text } from "./Text";
import { AlertTriangleIcon } from "lucide-react";
import { BASE_INPUT_SELECT_CLASSES, INPUT_SELECT_CLASSES, INPUT_SELECT_SIZE_CLASSES, RADIUS_CLASSES, SIZE_CLASSES, WRAPPER_INPUT_SELECT_CLASSES, } from "../constants/classes";
import { ERROR_INPUT_SELECT_VARIANTS } from "../constants/variants";
// Función para generar clases dinámicas
const getWrapperInputClasses = (radius, variant, color, error, disabled) => `
  flex items-center w-full rounded-lg
  transition-all duration-300 ease-in-out
  ${disabled
    ? "bg-gray-50 opacity-60 border border-gray-300 cursor-not-allowed text-black/80"
    : ""}
  ${RADIUS_CLASSES[radius]}
  ${error
    ? ERROR_INPUT_SELECT_VARIANTS[variant]
    : WRAPPER_INPUT_SELECT_CLASSES[variant][color]}
`;
const getInputClasses = (inputSize, variant, color, error, disabled, className) => `
  ${BASE_INPUT_SELECT_CLASSES.input}
  ${INPUT_SELECT_SIZE_CLASSES[inputSize]}
  ${disabled ? BASE_INPUT_SELECT_CLASSES.disabled : ""}
  ${INPUT_SELECT_CLASSES[variant][color]}
  ${error && variant === "soft" ? "placeholder:text-danger" : ""}
  ${className}
`;
export const Input = forwardRef((_a, ref) => {
    var { label, error, className = "", variant = "outline", color = "primary", required = false, radius = "md", inputSize = "md", description, leftContent, rightContent, id = "", disabled = false, labelPlacement = "outside" } = _a, props = __rest(_a, ["label", "error", "className", "variant", "color", "required", "radius", "inputSize", "description", "leftContent", "rightContent", "id", "disabled", "labelPlacement"]);
    const wrapperClasses = getWrapperInputClasses(radius, variant, color, error, disabled);
    const inputClasses = getInputClasses(inputSize, variant, color, error, disabled, className);
    return (_jsxs("div", { className: "w-full grid gap-1.5", children: [labelPlacement === "outside" && (_jsxs(Text, { as: "label", htmlFor: id, weight: "semibold", size: "sm", children: [label, " ", required && _jsx("span", { className: "text-danger", children: "*" })] })), description && !(labelPlacement === "outside-left") && (_jsx(Text, { size: "sm", weight: "normal", as: "p", children: description })), _jsxs("div", { className: labelPlacement === "outside-left"
                    ? "flex items-center gap-5 justify-start"
                    : "", children: [_jsxs("div", { className: "", children: [labelPlacement === "outside-left" && (_jsxs(Text, { as: "label", htmlFor: id, weight: "semibold", size: "sm", children: [label, " ", required && _jsx("span", { className: "text-danger", children: "*" })] })), description && labelPlacement === "outside-left" && (_jsx(Text, { size: "xs", weight: "normal", as: "p", children: description }))] }), _jsxs("div", { className: wrapperClasses, children: [leftContent && (_jsx("div", { className: `flex items-center text-sm 
                  ${SIZE_CLASSES[inputSize]}`, children: leftContent })), _jsx("input", Object.assign({ id: id, ref: ref, disabled: disabled, className: inputClasses }, props)), rightContent && (_jsx("div", { className: `flex items-center text-sm 
                ${SIZE_CLASSES[inputSize]}`, children: rightContent }))] })] }), error && typeof error === "string" && (_jsxs("div", { className: "flex items-center gap-1 mt-1.5 text-danger text-sm", children: [_jsx(AlertTriangleIcon, { className: "size-3" }), _jsx(Text, { as: "span", size: "xs", className: "!text-danger", children: error })] }))] }));
});
Input.displayName = "Input";
