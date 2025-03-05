import React, { ReactNode, FC, InputHTMLAttributes } from "react";
import { ColorVariant, LabelPlacement, RadiusVariant, SizeVariant, StyleVariant } from "../types";
export interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
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
    leftContent?: React.ReactNode;
    rightContent?: React.ReactNode;
    id?: string;
    disabled?: boolean;
    labelPlacement?: LabelPlacement;
    children: React.ReactNode;
}
interface SelectItemProps {
    value: string;
    children: ReactNode;
    disabled?: boolean;
}
export declare const Select: React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLSelectElement>>;
export declare const SelectItem: FC<SelectItemProps>;
export {};
