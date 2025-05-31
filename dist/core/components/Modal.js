"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@zeynui/react";
import React, { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XIcon } from "lucide-react";
import { useDisclosure } from "../hook/useDisclosure";
export const Modal = ({ children, backdrop = "blur", size = "md", isOpen: isOpenProp, onOpenChange, onClose, closeOnClickOutside = true, className, }) => {
    const { isOpen, onOpen, onClose: internalOnClose } = useDisclosure();
    const modalRef = useRef(null);
    const controlled = isOpenProp !== undefined;
    const finalIsOpen = controlled ? isOpenProp : isOpen;
    const finalOnClose = () => {
        if (onClose)
            onClose();
        if (!controlled)
            internalOnClose();
        if (onOpenChange)
            onOpenChange(false);
    };
    const backdropClasses = {
        blur: "backdrop-blur-sm",
        opaque: "bg-black/50",
        transparent: "bg-transparent",
    };
    const sizeMap = {
        sm: "max-w-[400px]",
        md: "max-w-[600px]",
        lg: "max-w-[800px]",
        xl: "max-w-[1000px]",
        "2xl": "max-w-[1200px]",
        "3xl": "max-w-[1400px]",
        full: "max-w-full",
    };
    const handleClickOutside = (e) => {
        if (closeOnClickOutside &&
            modalRef.current &&
            !modalRef.current.contains(e.target)) {
            finalOnClose();
        }
    };
    return (_jsx(AnimatePresence, { children: finalIsOpen && (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, onClick: handleClickOutside, className: `fixed inset-0 z-50 flex items-center justify-center p-4 ${backdropClasses[backdrop]}`, children: _jsx(motion.div, { ref: modalRef, initial: { y: 20, opacity: 0 }, animate: { y: 0, opacity: 1 }, exit: { y: 20, opacity: 0 }, transition: { type: "spring", damping: 25, stiffness: 500 }, className: `relative w-full ${sizeMap[size]} max-h-[calc(100vh-2rem)] bg-card rounded-lg shadow-xl overflow-hidden flex flex-col bg-white ${className}`, children: React.Children.map(children, (child) => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child, {
                            onClose: finalOnClose,
                        });
                    }
                    return child;
                }) }) })) }));
};
export const ModalHeader = ({ children, className = "", onClose, }) => {
    return (_jsxs("header", { className: `p-4 flex justify-between items-center ${className}`, children: [_jsx("div", { children: children }), onClose && (_jsx(Button, { variant: "ghost", color: "info", onClick: onClose, isIconOnly: true, children: _jsx(XIcon, { size: 16 }) }))] }));
};
export const ModalBody = ({ children, className = "", }) => {
    return (_jsx("main", { className: `p-4 flex-1 overflow-y-auto min-h-0 ${className}`, children: children }));
};
export const ModalFooter = ({ children, className = "", }) => {
    return _jsx("footer", { className: `p-4  ${className}`, children: children });
};
