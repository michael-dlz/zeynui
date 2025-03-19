"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, useContext } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Button } from "./Button";
import { Drawer, DrawerBody } from "./Drawer";
import { useDisclosure } from "../hook/useDisclosure";
export const NavbarContext = createContext({
    isOpen: false,
    setIsOpen: () => { },
});
export const Navbar = ({ children, className = "", position = "sticky", size = "xl", responsive, justify = "between", }) => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const getJustifyClass = () => {
        switch (justify) {
            case "start":
                return "justify-start";
            case "center":
                return "justify-center";
            case "end":
                return "justify-end";
            case "between":
                return "justify-between";
            case "around":
                return "justify-around";
            case "evenly":
                return "justify-evenly";
            default:
                return "justify-between";
        }
    };
    const getPositionClass = () => {
        switch (position) {
            case "fixed":
                return "fixed top-0 left-0 right-0 z-50";
            case "sticky":
                return "sticky top-0 z-50";
            default:
                return "";
        }
    };
    const getSizeClass = () => {
        switch (size) {
            case "sm":
                return "max-w-[1024px]";
            case "md":
                return "max-w-[1290px]";
            case "lg":
                return "max-w-[1440px]";
            case "xl":
                return "max-w-[1920px]";
            case "2xl":
                return "max-w-[2560px]";
            case "full":
                return "w-full";
            default:
                return "";
        }
    };
    return (_jsx("nav", { className: `${className} ${getPositionClass()}`, children: _jsx("div", { children: _jsxs("div", { className: `
          mx-auto
          w-full py-3
        ${size === "full" ? "px-0" : "px-6 sm:px-10 2xl:px-20"} ${getSizeClass()} ${getJustifyClass()} flex items-center`, children: [responsive && (_jsx("div", { className: "flex md:hidden", children: _jsx(Button, { variant: "light", isIconOnly: true, onClick: onOpen, children: _jsx(Bars3Icon, { className: "size-6" }) }) })), children, _jsx(Drawer, { isOpen: isOpen, onClose: onClose, placement: "right", size: "md", backdrop: "blur", children: _jsx(DrawerBody, { children: responsive }) })] }) }) }));
};
export const NavbarStart = ({ children, className = "" }) => {
    return _jsx("div", { className: `flex items-center ${className}`, children: children });
};
export const NavbarContent = ({ children, className = "", justify = "center", fullHeightItems = false, }) => {
    const { isOpen, setIsOpen } = useContext(NavbarContext);
    const getJustifyClass = () => {
        switch (justify) {
            case "start":
                return "justify-start";
            case "center":
                return "justify-center";
            case "end":
                return "justify-end";
            case "between":
                return "justify-between";
            case "around":
                return "justify-around";
            case "evenly":
                return "justify-evenly";
            default:
                return "justify-center";
        }
    };
    return (_jsx(NavbarContext.Provider, { value: {
            isOpen,
            setIsOpen,
            fullHeightItems,
        }, children: _jsx("div", { className: `${getJustifyClass()} items-center ${className}`, children: children }) }));
};
export const NavbarItem = ({ children, className = "" }) => {
    return _jsx("div", { className: `${className}`, children: children });
};
export const NavbarEnd = ({ children, className = "" }) => {
    return _jsx("div", { className: `flex items-center ${className}`, children: children });
};
