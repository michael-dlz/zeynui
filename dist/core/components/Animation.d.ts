import { ReactNode } from "react";
export interface AnimationProps {
    children: ReactNode;
    delay?: number;
    duration?: number;
    className?: string;
    inView?: boolean;
    loop?: boolean;
}
export declare const AnimateIn: ({ children, delay, duration, className, inView, loop, }: AnimationProps) => import("react/jsx-runtime").JSX.Element;
export declare const FadeScale: ({ children, delay, duration, className, inView, loop, }: AnimationProps) => import("react/jsx-runtime").JSX.Element;
interface SlideInProps extends AnimationProps {
    direction?: "left" | "right" | "up" | "down";
}
export declare const SlideIn: ({ children, delay, duration, direction, className, inView, loop, }: SlideInProps) => import("react/jsx-runtime").JSX.Element;
export declare const StaggeredAnimation: ({ children, delay, duration, className, inView, loop, }: AnimationProps) => import("react/jsx-runtime").JSX.Element;
export {};
