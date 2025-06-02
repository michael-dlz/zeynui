"use client";

import { Text } from "@zeynui/react";
import { useEffect, useRef, forwardRef, InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { ColorVariant } from "../types";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  indeterminate?: boolean;
  label?: string;
  color?: ColorVariant;
  disabled?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      checked,
      onChange,
      indeterminate = false,
      className = "",
      label = "",
      color = "primary",
      disabled = false,
      ...props
    },
    ref
  ) => {
    const innerRef = useRef<HTMLInputElement>(null);

    // Combina las refs
    useEffect(() => {
      if (typeof ref === "function") {
        ref(innerRef.current);
      } else if (ref) {
        ref.current = innerRef.current;
      }
    }, [ref]);

    useEffect(() => {
      if (innerRef.current) {
        innerRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const getColorClasses = (colorName: ColorVariant): string => {
      const colorMap = {
        primary:
          "text-primary focus:ring-primary checked:bg-primary checked:border-primary",
        secondary:
          "text-secondary focus:ring-secondary checked:bg-secondary checked:border-secondary",
        success:
          "text-success focus:ring-success checked:bg-success checked:border-success",
        danger:
          "text-danger focus:ring-danger checked:bg-danger checked:border-danger",
        warning:
          "text-warning focus:ring-warning checked:bg-warning checked:border-warning",
        info: "text-info focus:ring-info checked:bg-info checked:border-info",
        whatsapp:
          "text-whatsapp focus:ring-whatsapp checked:bg-whatsapp checked:border-whatsapp",
      };
      return colorMap[colorName];
    };

    return (
      <div className="flex items-center gap-2">
        <div className="relative flex items-center">
          <input
            type="checkbox"
            ref={innerRef}
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            className={twMerge(
              "peer relative size-5 cursor-pointer appearance-none rounded-md border border-gray-300",
              "transition-all duration-200 ease-in-out",
              "focus:outline-none focus:ring-2 focus:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "checked:border-transparent",
              getColorClasses(color),
              className
            )}
            {...props}
          />
          <svg
            className={twMerge(
              "pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-3",
              "fill-none stroke-white stroke-[4] opacity-0 transition-opacity",
              "peer-checked:opacity-100",
              indeterminate ? "peer-checked:hidden" : ""
            )}
            viewBox="0 0 24 24"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          {indeterminate && (
            <div
              className={twMerge(
                "pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-2",
                "rounded-sm bg-white opacity-0 transition-opacity",
                "peer-checked:opacity-100"
              )}
            />
          )}
        </div>
        {label && (
          <Text
            as="label"
            size="sm"
            weight="semibold"
            className={twMerge(
              "cursor-pointer select-none",
              disabled && "cursor-not-allowed opacity-50"
            )}
          >
            {label}
          </Text>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
