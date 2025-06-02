"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { useState, createContext, useContext, useRef, useEffect, } from "react";
import { motion, AnimatePresence } from "framer-motion";
const DropdownContext = createContext(undefined);
export const useDropdown = () => {
    const context = useContext(DropdownContext);
    if (!context) {
        throw new Error("useDropdown must be used within a Dropdown");
    }
    return context;
};
export const Dropdown = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (_jsx(DropdownContext.Provider, { value: { isOpen, setIsOpen }, children: _jsx("div", { className: "relative inline-block w-full", children: children }) }));
};
export const DropdownContent = ({ children, "aria-label": ariaLabel, }) => {
    const { isOpen, setIsOpen } = useDropdown();
    const ref = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [setIsOpen]);
    return (_jsx(AnimatePresence, { children: isOpen && (_jsx(motion.div, { ref: ref, initial: { opacity: 0, y: -5 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -5 }, transition: { duration: 0.2 }, className: "absolute z-50 mt-2 bg-card rounded-lg shadow-lg", role: "menu", "aria-label": ariaLabel, children: children })) }));
};
export const DropdownTrigger = ({ children, isHover = false, fullWidth = false, className = "" }) => {
    const { isOpen, setIsOpen } = useDropdown();
    const [isHovered, setIsHovered] = useState(false);
    // Maneja el click para abrir/cerrar el dropdown
    const handleClick = () => {
        if (!isHover) {
            setIsOpen(!isOpen);
        }
    };
    // Maneja el hover para abrir el dropdown si isHover está activado
    const handleMouseEnter = () => {
        if (isHover) {
            setIsOpen(true);
            setIsHovered(true);
        }
    };
    // Maneja el hover para cerrar el dropdown si isHover está activado
    const handleMouseLeave = () => {
        if (isHover && !isOpen) {
            setIsOpen(false);
            setIsHovered(false);
        }
    };
    return (_jsx("div", { onClick: handleClick, onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, className: `
        inline-flex 
        items-center 
        ${className}`, children: children }));
};
