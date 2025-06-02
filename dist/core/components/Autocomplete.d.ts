import React, { InputHTMLAttributes, ReactNode } from "react";
import { ColorVariant, LabelPlacement, RadiusVariant, SizeVariant, StyleVariant } from "../types";
export interface AutocompleteProps extends InputHTMLAttributes<HTMLInputElement> {
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
    leftContent?: ReactNode;
    rightContent?: ReactNode;
    id?: string;
    disabled?: boolean;
    labelPlacement?: LabelPlacement;
    options: Array<{
        value: string;
        label: string;
    }>;
    onOptionSelected?: (value: string) => void;
}
export declare const Autocomplete: React.ForwardRefExoticComponent<AutocompleteProps & React.RefAttributes<HTMLInputElement>>;
