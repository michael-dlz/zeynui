import { ReactNode } from "react";
type SidebarProps = {
    children: ReactNode;
    width?: string;
    className?: string;
};
type SidebarSectionProps = {
    children: ReactNode;
    className?: string;
    sticky?: boolean;
};
export declare function Sidebar({ children, width, className, }: SidebarProps): import("react/jsx-runtime").JSX.Element;
export declare function SidebarSection({ children, className, sticky, }: SidebarSectionProps): import("react/jsx-runtime").JSX.Element;
export declare function SidebarHeader(props: SidebarSectionProps): import("react/jsx-runtime").JSX.Element;
export declare function SidebarBody(props: SidebarSectionProps): import("react/jsx-runtime").JSX.Element;
export declare function SidebarFooter(props: SidebarSectionProps): import("react/jsx-runtime").JSX.Element;
export {};
