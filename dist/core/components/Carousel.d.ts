import { PropsWithChildren } from "react";
import { RadiusVariant } from "../types";
interface CarouselProps extends PropsWithChildren {
    navigation?: boolean;
    pagination?: boolean;
    thumbnails?: boolean;
    autoplay?: boolean;
    interval?: number;
    loop?: boolean;
    align?: "start" | "center" | "end";
    slidesToShow?: number;
    spacing?: number;
    duration?: number;
    dragFree?: boolean;
    radiusThumbnails?: RadiusVariant;
    className?: string;
}
export declare const Carousel: ({ children, navigation, pagination, thumbnails, autoplay, interval, loop, align, slidesToShow, spacing, duration, dragFree, radiusThumbnails, className, }: CarouselProps) => import("react/jsx-runtime").JSX.Element;
interface CarouselItemProps extends PropsWithChildren {
    className?: string;
}
export declare const CarouselItem: ({ children, className, }: CarouselItemProps) => import("react/jsx-runtime").JSX.Element;
export {};
