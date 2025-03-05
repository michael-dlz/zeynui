import { jsx as _jsx } from "react/jsx-runtime";
export const Skeleton = ({ variant = "text", width, height, animation = "pulse", radius = "md", className = "", }) => {
    const getRadiusClasses = () => {
        const radiuses = {
            none: "rounded-none",
            sm: "rounded-sm",
            md: "rounded",
            lg: "rounded-lg",
            full: "rounded-full",
        };
        return radiuses[radius];
    };
    const getAnimationClasses = () => {
        const animations = {
            pulse: "animate-pulse",
            wave: "before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent",
            none: "",
        };
        return animations[animation];
    };
    const getVariantClasses = () => {
        switch (variant) {
            case "circular":
                return "rounded-full";
            case "text":
                return "h-4 w-full";
            case "rectangular":
                return getRadiusClasses();
        }
    };
    const style = {
        width: width || (variant === "text" ? "100%" : undefined),
        height: height || (variant === "circular" ? width : undefined),
    };
    return (_jsx("div", { className: `
        bg-gray-200/70 relative overflow-hidden isolate
        ${getVariantClasses()}
        ${getAnimationClasses()}
        ${className}
      `, style: style, role: "status", "aria-label": "Loading...", "aria-busy": "true" }));
};
