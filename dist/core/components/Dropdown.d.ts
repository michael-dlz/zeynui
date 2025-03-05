import React from "react";
interface DropdownContextType {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}
export declare const useDropdown: () => DropdownContextType;
export declare const Dropdown: React.FC<{
    children: React.ReactNode;
}>;
interface DropdownContentProps {
    children: React.ReactNode;
    "aria-label"?: string;
}
export declare const DropdownContent: React.FC<DropdownContentProps>;
export declare const DropdownTrigger: React.FC<{
    children: React.ReactNode;
    isHover?: boolean;
    fullWidth?: boolean;
    className?: string;
}>;
export {};
