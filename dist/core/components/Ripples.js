import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
export const Ripple = ({ variant, ripples, color }) => {
    const getRippleColor = (variant) => {
        const rippleColorMap = {
            solid: `bg-white/40`,
            outline: `bg-white/40`,
            soft: `bg-white/40`,
            light: `bg-${color}/10`,
            underline: `bg-${color}/10`,
            ghost: `bg-white/40`,
        };
        return rippleColorMap[variant];
    };
    return (_jsx(_Fragment, { children: ripples.map((ripple) => (_jsx("span", { className: `absolute animate-ripple rounded-full ${getRippleColor(variant)}`, style: {
                left: ripple.x,
                top: ripple.y,
                transform: "translate(-50%, -50%)",
                width: "200%",
                paddingBottom: "200%",
                zIndex: 10, // Asegura que el ripple esté por encima del contenido
            } }, ripple.id))) }));
};
