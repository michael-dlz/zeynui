import React, { ReactNode, SelectHTMLAttributes } from "react";
import { ColorVariant, LabelPlacement, RadiusVariant, SizeVariant, StyleVariant } from "../types";
export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size" | "value" | "onChange"> {
    label: string;
    error?: string;
    variant?: StyleVariant;
    color?: ColorVariant;
    name?: string;
    radius?: RadiusVariant;
    required?: boolean;
    selectSize?: SizeVariant;
    description?: string;
    className?: string;
    leftContent?: ReactNode;
    rightContent?: ReactNode;
    id?: string;
    disabled?: boolean;
    labelPlacement?: LabelPlacement;
    children: ReactNode;
    inputSize?: SizeVariant;
    mode?: "single" | "multiple";
    value?: string | string[];
    onChange?: (value: string | string[], event?: React.ChangeEvent<HTMLSelectElement>) => void;
    placeholder?: string;
    maxSelectedDisplay?: number;
    chipVariant?: StyleVariant;
    chipColor?: ColorVariant;
    chipSize?: SizeVariant;
    chipRadius?: RadiusVariant;
}
interface SelectItemProps {
    value: string;
    children: ReactNode;
    disabled?: boolean;
}
export declare const Select: React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLSelectElement>>;
export declare const SelectItem: ({ value, children, disabled }: SelectItemProps) => import("react/jsx-runtime").JSX.Element;
export {};
