import { ColorVariant, StyleVariant } from "../types";
interface RippleProps {
    variant: StyleVariant;
    color: ColorVariant;
    ripples: Array<{
        x: number;
        y: number;
        id: number;
    }>;
}
export declare const Ripple: ({ variant, ripples, color }: RippleProps) => import("react/jsx-runtime").JSX.Element;
export {};
