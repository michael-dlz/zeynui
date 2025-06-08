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
import { Chip } from "./Chip";
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
    var { label, error, className = "", variant = "outline", color = "primary", required = false, radius = "md", selectSize = "md", description, leftContent, rightContent, id = "", disabled = false, labelPlacement = "outside", children, onChange, value = "", inputSize = "md", mode = "single", placeholder = "Selecciona una opción", maxSelectedDisplay = 3, chipVariant = "soft", chipColor = "primary", chipSize = "sm", chipRadius = "md" } = _a, props = __rest(_a, ["label", "error", "className", "variant", "color", "required", "radius", "selectSize", "description", "leftContent", "rightContent", "id", "disabled", "labelPlacement", "children", "onChange", "value", "inputSize", "mode", "placeholder", "maxSelectedDisplay", "chipVariant", "chipColor", "chipSize", "chipRadius"]);
    const [isOpen, setIsOpen] = useState(false);
    // Estado para manejar valores únicos o múltiples
    const [selectedValues, setSelectedValues] = useState(() => {
        if (mode === "multiple") {
            return Array.isArray(value) ? value : value ? [value] : [];
        }
        return value ? [value] : [];
    });
    const selectRef = useRef(null);
    const containerRef = useRef(null);
    const listboxRef = useRef(null);
    const isTouchDeviceRef = useRef(false);
    useEffect(() => {
        isTouchDeviceRef.current =
            "ontouchstart" in window ||
                navigator.maxTouchPoints > 0 ||
                // @ts-ignore
                navigator.msMaxTouchPoints > 0;
    }, []);
    useEffect(() => {
        if (value !== undefined) {
            if (mode === "multiple") {
                setSelectedValues(Array.isArray(value) ? value : value ? [value] : []);
            }
            else {
                setSelectedValues(value ? [value] : []);
            }
        }
    }, [value, mode]);
    useEffect(() => {
        const listbox = listboxRef.current;
        if (!listbox || !isOpen || !isTouchDeviceRef.current)
            return;
        listbox.style.touchAction = "pan-y";
        listbox.style.overflowY = "auto";
        // @ts-ignore - Safari necesita esta propiedad para el scroll suave
        listbox.style.webkitOverflowScrolling = "touch";
        const preventZoom = (e) => {
            if (e.touches.length > 1) {
                e.preventDefault();
            }
        };
        listbox.addEventListener("touchstart", preventZoom, { passive: false });
        return () => {
            listbox.removeEventListener("touchstart", preventZoom);
        };
    }, [isOpen]);
    const wrapperSelectClasses = getWrapperSelectClasses(radius, variant, color, error, disabled);
    const selectClasses = getSelectClasses(selectSize, variant, color, error, disabled, className);
    const handleOptionClick = (optionValue) => {
        if (disabled)
            return;
        let newSelectedValues;
        if (mode === "multiple") {
            if (selectedValues.includes(optionValue)) {
                // Remover si ya está seleccionado
                newSelectedValues = selectedValues.filter((val) => val !== optionValue);
            }
            else {
                // Agregar si no está seleccionado
                newSelectedValues = [...selectedValues, optionValue];
            }
        }
        else {
            // Modo single
            newSelectedValues = [optionValue];
            setIsOpen(false);
        }
        setSelectedValues(newSelectedValues);
        // Llamar onChange con el formato correcto
        const returnValue = mode === "multiple" ? newSelectedValues : newSelectedValues[0] || "";
        onChange === null || onChange === void 0 ? void 0 : onChange(returnValue);
        // Actualizar el select nativo
        if (selectRef.current) {
            if (mode === "multiple") {
                // Para múltiple, seleccionar todas las opciones correspondientes
                Array.from(selectRef.current.options).forEach((option) => {
                    option.selected = newSelectedValues.includes(option.value);
                });
            }
            else {
                selectRef.current.value = newSelectedValues[0] || "";
            }
            const nativeEvent = new Event("change", { bubbles: true });
            selectRef.current.dispatchEvent(nativeEvent);
        }
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current &&
                !containerRef.current.contains(event.target) &&
                listboxRef.current &&
                !listboxRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);
    const handleRemoveTag = (valueToRemove, e) => {
        // No necesitamos stopPropagation aquí ya que el Chip lo maneja internamente
        if (disabled || mode !== "multiple")
            return;
        const newSelectedValues = selectedValues.filter((val) => val !== valueToRemove);
        setSelectedValues(newSelectedValues);
        onChange === null || onChange === void 0 ? void 0 : onChange(newSelectedValues);
        if (selectRef.current) {
            Array.from(selectRef.current.options).forEach((option) => {
                option.selected = newSelectedValues.includes(option.value);
            });
            const nativeEvent = new Event("change", { bubbles: true });
            selectRef.current.dispatchEvent(nativeEvent);
        }
    };
    const handleKeyDown = (e) => {
        var _a;
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen(!isOpen);
        }
        else if (e.key === "Escape") {
            setIsOpen(false);
        }
        else if (e.key === "ArrowDown" && isOpen) {
            e.preventDefault();
            const firstOption = (_a = listboxRef.current) === null || _a === void 0 ? void 0 : _a.querySelector('[role="option"]');
            firstOption === null || firstOption === void 0 ? void 0 : firstOption.focus();
        }
        else if (e.key === "Backspace" &&
            mode === "multiple" &&
            selectedValues.length > 0) {
            // Remover el último elemento seleccionado con Backspace
            const newSelectedValues = selectedValues.slice(0, -1);
            setSelectedValues(newSelectedValues);
            onChange === null || onChange === void 0 ? void 0 : onChange(newSelectedValues);
        }
    };
    const handleOptionKeyDown = (e, optionValue) => {
        var _a, _b;
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleOptionClick(optionValue);
        }
        else if (e.key === "ArrowDown") {
            e.preventDefault();
            const nextOption = e.currentTarget
                .nextElementSibling;
            nextOption === null || nextOption === void 0 ? void 0 : nextOption.focus();
        }
        else if (e.key === "ArrowUp") {
            e.preventDefault();
            const prevOption = e.currentTarget
                .previousElementSibling;
            if (prevOption) {
                prevOption.focus();
            }
            else {
                (_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.focus();
            }
        }
        else if (e.key === "Escape") {
            e.preventDefault();
            setIsOpen(false);
            (_b = containerRef.current) === null || _b === void 0 ? void 0 : _b.focus();
        }
    };
    const options = Children.toArray(children)
        .filter((child) => isValidElement(child) &&
        typeof child.props.value === "string" &&
        "children" in child.props)
        .map((child) => ({
        value: child.props.value,
        label: child.props.children,
        disabled: child.props.disabled,
    }));
    const getDisplayContent = () => {
        if (selectedValues.length === 0) {
            return _jsx("span", { className: "text-gray-500", children: placeholder });
        }
        if (mode === "single") {
            const selectedOption = options.find((opt) => opt.value === selectedValues[0]);
            return (selectedOption === null || selectedOption === void 0 ? void 0 : selectedOption.label) || selectedValues[0];
        }
        // Modo múltiple
        if (selectedValues.length <= maxSelectedDisplay) {
            return (_jsx("div", { className: "flex flex-wrap gap-1.5", children: selectedValues.map((value) => {
                    const option = options.find((opt) => opt.value === value);
                    return (_jsx(Chip, { variant: chipVariant, color: chipColor, size: chipSize, radius: chipRadius, onClose: () => handleRemoveTag(value, {}), className: "max-w-[200px]", children: _jsx("span", { className: "truncate", children: (option === null || option === void 0 ? void 0 : option.label) || value }) }, value));
                }) }));
        }
        return (_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("span", { className: "text-sm text-gray-700", children: [selectedValues.length, " elemento", selectedValues.length !== 1 ? "s" : "", " seleccionado", selectedValues.length !== 1 ? "s" : ""] }), _jsxs(Chip, { variant: chipVariant, color: chipColor, size: chipSize, radius: chipRadius, children: ["+", selectedValues.length] })] }));
    };
    return (_jsxs("div", { className: "w-full space-y-1.5", ref: containerRef, children: [labelPlacement === "outside" && (_jsxs(Text, { as: "label", htmlFor: id, weight: "semibold", size: "sm", children: [label, " ", required && _jsx("span", { className: "text-danger", children: "*" })] })), description && !(labelPlacement === "outside-left") && (_jsx(Text, { size: "sm", weight: "normal", as: "p", id: `${id}-description`, children: description })), _jsx("div", { className: labelPlacement === "outside-left"
                    ? "flex items-center gap-5 justify-start"
                    : "", children: _jsxs("div", { className: "w-full", children: [labelPlacement === "outside-left" && (_jsxs(Text, { as: "label", htmlFor: id, weight: "semibold", size: "sm", children: [label, " ", required && _jsx("span", { className: "text-danger", children: "*" })] })), description && labelPlacement === "outside-left" && (_jsx(Text, { size: "sm", weight: "normal", as: "p", id: `${id}-description`, children: description })), _jsxs("div", { className: "relative w-full", children: [_jsxs("div", { className: twMerge(wrapperSelectClasses, "cursor-pointer min-h-[40px]", disabled && "cursor-not-allowed"), onClick: (e) => {
                                        if (!disabled) {
                                            e.stopPropagation();
                                            setIsOpen(!isOpen);
                                        }
                                    }, onKeyDown: handleKeyDown, role: "combobox", "aria-controls": `${id}-listbox`, "aria-expanded": isOpen, "aria-haspopup": "listbox", "aria-labelledby": `${id}-label`, "aria-describedby": description ? `${id}-description` : undefined, tabIndex: disabled ? -1 : 0, children: [leftContent && (_jsx("div", { className: "pl-3 flex items-center text-gray-400", children: leftContent })), _jsx("div", { className: twMerge(selectClasses, "flex-1 flex items-center"), children: getDisplayContent() }), _jsx("div", { className: "pr-3 flex items-center text-gray-400", children: _jsx(ChevronDown, { className: `size-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}` }) })] }), _jsx("select", Object.assign({ ref: (el) => {
                                        if (typeof ref === "function") {
                                            ref(el);
                                        }
                                        else if (ref) {
                                            ref.current = el;
                                        }
                                        selectRef.current = el;
                                    }, id: id, multiple: mode === "multiple", disabled: disabled, className: "hidden", "aria-hidden": "true" }, props, { children: children })), _jsx(AnimatePresence, { children: isOpen && !disabled && (_jsx(motion.div, { initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, transition: { duration: 0.2 }, className: `absolute z-50 w-full mt-1 bg-background border border-foreground/10 rounded-${radius} shadow-lg overflow-hidden`, id: `${id}-listbox`, role: "listbox", ref: listboxRef, "aria-multiselectable": mode === "multiple", style: {
                                            WebkitOverflowScrolling: "touch",
                                            overflowY: "auto",
                                            maxHeight: "60vh",
                                            overscrollBehavior: "contain",
                                        }, children: _jsx("div", { className: "py-1", children: options.map((option) => {
                                                const isSelected = selectedValues.includes(option.value);
                                                return (_jsx("div", { className: "relative overflow-hidden", onClick: () => !option.disabled &&
                                                        handleOptionClick(option.value), onKeyDown: (e) => handleOptionKeyDown(e, option.value), role: "option", "aria-selected": isSelected, "aria-disabled": option.disabled, tabIndex: 0, children: _jsxs("div", { className: twMerge("px-3 py-3 cursor-pointer flex items-center justify-between transition-colors duration-200", isSelected
                                                            ? "bg-primary/10 text-primary"
                                                            : "hover:bg-foreground/5", option.disabled &&
                                                            "opacity-50 cursor-not-allowed"), style: {
                                                            minHeight: "44px",
                                                            padding: "12px 16px",
                                                        }, children: [_jsx(Text, { as: "span", size: "sm", children: option.label }), isSelected && _jsx(Check, { className: "size-4" })] }) }, option.value));
                                            }) }) })) })] })] }) }), error && (_jsxs("div", { className: "flex items-center gap-2 mt-1", children: [_jsx(AlertTriangleIcon, { className: "size-4 text-danger" }), _jsx(Text, { size: "sm", as: "span", className: "text-danger", children: error })] }))] }));
});
export const SelectItem = ({ value, children, disabled }) => {
    return (_jsx("option", { value: value, disabled: disabled, children: children }));
};
Select.displayName = "Select";
