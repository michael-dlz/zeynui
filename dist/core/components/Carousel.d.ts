interface CarouselProps {
    children: React.ReactNode;
    navigation?: boolean;
    pagination?: boolean;
    thumbnails?: boolean;
    autoplay?: boolean;
    interval?: number;
    loop?: boolean;
    draggable?: boolean;
    align?: "start" | "center" | "end";
    slidesToShow?: number;
    spacing?: number;
    duration?: number;
    dragFree?: boolean;
    className?: string;
}
export declare const Carousel: ({ children, navigation, pagination, thumbnails, autoplay, interval, loop, draggable, align, slidesToShow, spacing, duration, dragFree, className, }: CarouselProps) => import("react/jsx-runtime").JSX.Element;
interface CarouselItemProps {
    children: React.ReactNode;
    className?: string;
}
export declare const CarouselItem: ({ children, className, }: CarouselItemProps) => import("react/jsx-runtime").JSX.Element;
export {};
