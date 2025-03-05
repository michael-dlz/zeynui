"use client";

import React, {
  useState,
  createContext,
  useContext,
  useRef,
  useEffect,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDownIcon } from "@heroicons/react/24/outline";
import { AlignmentVariant } from "../types";

interface DropdownContextType {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const DropdownContext = createContext<DropdownContextType | undefined>(
  undefined
);

export const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("useDropdown must be used within a Dropdown");
  }
  return context;
};

export const Dropdown: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="relative inline-block w-full">{children}</div>
    </DropdownContext.Provider>
  );
};

interface DropdownContentProps {
  children: React.ReactNode;
  "aria-label"?: string;
}

export const DropdownContent: React.FC<DropdownContentProps> = ({
  children,
  "aria-label": ariaLabel,
}) => {
  const { isOpen, setIsOpen } = useDropdown();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
          className="absolute z-50 mt-2 bg-white rounded-lg shadow-lg"
          role="menu"
          aria-label={ariaLabel}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const DropdownTrigger: React.FC<{
  children: React.ReactNode;
  isHover?: boolean;
  fullWidth?: boolean;
  className?: string;
}> = ({ children, isHover = false, fullWidth = false, className = "" }) => {
  const { isOpen, setIsOpen } = useDropdown();
  const [isHovered, setIsHovered] = useState(false);

  // Maneja el click para abrir/cerrar el dropdown
  const handleClick = () => {
    if (!isHover) {
      setIsOpen(!isOpen);
    }
  };

  // Maneja el hover para abrir el dropdown si isHover está activado
  const handleMouseEnter = () => {
    if (isHover) {
      setIsOpen(true);
      setIsHovered(true);
    }
  };

  // Maneja el hover para cerrar el dropdown si isHover está activado
  const handleMouseLeave = () => {
    if (isHover && !isOpen) {
      setIsOpen(false);
      setIsHovered(false);
    }
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`
        inline-flex 
        items-center 
        ${className}`}
    >
      {children}
    </div>
  );
};
