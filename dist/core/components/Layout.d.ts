import { PropsWithChildren } from "react";
interface LayoutProps extends PropsWithChildren {
    className?: string;
}
export declare const Layout: ({ children, className }: LayoutProps) => import("react/jsx-runtime").JSX.Element;
interface HeaderProps extends PropsWithChildren {
    className?: string;
}
export declare const Header: ({ children, className }: HeaderProps) => import("react/jsx-runtime").JSX.Element;
interface MainProps extends PropsWithChildren {
    className?: string;
    fullWidth?: boolean;
}
export declare const Main: ({ children, className, fullWidth }: MainProps) => import("react/jsx-runtime").JSX.Element;
interface FooterProps extends PropsWithChildren {
    className?: string;
}
export declare const Footer: ({ children, className }: FooterProps) => import("react/jsx-runtime").JSX.Element;
export {};
