import { forwardRef, InputHTMLAttributes } from "react";
import { Text } from "./Text";
import {
  ColorVariant,
  LabelPlacement,
  RadiusVariant,
  SizeVariant,
  StyleVariant,
} from "../types";
import { AlertTriangleIcon } from "lucide-react";
import {
  BASE_INPUT_SELECT_CLASSES,
  INPUT_SELECT_CLASSES,
  INPUT_SELECT_SIZE_CLASSES,
  RADIUS_CLASSES,
  SIZE_CLASSES,
  WRAPPER_INPUT_SELECT_CLASSES,
} from "../constants/classes";
import { ERROR_INPUT_SELECT_VARIANTS } from "../constants/variants";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
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
}

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
  ${
    error
      ? ERROR_INPUT_SELECT_VARIANTS[variant]
      : WRAPPER_INPUT_SELECT_CLASSES[variant][color]
  }
`;

const getInputClasses = (
  inputSize: SizeVariant,
  variant: StyleVariant,
  color: ColorVariant,
  error?: string,
  disabled?: boolean,
  className?: string
) => `
  ${BASE_INPUT_SELECT_CLASSES.input}
  ${INPUT_SELECT_SIZE_CLASSES[inputSize]}
  ${disabled ? BASE_INPUT_SELECT_CLASSES.disabled : ""}
  ${INPUT_SELECT_CLASSES[variant][color]}
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
      <div className="w-full grid gap-1.5">
        {labelPlacement === "outside" && (
          <Text as="label" htmlFor={id} weight="semibold" size="sm">
            {label} {required && <span className="text-danger">*</span>}
          </Text>
        )}
        {description && !(labelPlacement === "outside-left") && (
          <Text size="sm" weight="normal" as="p">
            {description}
          </Text>
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
              <Text as="label" htmlFor={id} weight="semibold" size="sm">
                {label} {required && <span className="text-danger">*</span>}
              </Text>
            )}
            {description && labelPlacement === "outside-left" && (
              <Text size="xs" weight="normal" as="p">
                {description}
              </Text>
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
            <AlertTriangleIcon className="size-3" />
            <Text as="span" size="xs" className="!text-danger">
              {error}
            </Text>
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
