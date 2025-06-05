import { GradientDirection, RadiusVariant } from "../types";
import { PropsWithChildren } from "react";
interface CardProps extends PropsWithChildren {
    imageCover?: string;
    className?: string;
    gradient?: GradientDirection;
    radius?: RadiusVariant;
    hasShadow?: boolean;
    isCompact?: boolean;
}
interface CardHeaderProps extends PropsWithChildren {
    className?: string;
}
interface CardImageProps extends PropsWithChildren {
    className?: string;
}
interface CardContentProps extends PropsWithChildren {
    className?: string;
    hasImage?: boolean;
}
interface CardFooterProps extends PropsWithChildren {
    className?: string;
    hasImage?: boolean;
}
export declare const Card: ({ children, imageCover, className, gradient, radius, hasShadow, isCompact, }: CardProps) => import("react/jsx-runtime").JSX.Element;
export declare const CardImage: ({ children, className }: CardImageProps) => import("react/jsx-runtime").JSX.Element;
export declare const CardHeader: ({ children, className, isCompact }: CardHeaderProps & {
    isCompact?: boolean;
}) => import("react/jsx-runtime").JSX.Element;
export declare const CardContent: ({ children, className, isCompact }: CardContentProps & {
    isCompact?: boolean;
}) => import("react/jsx-runtime").JSX.Element;
export declare const CardFooter: ({ children, className, isCompact }: CardFooterProps & {
    isCompact?: boolean;
}) => import("react/jsx-runtime").JSX.Element;
export {};
