import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Children, cloneElement, isValidElement, } from "react";
const getGradientStyle = (direction) => {
    if (!direction)
        return "";
    const gradients = {
        down: "bg-gradient-to-b",
        up: "bg-gradient-to-t",
        left: "bg-gradient-to-l",
        right: "bg-gradient-to-r",
    };
    return gradients[direction];
};
export const Card = ({ children, imageCover, className = "", gradient, radius = "md", }) => {
    const getRadiusClasses = (radiusSize) => {
        const radiusMap = {
            none: "rounded-none",
            sm: "rounded-sm",
            md: "rounded-md",
            lg: "rounded-lg",
            full: "rounded-full",
        };
        return radiusMap[radiusSize];
    };
    return (_jsxs("div", { className: `relative 
        ${getRadiusClasses(radius)} overflow-hidden ${className}`, style: imageCover
            ? {
                backgroundImage: `url(${imageCover})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }
            : undefined, children: [imageCover && (_jsx("div", { className: `absolute inset-0 ${gradient
                    ? `${getGradientStyle(gradient)} from-black/60 to-transparent`
                    : "bg-black/20"}` })), _jsx("div", { className: `relative ${imageCover ? "text-white" : ""}`, children: Children.map(children, (child) => {
                    if (isValidElement(child)) {
                        return cloneElement(child, {
                            hasImage: !!imageCover,
                        });
                    }
                    return child;
                }) })] }));
};
export const CardImage = ({ children, className = "" }) => {
    return (_jsx("div", { className: `relative overflow-hidden ${className}`, children: _jsx("div", { className: "hover:scale-105 transition-transform", children: children }) }));
};
export const CardHeader = ({ children, className = "", hasImage, compact = false, }) => {
    return (_jsx("div", { className: `${compact ? "py-4" : "p-4"} ${!hasImage ? "border-b border-b-gray-200" : ""} ${className}`, children: children }));
};
export const CardContent = ({ children, className = "", compact = false, }) => {
    return (_jsx("div", { className: `${compact ? "py-4" : "p-4"} ${className}`, children: children }));
};
export const CardFooter = ({ children, className = "", hasImage, compact = false, }) => {
    return (_jsx("div", { className: `${compact ? "py-4" : "p-4"} ${!hasImage ? "border-t border-t-gray-200" : ""} ${className}`, children: children }));
};
