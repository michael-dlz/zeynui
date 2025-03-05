"use client";
import { jsx as _jsx } from "react/jsx-runtime";
export const Container = ({ children, className = "", as: Component = "div", }) => {
    return (_jsx(Component, { className: `
        mx-auto
        w-full
        px-4
        sm:px-6 
        md:px-8 
        lg:px-12
        max-w-[1240px]
        ${className}
      `, children: children }));
};
