import React from "react";
import { ReactNode } from "react";
export interface AnimationProps {
    children: ReactNode;
    delay?: number;
    duration?: number;
    className?: string;
    inView?: boolean;
}
export declare const AnimateIn: ({ children, delay, duration, className, inView, }: AnimationProps) => import("react/jsx-runtime").JSX.Element;
export declare const FadeScale: React.FC<AnimationProps>;
export declare const RevealAnimation: React.FC<AnimationProps>;
interface SlideInProps extends AnimationProps {
    direction?: "left" | "right" | "up" | "down";
}
export declare const SlideIn: React.FC<SlideInProps>;
export {};
