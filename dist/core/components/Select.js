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
import { forwardRef, useState, useRef, useEffect, Children, isValidElement, } from "react";
import { Text } from "./Text";
import { BASE_INPUT_SELECT_CLASSES, INPUT_SELECT_CLASSES, INPUT_SELECT_SIZE_CLASSES, RADIUS_CLASSES, WRAPPER_INPUT_SELECT_CLASSES, } from "../constants/classes";
import { ERROR_INPUT_SELECT_VARIANTS } from "../constants/variants";
import { AlertTriangleIcon, Check, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { twMerge } from "tailwind-merge";
const getWrapperSelectClasses = (radius, variant, color, error, disabled) => `
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
const getSelectClasses = (inputSize, variant, color, error, disabled, className) => `
  ${BASE_INPUT_SELECT_CLASSES.input}
  ${INPUT_SELECT_SIZE_CLASSES[inputSize]}
  ${disabled ? BASE_INPUT_SELECT_CLASSES.disabled : ""}
  ${INPUT_SELECT_CLASSES[variant][color]}
  ${error && variant === "soft" ? "placeholder:text-danger" : ""}
  ${className}
`;
export const Select = forwardRef((_a, ref) => {
    var { label, error, className = "", variant = "outline", color = "primary", required = false, radius = "md", selectSize = "md", description, leftContent, rightContent, id = "", disabled = false, labelPlacement = "outside", children, onChange, value = "", inputSize = "md" } = _a, props = __rest(_a, ["label", "error", "className", "variant", "color", "required", "radius", "selectSize", "description", "leftContent", "rightContent", "id", "disabled", "labelPlacement", "children", "onChange", "value", "inputSize"]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value);
    const selectRef = useRef(null);
    const containerRef = useRef(null);
    useEffect(() => {
        if (value !== undefined) {
            setSelectedValue(value);
        }
    }, [value]);
    const wrapperSelectClasses = getWrapperSelectClasses(radius, variant, color, error, disabled);
    const selectClasses = getSelectClasses(selectSize, variant, color, error, disabled, className);
    const handleOptionClick = (optionValue, event) => {
        if (!disabled) {
            setSelectedValue(optionValue);
            setIsOpen(false);
            if (selectRef.current) {
                selectRef.current.value = optionValue;
                const nativeEvent = new Event("change", { bubbles: true });
                Object.defineProperty(nativeEvent, "target", {
                    value: selectRef.current,
                });
                Object.defineProperty(nativeEvent, "currentTarget", {
                    value: selectRef.current,
                });
                selectRef.current.dispatchEvent(nativeEvent);
                onChange === null || onChange === void 0 ? void 0 : onChange({
                    target: selectRef.current,
                    currentTarget: selectRef.current,
                    type: "change",
                    bubbles: true,
                    cancelable: false,
                    defaultPrevented: false,
                    isDefaultPrevented: () => false,
                    isPropagationStopped: () => false,
                    isTrusted: true,
                    nativeEvent: nativeEvent,
                    preventDefault: () => { },
                    stopPropagation: () => { },
                    persist: () => { },
                    timeStamp: Date.now(),
                });
            }
        }
    };
    const handleChange = (e) => {
        setSelectedValue(e.target.value);
        onChange === null || onChange === void 0 ? void 0 : onChange(e);
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current &&
                !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    const options = Children.toArray(children)
        .filter((child) => isValidElement(child) &&
        typeof child.props.value === "string" &&
        "children" in child.props)
        .map((child) => ({
        value: child.props.value,
        label: child.props.children,
        disabled: child.props.disabled,
    }));
    const selectedOption = options.find((opt) => opt.value === selectedValue);
    return (_jsxs("div", { className: "w-full space-y-1.5", ref: containerRef, children: [labelPlacement === "outside" && (_jsxs(Text, { as: "label", htmlFor: id, weight: "semibold", size: "sm", children: [label, " ", required && _jsx("span", { className: "text-danger", children: "*" })] })), description && !(labelPlacement === "outside-left") && (_jsx(Text, { size: "sm", weight: "normal", as: "p", children: description })), _jsx("div", { className: labelPlacement === "outside-left"
                    ? "flex items-center gap-5 justify-start"
                    : "", children: _jsxs("div", { className: "w-full", children: [labelPlacement === "outside-left" && (_jsxs(Text, { as: "label", htmlFor: id, weight: "semibold", size: "sm", children: [label, " ", required && _jsx("span", { className: "text-danger", children: "*" })] })), description && labelPlacement === "outside-left" && (_jsx(Text, { size: "sm", weight: "normal", as: "p", children: description })), _jsxs("div", { className: "relative w-full", children: [_jsxs("div", { className: twMerge(wrapperSelectClasses, "cursor-pointer", disabled && "cursor-not-allowed"), onClick: () => !disabled && setIsOpen(!isOpen), children: [leftContent && (_jsx("div", { className: `flex items-center text-sm !pr-0
                ${INPUT_SELECT_SIZE_CLASSES[inputSize]}`, children: leftContent })), _jsx("div", { className: selectClasses, children: selectedOption
                                                ? selectedOption.label
                                                : "Selecciona una opción" }), _jsx("div", { className: "pr-3 flex items-center text-gray-400", children: _jsx(ChevronDown, { className: `size-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}` }) }), rightContent && (_jsx("div", { className: `flex items-center text-sm !pl-0
                ${INPUT_SELECT_SIZE_CLASSES[inputSize]}`, children: rightContent }))] }), _jsx("select", Object.assign({ ref: (el) => {
                                        if (typeof ref === "function") {
                                            ref(el);
                                        }
                                        else if (ref) {
                                            ref.current = el;
                                        }
                                        selectRef.current = el;
                                    }, id: id, value: selectedValue, onChange: handleChange, disabled: disabled, className: "hidden" }, props, { children: children })), _jsx(AnimatePresence, { children: isOpen && !disabled && (_jsx(motion.div, { initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, transition: { duration: 0.2 }, className: `absolute z-50 w-full mt-1 bg-background border border-foreground/10 rounded-${radius} shadow-lg overflow-hidden`, children: _jsx("div", { className: "py-1 max-h-60 overflow-auto", children: options.map((option) => (_jsx("div", { className: "relative overflow-hidden", onClick: (e) => !option.disabled &&
                                                    handleOptionClick(option.value, e), children: _jsxs("div", { className: twMerge("px-3 py-2 cursor-pointer flex items-center justify-between transition-colors duration-200", selectedValue === option.value
                                                        ? `bg-background-50`
                                                        : "hover:bg-foreground/5", option.disabled && "opacity-50 cursor-not-allowed"), children: [_jsx(Text, { as: "span", size: "sm", children: option.label }), selectedValue === option.value && (_jsx(Check, { className: "size-4" }))] }) }, option.value))) }) })) })] })] }) }), error && (_jsxs("div", { className: "flex items-center gap-2 mt-1", children: [_jsx(AlertTriangleIcon, { className: "size-4 text-danger" }), _jsx(Text, { size: "sm", as: "span", className: "text-danger", children: error })] }))] }));
});
export const SelectItem = ({ value, children, disabled }) => {
    return (_jsx("option", { value: value, disabled: disabled, children: children }));
};
Select.displayName = "Select";
