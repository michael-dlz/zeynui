"use client";

import React, { ReactNode, forwardRef, useState, useRef, useEffect, SelectHTMLAttributes, MouseEvent, ChangeEvent, Children, ReactElement, isValidElement } from "react";
import {
  ColorVariant,
  LabelPlacement,
  RadiusVariant,
  SizeVariant,
  StyleVariant,
} from "../types";
import { Text } from "./Text";
import {
  BASE_INPUT_SELECT_CLASSES,
  INPUT_SELECT_CLASSES,
  INPUT_SELECT_SIZE_CLASSES,
  RADIUS_CLASSES,
  SIZE_CLASSES,
  WRAPPER_INPUT_SELECT_CLASSES,
} from "../constants/classes";
import { ERROR_INPUT_SELECT_VARIANTS } from "../constants/variants";
import { AlertTriangleIcon, Check, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { twMerge } from "tailwind-merge";

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
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
}

interface SelectItemProps {
  value: string;
  children: ReactNode;
  disabled?: boolean;
}

const getWrapperSelectClasses = (
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

const getSelectClasses = (
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

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      className = "",
      variant = "outline",
      color = "primary",
      required = false,
      radius = "md",
      selectSize = "md",
      description,
      leftContent,
      rightContent,
      id = "",
      disabled = false,
      labelPlacement = "outside",
      children,
      onChange,
      value = "",
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string>(value as string);
    const selectRef = useRef<HTMLSelectElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (value !== undefined) {
        setSelectedValue(value as string);
      }
    }, [value]);

    const wrapperSelectClasses = getWrapperSelectClasses(
      radius,
      variant,
      color,
      error,
      disabled
    );

    const selectClasses = getSelectClasses(
      selectSize,
      variant,
      color,
      error,
      disabled,
      className
    );

    const handleOptionClick = (
      optionValue: string,
      event: MouseEvent<HTMLDivElement>
    ) => {
      if (!disabled) {
        setSelectedValue(optionValue);
        setIsOpen(false);

        if (selectRef.current) {
          selectRef.current.value = optionValue;
          
          const nativeEvent = new Event('change', { bubbles: true });
          Object.defineProperty(nativeEvent, 'target', { value: selectRef.current });
          Object.defineProperty(nativeEvent, 'currentTarget', { value: selectRef.current });
          
          selectRef.current.dispatchEvent(nativeEvent);
          
          onChange?.({
            target: selectRef.current,
            currentTarget: selectRef.current,
            type: 'change',
            bubbles: true,
            cancelable: false,
            defaultPrevented: false,
            isDefaultPrevented: () => false,
            isPropagationStopped: () => false,
            isTrusted: true,
            nativeEvent: nativeEvent,
            preventDefault: () => {},
            stopPropagation: () => {},
            persist: () => {},
            timeStamp: Date.now(),
          } as ChangeEvent<HTMLSelectElement>);
        }
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedValue(e.target.value);
      onChange?.(e);
    };

    useEffect(() => {
      const handleClickOutside = (event: globalThis.MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const options = Children.toArray(children)
      .filter(
        (child): child is ReactElement<SelectItemProps> =>
          isValidElement<SelectItemProps>(child) &&
          typeof child.props.value === "string" &&
          "children" in child.props
      )
      .map((child) => ({
        value: child.props.value,
        label: child.props.children,
        disabled: child.props.disabled,
      }));

    const selectedOption = options.find((opt) => opt.value === selectedValue);

    return (
      <div className="w-full space-y-1.5" ref={containerRef}>
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
          <div className="w-full">
            {labelPlacement === "outside-left" && (
              <Text as="label" htmlFor={id} weight="semibold" size="sm">
                {label} {required && <span className="text-danger">*</span>}
              </Text>
            )}
            {description && labelPlacement === "outside-left" && (
              <Text size="sm" weight="normal" as="p">
                {description}
              </Text>
            )}
            <div className="relative w-full">
              <div
                className={twMerge(
                  wrapperSelectClasses,
                  "cursor-pointer",
                  disabled && "cursor-not-allowed"
                )}
                onClick={() => !disabled && setIsOpen(!isOpen)}
              >
                {leftContent && (
                  <div className="pl-3 flex items-center text-gray-400">
                    {leftContent}
                  </div>
                )}
                <div className={selectClasses}>
                  {selectedOption
                    ? selectedOption.label
                    : "Selecciona una opción"}
                </div>
                <div className="pr-3 flex items-center text-gray-400">
                  <ChevronDown
                    className={`size-4 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>

              <select
                ref={(el) => {
                  if (typeof ref === "function") {
                    ref(el);
                  } else if (ref) {
                    ref.current = el;
                  }
                  selectRef.current = el;
                }}
                id={id}
                value={selectedValue}
                onChange={handleChange}
                disabled={disabled}
                className="hidden"
                {...props}
              >
                {children}
              </select>

              <AnimatePresence>
                {isOpen && !disabled && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className={`absolute z-50 w-full mt-1 bg-background border border-foreground/10 rounded-${radius} shadow-lg overflow-hidden`}
                  >
                    <div className="py-1 max-h-60 overflow-auto">
                      {options.map((option) => (
                        <div
                          key={option.value}
                          className="relative overflow-hidden"
                          onClick={(e) =>
                            !option.disabled &&
                            handleOptionClick(option.value, e)
                          }
                        >
                          <div
                            className={twMerge(
                              "px-3 py-2 cursor-pointer flex items-center justify-between transition-colors duration-200",
                              selectedValue === option.value
                                ? `bg-background-50`
                                : "hover:bg-foreground/5",
                              option.disabled && "opacity-50 cursor-not-allowed"
                            )}
                          >
                            <Text as="span" size="sm">
                              {option.label}
                            </Text>
                            {selectedValue === option.value && (
                              <Check className="size-4" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 mt-1">
            <AlertTriangleIcon className="size-4 text-danger" />
            <Text size="sm" as="span" className="text-danger">
              {error}
            </Text>
          </div>
        )}
      </div>
    );
  }
);

export const SelectItem = ({ value, children, disabled }: SelectItemProps) => {
  return (
    <option value={value} disabled={disabled}>
      {children}
    </option>
  );
};

Select.displayName = "Select";
