import { RadiusVariant, ShadowVariant } from "../types";
import { ReactNode } from "react";
type GradientDirection = "up" | "down" | "left" | "right";
interface CardProps {
    children: ReactNode;
    imageCover?: string;
    className?: string;
    gradient?: GradientDirection;
    shadow?: ShadowVariant;
    radius?: RadiusVariant;
}
interface CardHeaderProps {
    children?: ReactNode;
    className?: string;
    hasImage?: boolean;
}
interface CardImageProps {
    children?: ReactNode;
    className?: string;
}
interface CardContentProps {
    children?: ReactNode;
    className?: string;
    hasImage?: boolean;
}
interface CardFooterProps {
    children?: ReactNode;
    className?: string;
    hasImage?: boolean;
}
export declare const Card: ({ children, imageCover, className, gradient, shadow, radius, }: CardProps) => import("react/jsx-runtime").JSX.Element;
export declare const CardImage: ({ children, className }: CardImageProps) => import("react/jsx-runtime").JSX.Element;
export declare const CardHeader: ({ children, className, hasImage, }: CardHeaderProps) => import("react/jsx-runtime").JSX.Element;
export declare const CardContent: ({ children, className }: CardContentProps) => import("react/jsx-runtime").JSX.Element;
export declare const CardFooter: ({ children, className, hasImage, }: CardFooterProps) => import("react/jsx-runtime").JSX.Element;
export {};
