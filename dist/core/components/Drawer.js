"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";
export const DrawerContext = createContext({
    isOpen: false,
    onClose: () => { },
});
export const useDrawerContext = () => useContext(DrawerContext);
const sizeMap = {
    sm: "15rem",
    md: "20rem",
    lg: "25rem",
    xl: "30rem",
    "2xl": "35rem",
    "3xl": "40rem",
    full: "100%",
};
const backdropStyles = {
    blur: "bg-black/30 backdrop-blur-md",
    opaque: "bg-black/70",
    transparent: "bg-black/40",
};
const getPlacementStyles = (placement, size) => {
    const sizeValue = sizeMap[size];
    switch (placement) {
        case "left":
            return {
                left: 0,
                top: 0,
                bottom: 0,
                width: sizeValue,
            };
        case "right":
            return {
                right: 0,
                top: 0,
                bottom: 0,
                width: sizeValue,
            };
        case "top":
            return {
                top: 0,
                left: 0,
                right: 0,
                height: sizeValue,
            };
        case "bottom":
            return {
                bottom: 0,
                left: 0,
                right: 0,
                height: sizeValue,
            };
    }
};
const getPlacementAnimation = (placement) => {
    switch (placement) {
        case "left":
            return {
                x: "-100%",
            };
        case "right":
            return {
                x: "100%",
            };
        case "top":
            return {
                y: "-100%",
            };
        case "bottom":
            return {
                y: "100%",
            };
    }
};
export const Drawer = ({ children, isOpen, onClose, placement = "right", size = "md", backdrop = "transparent", className = "bg-white", }) => {
    return (_jsx(DrawerContext.Provider, { value: {
            isOpen,
            onClose,
        }, children: _jsx(AnimatePresence, { children: isOpen && (_jsxs(_Fragment, { children: [_jsx(motion.div, { initial: {
                            opacity: 0,
                        }, animate: {
                            opacity: 1,
                        }, exit: {
                            opacity: 0,
                        }, transition: {
                            duration: 0.15,
                            ease: "easeInOut",
                        }, onClick: onClose, className: `fixed inset-0 z-40 ${backdropStyles[backdrop]}` }), _jsxs(motion.div, { initial: getPlacementAnimation(placement), animate: {
                            x: 0,
                            y: 0,
                        }, exit: getPlacementAnimation(placement), transition: {
                            type: "spring",
                            damping: 15,
                            stiffness: 300,
                            mass: 0.2,
                        }, style: getPlacementStyles(placement, size), className: `fixed z-50 ${className} shadow-xl overflow-auto`, children: [_jsx(XMarkIcon, { className: "absolute size-6 top-4 right-4 cursor-pointer p-1 rounded-full hover:bg-gray-100", onClick: onClose, "aria-label": "Close drawer" }), children] })] })) }) }));
};
export const DrawerHeader = ({ children }) => {
    return _jsx("div", { className: "px-6 py-4", children: children });
};
export const DrawerBody = ({ children }) => {
    return _jsx("div", { className: "flex-1 overflow-y-auto p-6", children: children });
};
export const DrawerFooter = ({ children }) => {
    return _jsx("div", { className: "px-6 py-4", children: children });
};
