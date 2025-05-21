"use client";

import { Text } from "@zeynui/react";
import { useEffect, useRef, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  indeterminate?: boolean;
  label?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      checked,
      onChange,
      indeterminate = false,
      className = "",
      label = "",
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

    return (
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          ref={innerRef}
          checked={checked}
          onChange={onChange}
          className={twMerge(
            "h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary checked:bg-primary",
            className
          )}
          {...props}
        />
        {label && (
          <Text as="label" size="sm" weight="semibold">
            {label}
          </Text>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
