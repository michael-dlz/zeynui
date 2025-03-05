import React from "react";
import { ColorVariant, RadiusVariant, SizeVariant, StyleVariant } from "../types";
export interface TabsProps {
    children: React.ReactNode;
    defaultTab?: string;
    color?: ColorVariant;
    variant?: StyleVariant;
    radius?: RadiusVariant;
    className?: string;
    isIconOnly?: boolean;
    size?: SizeVariant;
    onSelectionChange?: (selectedKey: string) => void;
}
export declare const Tabs: React.FC<TabsProps>;
export interface TabProps {
    title: string;
    children?: React.ReactNode;
    className?: string;
}
export declare const Tab: React.FC<TabProps>;
