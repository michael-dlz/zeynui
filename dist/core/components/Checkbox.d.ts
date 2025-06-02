import { InputHTMLAttributes } from "react";
import { ColorVariant } from "../types";
interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    indeterminate?: boolean;
    label?: string;
    color?: ColorVariant;
    disabled?: boolean;
}
export declare const Checkbox: import("react").ForwardRefExoticComponent<CheckboxProps & import("react").RefAttributes<HTMLInputElement>>;
export {};
