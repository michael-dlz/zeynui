import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
export const Ripple = ({ variant, ripples, color }) => {
    const getRippleColor = (variant) => {
        const rippleColorMap = {
            solid: `bg-white/40`,
            outline: `bg-white/40`,
            soft: `bg-white/40`,
            light: `bg-slate-500/10`,
            underline: `bg-slate-500/10`,
            ghost: `bg-white/40`,
            shadow: `bg-slate-500/10`,
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
