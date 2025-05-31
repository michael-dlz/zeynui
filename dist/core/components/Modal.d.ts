import { ReactNode } from "react";
type BackdropType = "blur" | "opaque" | "transparent";
type ModalSize = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
interface ModalProps {
    children: ReactNode;
    backdrop?: BackdropType;
    size?: ModalSize;
    isOpen?: boolean;
    onOpenChange?: (isOpen: boolean) => void;
    onClose?: () => void;
    closeOnClickOutside?: boolean;
    className?: string;
}
interface ModalSubcomponentProps {
    children: ReactNode;
    className?: string;
    onClose?: () => void;
}
export declare const Modal: ({ children, backdrop, size, isOpen: isOpenProp, onOpenChange, onClose, closeOnClickOutside, className, }: ModalProps) => import("react/jsx-runtime").JSX.Element;
export declare const ModalHeader: ({ children, className, onClose, }: ModalSubcomponentProps) => import("react/jsx-runtime").JSX.Element;
export declare const ModalBody: ({ children, className, }: ModalSubcomponentProps) => import("react/jsx-runtime").JSX.Element;
export declare const ModalFooter: ({ children, className, }: ModalSubcomponentProps) => import("react/jsx-runtime").JSX.Element;
export {};
