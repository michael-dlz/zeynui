"use client";
import { jsx as _jsx } from "react/jsx-runtime";
export const Container = ({ children, className = "", as: Component = "div", size = "md", }) => {
    const getSizeClass = () => {
        switch (size) {
            case "sm":
                return "max-w-[1024px]";
            case "md":
                return "max-w-[1240px]";
            case "lg":
                return "max-w-[1920px]";
            case "xl":
                return "max-w-[1240px]";
            case "2xl":
                return "max-w-[2560px]";
            default:
                return "";
        }
    };
    return (_jsx(Component, { className: `
        mx-auto
        w-full
        px-6
        sm:px-10 
        lg:px-20
        ${getSizeClass()}
        ${className}
      `, children: children }));
};
