import React from "react";
import { ColorVariant, RadiusVariant, SizeVariant, StyleVariant } from "../types";
export interface TabsProps {
    children: React.ReactNode;
    defaultTab?: string;
    color?: ColorVariant;
    variant?: StyleVariant;
    radius?: RadiusVariant;
    className?: string;
    size?: SizeVariant;
    onSelectionChange?: (selectedKey: string) => void;
}
export declare const Tabs: ({ children, defaultTab, color, variant, radius, className, size, onSelectionChange, }: TabsProps) => import("react/jsx-runtime").JSX.Element;
export interface TabProps {
    title: string;
    children?: React.ReactNode;
    leftContent?: React.ReactNode;
    rightContent?: React.ReactNode;
    topContent?: React.ReactNode;
    bottomContent?: React.ReactNode;
    as?: React.ElementType;
    href?: string;
    isDefault?: boolean;
    active?: boolean;
}
export declare const Tab: ({ title, children, leftContent, rightContent, topContent, bottomContent, as: Component, href, }: TabProps) => import("react/jsx-runtime").JSX.Element;
