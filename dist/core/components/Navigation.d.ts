import React from "react";
import { JustifyNavbar, PositionNavbar, SizeNavbar } from "../types";
export interface NavbarProps {
    children: React.ReactNode;
    className?: string;
    position?: PositionNavbar;
    transparent?: boolean;
    size?: SizeNavbar;
    responsive?: React.ReactNode;
    justify?: JustifyNavbar;
}
export interface NavbarContextProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    itemSpacing?: string;
    fullHeightItems?: boolean;
    activeItemClassName?: string;
}
export declare const NavbarContext: React.Context<NavbarContextProps>;
export declare const Navbar: ({ children, className, position, size, responsive, justify, }: NavbarProps) => import("react/jsx-runtime").JSX.Element;
export interface NavbarBrandProps {
    children: React.ReactNode;
    className?: string;
}
export declare const NavbarBrand: ({ children, className }: NavbarBrandProps) => import("react/jsx-runtime").JSX.Element;
export interface NavbarContentProps {
    children: React.ReactNode;
    className?: string;
    justify?: JustifyNavbar;
    fullHeightItems?: boolean;
}
export declare const NavbarContent: ({ children, className, justify, fullHeightItems, }: NavbarContentProps) => import("react/jsx-runtime").JSX.Element;
export interface NavbarItemProps {
    children: React.ReactNode;
    className?: string;
}
export declare const NavbarItem: ({ children, className }: NavbarItemProps) => import("react/jsx-runtime").JSX.Element;
export interface NavbarEndProps {
    children: React.ReactNode;
    className?: string;
}
export declare const NavbarEnd: ({ children, className }: NavbarEndProps) => import("react/jsx-runtime").JSX.Element;
