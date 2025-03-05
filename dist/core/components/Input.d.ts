import { InputHTMLAttributes } from "react";
import { ColorVariant, LabelPlacement, RadiusVariant, SizeVariant, StyleVariant } from "../types";
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    variant?: StyleVariant;
    color?: ColorVariant;
    name?: string;
    radius?: RadiusVariant;
    required?: boolean;
    inputSize?: SizeVariant;
    description?: string;
    className?: string;
    leftContent?: React.ReactNode;
    rightContent?: React.ReactNode;
    id?: string;
    disabled?: boolean;
    labelPlacement?: LabelPlacement;
}
export declare const Input: import("react").ForwardRefExoticComponent<InputProps & import("react").RefAttributes<HTMLInputElement>>;
