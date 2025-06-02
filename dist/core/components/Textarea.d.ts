import { TextareaHTMLAttributes } from "react";
import { ColorVariant, LabelPlacement, RadiusVariant, SizeVariant, StyleVariant } from "../types";
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
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
    rows?: number;
}
export declare const Textarea: import("react").ForwardRefExoticComponent<TextareaProps & import("react").RefAttributes<HTMLTextAreaElement>>;
