"use client";

import React, { forwardRef, useState, useEffect, useRef } from "react";
import { Text } from "./Text";
import {
  ColorVariant,
  LabelPlacement,
  RadiusVariant,
  SizeVariant,
  StyleVariant,
} from "../types";
import {
  BASE_INPUT_SELECT_CLASSES,
  INPUT_SELECT_CLASSES,
  INPUT_SELECT_SIZE_CLASSES,
  RADIUS_CLASSES,
  WRAPPER_INPUT_SELECT_CLASSES,
} from "../constants/classes";
import { ERROR_INPUT_SELECT_VARIANTS } from "../constants/variants";
import { AlertTriangleIcon, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface AutocompleteProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
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
  options: Array<{ value: string; label: string }>;
  onOptionSelected?: (value: string) => void;
}

const getWrapperClasses = (
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

export const Autocomplete = forwardRef<HTMLInputElement, AutocompleteProps>(
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
      options = [],
      onOptionSelected,
      onChange,
      value,
      ...props
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState(value || "");
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<{
      value: string;
      label: string;
    } | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const wrapperClasses = getWrapperClasses(
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

    useEffect(() => {
      setFilteredOptions(
        options.filter((option) =>
          option.label
            .toLowerCase()
            .includes(inputValue.toString().toLowerCase())
        )
      );
    }, [inputValue, options]);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      onChange?.(e);
      setIsOpen(true);
    };

    const handleOptionClick = (
      option: { value: string; label: string }
    ) => {
      setInputValue(option.label);
      setSelectedOption(option);
      setIsOpen(false);
      onOptionSelected?.(option.value);
    };

    const handleInputFocus = () => {
      setIsOpen(true);
    };

    return (
      <div className="w-full grid gap-1.5 relative" ref={containerRef}>
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
              <div className={wrapperClasses}>
                {leftContent && (
                  <div className="pl-3 flex items-center text-gray-400">
                    {leftContent}
                  </div>
                )}
                <input
                  ref={ref}
                  id={id}
                  value={inputValue}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  disabled={disabled}
                  required={required}
                  className={inputClasses}
                  {...props}
                />
                {rightContent && (
                  <div className="pr-3 flex items-center text-gray-400">
                    {rightContent}
                  </div>
                )}
              </div>

              <AnimatePresence>
                {isOpen && filteredOptions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className={`absolute z-50 w-full mt-1 bg-background border border-foreground/10 rounded-${radius} shadow-lg overflow-hidden`}
                  >
                    <div className="py-1 max-h-60 overflow-auto">
                      {filteredOptions.map((option) => (
                        <div
                          key={option.value}
                          className="relative overflow-hidden"
                          onClick={() => handleOptionClick(option)}
                        >
                          <div
                            className={`px-3 py-2 cursor-pointer flex items-center justify-between transition-colors duration-200 ${
                              selectedOption?.value === option.value
                                ? "bg-background-50"
                                : "hover:bg-foreground/5"
                            }`}
                          >
                            <Text as="span" size="sm">
                              {option.label}
                            </Text>
                            {selectedOption?.value === option.value && (
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

Autocomplete.displayName = "Autocomplete";
