import { RadiusVariant } from "../types";
import { ReactNode } from "react";
type GradientDirection = "up" | "down" | "left" | "right";
interface CardProps {
    children: ReactNode;
    imageCover?: string;
    className?: string;
    gradient?: GradientDirection;
    radius?: RadiusVariant;
    compact?: boolean;
}
interface CardHeaderProps {
    children?: ReactNode;
    className?: string;
    hasImage?: boolean;
    compact?: boolean;
}
interface CardImageProps {
    children?: ReactNode;
    className?: string;
}
interface CardContentProps {
    children?: ReactNode;
    className?: string;
    hasImage?: boolean;
    compact?: boolean;
}
interface CardFooterProps {
    children?: ReactNode;
    className?: string;
    hasImage?: boolean;
    compact?: boolean;
}
export declare const Card: ({ children, imageCover, className, gradient, radius, }: CardProps) => import("react/jsx-runtime").JSX.Element;
export declare const CardImage: ({ children, className }: CardImageProps) => import("react/jsx-runtime").JSX.Element;
export declare const CardHeader: ({ children, className, hasImage, compact, }: CardHeaderProps) => import("react/jsx-runtime").JSX.Element;
export declare const CardContent: ({ children, className, compact, }: CardContentProps) => import("react/jsx-runtime").JSX.Element;
export declare const CardFooter: ({ children, className, hasImage, compact, }: CardFooterProps) => import("react/jsx-runtime").JSX.Element;
export {};
