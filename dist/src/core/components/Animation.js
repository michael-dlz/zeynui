"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
export const AnimateIn = ({ children, delay = 0, duration = 0.5, className = "", inView = true, }) => {
    const { ref, inView: isInView } = useInView({
        triggerOnce: true,
    });
    return (_jsx(motion.div, { ref: ref, initial: {
            opacity: 0,
            y: 20,
        }, animate: inView && isInView ? { opacity: 1, y: 0 } : {}, transition: {
            duration,
            delay,
            ease: [0.21, 0.47, 0.32, 0.98],
        }, className: className, children: children }));
};
export const FadeScale = ({ children, delay = 0, duration = 0.5, className = "", inView = true, }) => {
    const { ref, inView: isInView } = useInView({
        triggerOnce: true,
    });
    return (_jsx(motion.div, { ref: ref, initial: {
            opacity: 0,
            scale: 0.95,
        }, animate: inView && isInView ? { opacity: 1, scale: 1 } : {}, transition: {
            duration,
            delay,
            ease: [0.21, 0.47, 0.32, 0.98],
        }, className: className, children: children }));
};
export const RevealAnimation = ({ children, delay = 0, duration = 0.7, className = "", inView = true, }) => {
    const { ref, inView: isInView } = useInView({
        triggerOnce: true,
    });
    return (_jsxs("div", { ref: ref, className: `relative overflow-hidden ${className}`, children: [_jsx(motion.div, { initial: {
                    opacity: 0,
                }, animate: inView && isInView ? { opacity: 1 } : {}, transition: {
                    duration: duration * 0.5,
                    delay,
                }, children: children }), _jsx(motion.div, { className: "absolute inset-0 bg-white", initial: {
                    scaleX: 1,
                }, animate: inView && isInView ? { scaleX: 0 } : {}, transition: {
                    duration,
                    delay,
                    ease: [0.645, 0.045, 0.355, 1],
                }, style: {
                    originX: 0,
                } })] }));
};
export const SlideIn = ({ children, delay = 0, duration = 0.5, direction = "left", className = "", inView = true, }) => {
    const { ref, inView: isInView } = useInView({
        triggerOnce: true,
    });
    const getInitialPosition = () => {
        switch (direction) {
            case "left":
                return {
                    x: -50,
                    y: 0,
                };
            case "right":
                return {
                    x: 50,
                    y: 0,
                };
            case "up":
                return {
                    x: 0,
                    y: 50,
                };
            case "down":
                return {
                    x: 0,
                    y: -50,
                };
        }
    };
    return (_jsx(motion.div, { ref: ref, initial: Object.assign({ opacity: 0 }, getInitialPosition()), animate: inView && isInView ? { opacity: 1, x: 0, y: 0 } : {}, transition: {
            duration,
            delay,
            ease: [0.21, 0.47, 0.32, 0.98],
        }, className: className, children: children }));
};
