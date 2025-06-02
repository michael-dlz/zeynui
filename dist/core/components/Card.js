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
export const Card = ({ children, imageCover, className = "", gradient, radius = "md", hasShadow = true, isCompact = false, }) => {
    const getRadiusClasses = (radiusSize) => {
        const radiusMap = {
            none: "rounded-none",
            sm: "rounded-sm",
            md: "rounded-md",
            lg: "rounded-lg",
            full: "rounded-[9999px]",
        };
        return radiusMap[radiusSize];
    };
    const getPaddingClasses = (isCompact) => {
        if (!isCompact)
            return "p-[1.144rem]";
        return "p-0";
    };
    return (_jsxs("div", { className: `relative
        ${getRadiusClasses(radius)} ${getPaddingClasses(isCompact)} overflow-hidden ${className} ${hasShadow ? "shadow-lg shadow-black/10" : ""}`, style: imageCover
            ? {
                backgroundImage: `url(${imageCover})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }
            : undefined, children: [imageCover && (_jsx("div", { className: `absolute inset-0 ${gradient
                    ? `${getGradientStyle(gradient)} from-black/60 to-transparent`
                    : "bg-black/20"}` })), _jsx("div", { className: `relative grid gap-4 ${imageCover ? "text-foreground" : ""}`, children: Children.map(children, (child) => {
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
export const CardHeader = ({ children, className = "" }) => {
    return _jsx("div", { className: className, children: children });
};
export const CardContent = ({ children, className = "" }) => {
    return _jsx("div", { className: className, children: children });
};
export const CardFooter = ({ children, className = "" }) => {
    return _jsx("div", { className: className, children: children });
};
