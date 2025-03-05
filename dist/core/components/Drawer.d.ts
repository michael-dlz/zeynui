import { ReactNode } from "react";
type DrawerContextType = {
    isOpen: boolean;
    onClose: () => void;
};
export declare const DrawerContext: import("react").Context<DrawerContextType>;
export declare const useDrawerContext: () => DrawerContextType;
export type DrawerPlacement = "top" | "right" | "bottom" | "left";
export type DrawerSize = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
export type BackdropType = "blur" | "opaque" | "transparent";
interface DrawerProps {
    children: ReactNode;
    isOpen: boolean;
    onClose: () => void;
    placement?: DrawerPlacement;
    size?: DrawerSize;
    backdrop?: BackdropType;
}
export declare const Drawer: ({ children, isOpen, onClose, placement, size, backdrop, }: DrawerProps) => import("react/jsx-runtime").JSX.Element;
interface DrawerHeaderProps {
    children: ReactNode;
}
export declare const DrawerHeader: ({ children }: DrawerHeaderProps) => import("react/jsx-runtime").JSX.Element;
interface DrawerBodyProps {
    children: ReactNode;
}
export declare const DrawerBody: ({ children }: DrawerBodyProps) => import("react/jsx-runtime").JSX.Element;
interface DrawerFooterProps {
    children: ReactNode;
}
export declare const DrawerFooter: ({ children }: DrawerFooterProps) => import("react/jsx-runtime").JSX.Element;
export {};
