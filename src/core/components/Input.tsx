import { forwardRef, InputHTMLAttributes } from "react";
import { Typography } from "./Typography";
import {
  ColorVariant,
  LabelPlacement,
  RadiusVariant,
  SizeVariant,
  StyleVariant,
  VariantClasses,
} from "../types";

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

// Constantes reutilizables
const BASE_CLASSES = {
  input:
    "w-full bg-transparent outline-none -internal-autofill-selected:bg-none",
  disabled:
    "bg-gray-50 opacity-60 cursor-not-allowed placeholder:text-black/80",
};

const ERROR_CLASSES: Record<StyleVariant, string> = {
  solid:
    "bg-danger border-danger/50 hover:border-danger/70 text-white focus-within:border-danger/50 focus-within:ring-4 focus-within:ring-danger/10",
  outline:
    "border border-danger/50 text-danger focus-within:border-danger/50 focus-within:ring-4 focus-within:ring-danger/10",
  soft: "bg-danger/10 border-danger/50 text-danger focus-within:border-danger/50 focus-within:ring-4 focus-within:ring-danger/20",
  light:
    "text-danger focus-within:border-danger/50 focus-within:ring-4 focus-within:ring-danger/10",
  underline: "border-b border-danger text-danger",
};

const INPUT_WRAPPER_CLASSES: VariantClasses = {
  solid: {
    primary:
      "bg-primary hover:bg-primary/80 text-white focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10",
    secondary:
      "bg-secondary hover:bg-secondary/80 text-white focus-within:border-secondary/50 focus-within:ring-4 focus-within:ring-secondary/10",
    danger:
      "bg-danger hover:bg-danger/80 text-white focus-within:border-danger/50 focus-within:ring-4 focus-within:ring-danger/10",
    warning:
      "bg-warning hover:bg-warning/80 text-white focus-within:border-warning/50 focus-within:ring-4 focus-within:ring-warning/10",
    success:
      "bg-success hover:bg-success/80 text-white focus-within:border-success/50 focus-within:ring-4 focus-within:ring-success/10",
    info: "bg-info hover:bg-info/80 text-black focus-within:border-info/50 focus-within:ring-4 focus-within:ring-info/10",
    whatsapp:
      "bg-whatsapp hover:bg-whatsapp/80 text-white focus-within:border-whatsapp/50 focus-within:ring-4 focus-within:ring-whatsapp/10",
  },
  outline: {
    primary:
      "border border-primary focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10",
    secondary:
      "border border-secondary focus-within:border-secondary/50 focus-within:ring-4 focus-within:ring-secondary/10",
    danger:
      "border border-danger focus-within:border-danger/50 focus-within:ring-4 focus-within:ring-danger/10",
    warning:
      "border border-warning focus-within:border-warning/50 focus-within:ring-4 focus-within:ring-warning/10",
    success:
      "border border-success focus-within:border-success/50 focus-within:ring-4 focus-within:ring-success/10",
    info: "border border-info focus-within:border-info/50 focus-within:ring-4 focus-within:ring-info/10",
    whatsapp:
      "border border-whatsapp focus-within:border-whatsapp/50 focus-within:ring-4 focus-within:ring-whatsapp/10",
  },
  soft: {
    primary:
      "bg-primary/5 border border-transparent focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 text-primary",
    secondary:
      "bg-secondary/5 border border-transparent focus-within:border-secondary focus-within:ring-4 focus-within:ring-secondary/10 text-secondary",
    danger:
      "bg-danger/5 border border-transparent focus-within:border-danger focus-within:ring-4 focus-within:ring-danger/10 text-danger",
    warning:
      "bg-warning/5 border border-transparent focus-within:border-warning focus-within:ring-4 focus-within:ring-warning/10 text-warning",
    success:
      "bg-success/5 border border-transparent focus-within:border-success focus-within:ring-4 focus-within:ring-success/10 text-success",
    info: "bg-info/5 border border-transparent focus-within:border-info focus-within:ring-4 focus-within:ring-info/10 text-info",
    whatsapp:
      "bg-whatsapp/5 border border-transparent focus-within:border-whatsapp focus-within:ring-4 focus-within:ring-whatsapp/10 text-whatsapp",
  },
  light: {
    primary:
      "border border-gray-300 hover:border-primary focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10",
    secondary:
      "border border-gray-300 hover:border-secondary focus-within:border-secondary/50 focus-within:ring-4 focus-within:ring-secondary/10",
    danger:
      "border border-gray-300 hover:border-danger focus-within:border-danger/50 focus-within:ring-4 focus-within:ring-danger/10",
    warning:
      "border border-gray-300 hover:border-warning focus-within:border-warning/50 focus-within:ring-4 focus-within:ring-warning/10",
    success:
      "border border-gray-300 hover:border-success focus-within:border-success/50 focus-within:ring-4 focus-within:ring-success/10",
    info: "border border-gray-300 hover:border-info focus-within:border-info/50 focus-within:ring-4 focus-within:ring-info/10",
    whatsapp:
      "border border-gray-300 hover:border-whatsapp focus-within:border-whatsapp/50 focus-within:ring-4 focus-within:ring-whatsapp/10",
  },
  underline: {
    primary:
      "bg-gray-50 border-b border-primary hover:bg-gray-100 focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10",
    secondary:
      "bg-gray-50 border-b border-secondary hover:bg-gray-100 focus-within:border-secondary/50 focus-within:ring-4 focus-within:ring-secondary/10",
    danger:
      "bg-gray-50 border-b border-danger hover:bg-gray-100 focus-within:border-danger/50 focus-within:ring-4 focus-within:ring-danger/10",
    warning:
      "bg-gray-50 border-b border-warning hover:bg-gray-100 focus-within:border-warning/50 focus-within:ring-4 focus-within:ring-warning/10",
    success:
      "bg-gray-50 border-b border-success hover:bg-gray-100 focus-within:border-success/50 focus-within:ring-4 focus-within:ring-success/10",
    info: "bg-gray-50 border-b border-info hover:bg-gray-100 focus-within:border-info/50 focus-within:ring-4 focus-within:ring-info/10",
    whatsapp:
      "bg-gray-50 border-b border-whatsapp hover:bg-gray-100 focus-within:border-whatsapp/50 focus-within:ring-4 focus-within:ring-whatsapp/10",
  },
};

const INPUT_CLASSES: VariantClasses = {
  solid: {
    primary: "placeholder:text-white text-white",
    secondary: "placeholder:text-white text-white",
    danger: "placeholder:text-white text-white",
    warning: "placeholder:text-white text-white",
    success: "placeholder:text-white text-white",
    info: "placeholder:text-black text-black",
    whatsapp: "placeholder:text-white text-white",
  },
  outline: {
    primary: "placeholder:text-gray-500 text-black",
    secondary: "placeholder:text-gray-500 text-black",
    danger: "placeholder:text-gray-500 text-black",
    warning: "placeholder:text-gray-500 text-black",
    success: "placeholder:text-gray-500 text-black",
    info: "placeholder:text-gray-500 text-black",
    whatsapp: "placeholder:text-gray-500 text-black",
  },
  soft: {
    primary: "placeholder:text-primary text-primary",
    secondary: "placeholder:text-secondary text-secondary",
    danger: "placeholder:text-danger text-danger",
    warning: "placeholder:text-warning text-warning",
    success: "placeholder:text-success text-success",
    info: "placeholder:text-info text-info",
    whatsapp: "placeholder:text-whatsapp text-whatsapp",
  },
  light: {
    primary: "placeholder:text-gray-500 text-black",
    secondary: "placeholder:text-gray-500 text-black",
    danger: "placeholder:text-gray-500 text-black",
    warning: "placeholder:text-gray-500 text-black",
    success: "placeholder:text-gray-500 text-black",
    info: "placeholder:text-gray-500 text-black",
    whatsapp: "placeholder:text-gray-500 text-black",
  },
  underline: {
    primary: "placeholder:text-gray-500 text-black",
    secondary: "placeholder:text-gray-500 text-black",
    danger: "placeholder:text-gray-500 text-black",
    warning: "placeholder:text-gray-500 text-black",
    success: "placeholder:text-gray-500 text-black",
    info: "placeholder:text-gray-500 text-black",
    whatsapp: "placeholder:text-gray-500 text-black",
  },
};

const RADIUS_CLASSES: Record<RadiusVariant, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

const SIZE_CLASSES: Record<SizeVariant, string> = {
  sm: "text-xs p-2",
  md: "text-sm p-3",
  lg: "text-base p-4",
};

// Función para generar clases dinámicas
const getWrapperInputClasses = (
  radius: RadiusVariant,
  variant: StyleVariant,
  color: ColorVariant,
  error?: string,
  disabled?: boolean
) => `
  flex items-center w-full rounded-lg
  transition-all duration-300 ease-in-out
  ${
    disabled
      ? "bg-gray-50 opacity-60 border border-gray-300 cursor-not-allowed text-black/80"
      : ""
  }
  ${RADIUS_CLASSES[radius]}
  ${error ? ERROR_CLASSES[variant] : INPUT_WRAPPER_CLASSES[variant][color]}
`;

const getInputClasses = (
  inputSize: SizeVariant,
  variant: StyleVariant,
  color: ColorVariant,
  error?: string,
  disabled?: boolean,
  className?: string
) => `
  ${BASE_CLASSES.input}
  ${SIZE_CLASSES[inputSize]}
  ${disabled ? BASE_CLASSES.disabled : ""}
  ${INPUT_CLASSES[variant][color]}
  ${error && variant === "soft" ? "placeholder:text-danger" : ""}
  ${className}
`;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      className = "",
      variant = "outline",
      color = "primary",
      required = false,
      radius = "md",
      inputSize = "md",
      description,
      leftContent,
      rightContent,
      id = "",
      disabled = false,
      labelPlacement = "outside",
      ...props
    },
    ref
  ) => {
    const wrapperClasses = getWrapperInputClasses(
      radius,
      variant,
      color,
      error,
      disabled
    );

    const inputClasses = getInputClasses(
      inputSize,
      variant,
      color,
      error,
      disabled,
      className
    );

    return (
      <div className="w-full grid gap-1">
        {labelPlacement === "outside" && (
          <Typography as="label" htmlFor={id} weight="semibold" size="sm">
            {label} {required && <span className="text-danger">*</span>}
          </Typography>
        )}
        {description && !(labelPlacement === "outside-left") && (
          <Typography size="sm" weight="normal" as="p">
            {description}
          </Typography>
        )}
        <div
          className={
            labelPlacement === "outside-left"
              ? "flex items-center gap-5 justify-start"
              : ""
          }
        >
          <div className="">
            {labelPlacement === "outside-left" && (
              <Typography as="label" htmlFor={id} weight="semibold" size="sm">
                {label} {required && <span className="text-danger">*</span>}
              </Typography>
            )}
            {description && labelPlacement === "outside-left" && (
              <Typography size="xs" weight="normal" as="p">
                {description}
              </Typography>
            )}
          </div>
          <div className={wrapperClasses}>
            {leftContent && (
              <div
                className={`flex items-center text-sm 
                  ${SIZE_CLASSES[inputSize]}`}
              >
                {leftContent}
              </div>
            )}
            <input
              id={id}
              ref={ref}
              disabled={disabled}
              className={inputClasses}
              {...props}
            />
            {rightContent && (
              <div
                className={`flex items-center text-sm 
                ${SIZE_CLASSES[inputSize]}`}
              >
                {rightContent}
              </div>
            )}
          </div>
        </div>
        {error && typeof error === "string" && (
          <div className="flex items-center gap-1 mt-1.5 text-danger text-sm">
            <span>{"x"}</span>
            <Typography as="span" size="xs" className="!text-danger">
              {error}
            </Typography>
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
