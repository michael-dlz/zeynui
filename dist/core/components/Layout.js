"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { Container } from "./Container";
export const Layout = ({ children, className = "" }) => {
    return (_jsx("div", { className: `min-h-screen flex flex-col ${className}`, children: children }));
};
export const Header = ({ children, className = "" }) => {
    return (_jsx("header", { className: className, children: _jsx(Container, { children: children }) }));
};
export const Main = ({ children, className = "", fullWidth = false }) => {
    if (fullWidth) {
        return _jsx("main", { className: `flex-1 ${className}`, children: children });
    }
    return (_jsx("main", { className: `flex-1 ${className}`, children: _jsx(Container, { children: children }) }));
};
export const Footer = ({ children, className = "" }) => {
    return (_jsx("footer", { className: className, children: _jsx(Container, { children: children }) }));
};
