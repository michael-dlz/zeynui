"use client";

import React, {
  forwardRef,
  useState,
  useEffect,
  useRef,
  InputHTMLAttributes,
  ReactNode,
  ChangeEvent,
} from "react";
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
import { AlertTriangleIcon, Check, XIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface AutocompleteProps
  extends InputHTMLAttributes<HTMLInputElement> {
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
      value = "",
      ...props
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState("");
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<{
      value: string;
      label: string;
    } | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const listboxRef = useRef<HTMLDivElement>(null);
    const isTouchDeviceRef = useRef(false);
    const ignoreClickOutsideRef = useRef(false);

    // Detectar si es un dispositivo táctil
    useEffect(() => {
      isTouchDeviceRef.current =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        // @ts-ignore
        navigator.msMaxTouchPoints > 0;
    }, []);

    // Manejo del valor inicial y cambios
    useEffect(() => {
      if (value) {
        const option = options.find((opt) => opt.value === value);
        if (option) {
          setSelectedOption(option);
          setInputValue(option.label);
        }
      } else {
        setSelectedOption(null);
        setInputValue("");
      }
    }, [value, options]);

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

    // Filtrado mejorado
    useEffect(() => {
      if (!isOpen) return;

      if (inputValue === "" || inputValue === selectedOption?.label) {
        setFilteredOptions(options);
      } else {
        setFilteredOptions(
          options.filter((option) =>
            option.label.toLowerCase().includes(inputValue.toLowerCase())
          )
        );
      }
    }, [inputValue, options, isOpen, selectedOption]);

    // Manejo de clicks fuera del componente
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
          if (selectedOption) {
            setInputValue(selectedOption.label);
          }
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [selectedOption]);

    // Mejor manejo del scroll en dispositivos móviles
    useEffect(() => {
      const listbox = listboxRef.current;
      if (!listbox || !isOpen || !isTouchDeviceRef.current) return;

      // Habilitar scroll táctil nativo
      listbox.style.touchAction = "pan-y";
      listbox.style.overflowY = "auto";
      // @ts-ignore - Safari necesita esta propiedad para el scroll suave
      listbox.style.webkitOverflowScrolling = "touch";

      // Prevenir el zoom con doble toque
      const preventZoom = (e: TouchEvent) => {
        if (e.touches.length > 1) {
          e.preventDefault();
        }
      };

      listbox.addEventListener("touchstart", preventZoom, { passive: false });

      return () => {
        listbox.removeEventListener("touchstart", preventZoom);
      };
    }, [isOpen]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      setIsOpen(true);

      if (!newValue) {
        setSelectedOption(null);
        onChange?.({
          ...e,
          target: {
            ...e.target,
            value: "",
          },
        });
      }
    };

    const handleOptionClick = (option: { value: string; label: string }) => {
      setInputValue(option.label);
      setSelectedOption(option);
      setIsOpen(false); // esto basta

      onOptionSelected?.(option.value);
      onChange?.({
        target: {
          name: props.name,
          value: option.value,
        },
      } as ChangeEvent<HTMLInputElement>);

      // No necesitas volver a hacer focus ni abrir el dropdown aquí
    };

    const handleClear = () => {
      setInputValue("");
      setSelectedOption(null);
      setIsOpen(true);
      inputRef.current?.focus();

      const syntheticEvent = {
        target: {
          name: props.name,
          value: "",
        },
      } as ChangeEvent<HTMLInputElement>;

      onChange?.(syntheticEvent);
    };

    const handleInputFocus = () => {
      setIsOpen(true);
      setFilteredOptions(options);
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      } else if (
        e.key === "ArrowDown" &&
        isOpen &&
        filteredOptions.length > 0
      ) {
        e.preventDefault();
        const firstOption = listboxRef.current?.querySelector(
          'div[role="option"]'
        ) as HTMLElement;
        firstOption?.focus();
      }
    };

    const handleOptionKeyDown = (
      e: React.KeyboardEvent,
      option: { value: string; label: string }
    ) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleOptionClick(option);
        setIsOpen(false);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        const nextOption = (e.currentTarget as HTMLElement)
          .nextElementSibling as HTMLElement;
        nextOption?.focus();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const prevOption = (e.currentTarget as HTMLElement)
          .previousElementSibling as HTMLElement;
        if (prevOption) {
          prevOption.focus();
        } else {
          inputRef.current?.focus();
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        setIsOpen(false);
        inputRef.current?.focus();
      }
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
                  <div
                    className={`flex items-center text-sm !pr-0
                ${INPUT_SELECT_SIZE_CLASSES[inputSize]}`}
                  >
                    {leftContent}
                  </div>
                )}
                <input
                  ref={(node) => {
                    if (typeof ref === "function") {
                      ref(node);
                    } else if (ref) {
                      ref.current = node;
                    }
                    inputRef.current = node;
                  }}
                  id={id}
                  value={inputValue}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  onKeyDown={handleInputKeyDown}
                  disabled={disabled}
                  required={required}
                  className={inputClasses}
                  aria-autocomplete="list"
                  aria-haspopup="listbox"
                  aria-expanded={isOpen}
                  aria-controls={`${id}-listbox`}
                  role="combobox"
                  {...props}
                />
                <div className="pr-3 flex items-center gap-2 text-gray-400">
                  {inputValue && !disabled && (
                    <button
                      type="button"
                      onClick={handleClear}
                      className="hover:text-gray-600 transition-colors"
                      aria-label="Limpiar selección"
                    >
                      <XIcon className="size-4" />
                    </button>
                  )}
                  {rightContent && (
                    <div
                      className={`flex items-center text-sm !pl-0
                ${INPUT_SELECT_SIZE_CLASSES[inputSize]}`}
                    >
                      {rightContent}
                    </div>
                  )}
                </div>
              </div>

              <AnimatePresence>
                {isOpen && filteredOptions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className={`absolute z-50 w-full mt-1 bg-background border border-foreground/10 rounded-${radius} shadow-lg overflow-hidden`}
                    id={`${id}-listbox`}
                    role="listbox"
                    ref={listboxRef}
                    style={{
                      // Mejoras específicas para scroll en móviles
                      WebkitOverflowScrolling: "touch",
                      overflowY: "auto",
                      maxHeight: "60vh",
                      overscrollBehavior: "contain",
                    }}
                  >
                    <div className="py-1">
                      {filteredOptions.map((option) => (
                        <div
                          key={option.value}
                          className="relative overflow-hidden"
                          onClick={() => handleOptionClick(option)}
                          onKeyDown={(e) => handleOptionKeyDown(e, option)}
                          role="option"
                          aria-selected={selectedOption?.value === option.value}
                          tabIndex={0}
                        >
                          <div
                            className={`px-3 py-3 cursor-pointer flex items-center justify-between transition-colors duration-200 ${
                              selectedOption?.value === option.value
                                ? "bg-background-50"
                                : "hover:bg-foreground/5"
                            }`}
                            style={{
                              // Tamaño mínimo de toque para dispositivos móviles
                              minHeight: "44px",
                              padding: "12px 16px",
                            }}
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
