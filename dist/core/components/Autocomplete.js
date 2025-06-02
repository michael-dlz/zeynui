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
import { forwardRef, useState, useEffect, useRef, } from "react";
import { Text } from "./Text";
import { BASE_INPUT_SELECT_CLASSES, INPUT_SELECT_CLASSES, INPUT_SELECT_SIZE_CLASSES, RADIUS_CLASSES, WRAPPER_INPUT_SELECT_CLASSES, } from "../constants/classes";
import { ERROR_INPUT_SELECT_VARIANTS } from "../constants/variants";
import { AlertTriangleIcon, Check, XIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
const getWrapperClasses = (radius, variant, color, error, disabled) => `
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
export const Autocomplete = forwardRef((_a, ref) => {
    var { label, error, className = "", variant = "outline", color = "primary", required = false, radius = "md", inputSize = "md", description, leftContent, rightContent, id = "", disabled = false, labelPlacement = "outside", options = [], onOptionSelected, onChange, value = "" } = _a, props = __rest(_a, ["label", "error", "className", "variant", "color", "required", "radius", "inputSize", "description", "leftContent", "rightContent", "id", "disabled", "labelPlacement", "options", "onOptionSelected", "onChange", "value"]);
    const [inputValue, setInputValue] = useState("");
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const containerRef = useRef(null);
    useEffect(() => {
        if (value) {
            const option = options.find((opt) => opt.value === value);
            if (option) {
                setSelectedOption(option);
                setInputValue(option.label);
                if (isInitialLoad) {
                    setFilteredOptions(options);
                    setIsOpen(true);
                }
            }
        }
        else {
            setSelectedOption(null);
            setInputValue("");
        }
        setIsInitialLoad(false);
    }, [value, options, isInitialLoad]);
    const wrapperClasses = getWrapperClasses(radius, variant, color, error, disabled);
    const inputClasses = getInputClasses(inputSize, variant, color, error, disabled, className);
    useEffect(() => {
        setFilteredOptions(options.filter((option) => option.label
            .toLowerCase()
            .includes(inputValue.toString().toLowerCase())));
    }, [inputValue, options]);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current &&
                !containerRef.current.contains(event.target)) {
                setIsOpen(false);
                if (selectedOption) {
                    setInputValue(selectedOption.label);
                }
                else {
                    setInputValue("");
                }
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [selectedOption]);
    const handleInputChange = (e) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        setIsOpen(true);
        if (!newValue) {
            onChange === null || onChange === void 0 ? void 0 : onChange(Object.assign(Object.assign({}, e), { target: Object.assign(Object.assign({}, e.target), { value: "" }) }));
        }
    };
    const handleOptionClick = (option) => {
        setInputValue(option.label);
        setSelectedOption(option);
        setIsOpen(false);
        onOptionSelected === null || onOptionSelected === void 0 ? void 0 : onOptionSelected(option.value);
        const syntheticEvent = {
            target: {
                name: props.name,
                value: option.value,
            },
        };
        onChange === null || onChange === void 0 ? void 0 : onChange(syntheticEvent);
    };
    const handleClear = () => {
        setInputValue("");
        setSelectedOption(null);
        setIsOpen(false);
        const syntheticEvent = {
            target: {
                name: props.name,
                value: "",
            },
        };
        onChange === null || onChange === void 0 ? void 0 : onChange(syntheticEvent);
    };
    const handleInputFocus = () => {
        setIsOpen(true);
    };
    return (_jsxs("div", { className: "w-full grid gap-1.5 relative", ref: containerRef, children: [labelPlacement === "outside" && (_jsxs(Text, { as: "label", htmlFor: id, weight: "semibold", size: "sm", children: [label, " ", required && _jsx("span", { className: "text-danger", children: "*" })] })), description && !(labelPlacement === "outside-left") && (_jsx(Text, { size: "sm", weight: "normal", as: "p", children: description })), _jsx("div", { className: labelPlacement === "outside-left"
                    ? "flex items-center gap-5 justify-start"
                    : "", children: _jsxs("div", { className: "w-full", children: [labelPlacement === "outside-left" && (_jsxs(Text, { as: "label", htmlFor: id, weight: "semibold", size: "sm", children: [label, " ", required && _jsx("span", { className: "text-danger", children: "*" })] })), description && labelPlacement === "outside-left" && (_jsx(Text, { size: "sm", weight: "normal", as: "p", children: description })), _jsxs("div", { className: "relative w-full", children: [_jsxs("div", { className: wrapperClasses, children: [leftContent && (_jsx("div", { className: `flex items-center text-sm !pr-0
                ${INPUT_SELECT_SIZE_CLASSES[inputSize]}`, children: leftContent })), _jsx("input", Object.assign({ ref: ref, id: id, value: inputValue, onChange: handleInputChange, onFocus: handleInputFocus, disabled: disabled, required: required, className: inputClasses }, props)), _jsxs("div", { className: "pr-3 flex items-center gap-2 text-gray-400", children: [inputValue && !disabled && (_jsx("button", { type: "button", onClick: handleClear, className: "hover:text-gray-600 transition-colors", "aria-label": "Limpiar selecci\u00F3n", children: _jsx(XIcon, { className: "size-4" }) })), rightContent && (_jsx("div", { className: `flex items-center text-sm !pl-0
                ${INPUT_SELECT_SIZE_CLASSES[inputSize]}`, children: rightContent }))] })] }), _jsx(AnimatePresence, { children: isOpen && filteredOptions.length > 0 && (_jsx(motion.div, { initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, transition: { duration: 0.2 }, className: `absolute z-50 w-full mt-1 bg-background border border-foreground/10 rounded-${radius} shadow-lg overflow-hidden`, children: _jsx("div", { className: "py-1 max-h-60 overflow-auto", children: filteredOptions.map((option) => (_jsx("div", { className: "relative overflow-hidden", onClick: () => handleOptionClick(option), children: _jsxs("div", { className: `px-3 py-2 cursor-pointer flex items-center justify-between transition-colors duration-200 ${(selectedOption === null || selectedOption === void 0 ? void 0 : selectedOption.value) === option.value
                                                        ? "bg-background-50"
                                                        : "hover:bg-foreground/5"}`, children: [_jsx(Text, { as: "span", size: "sm", children: option.label }), (selectedOption === null || selectedOption === void 0 ? void 0 : selectedOption.value) === option.value && (_jsx(Check, { className: "size-4" }))] }) }, option.value))) }) })) })] })] }) }), error && (_jsxs("div", { className: "flex items-center gap-2 mt-1", children: [_jsx(AlertTriangleIcon, { className: "size-4 text-danger" }), _jsx(Text, { size: "sm", as: "span", className: "text-danger", children: error })] }))] }));
});
Autocomplete.displayName = "Autocomplete";
