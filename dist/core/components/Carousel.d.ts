interface CarouselProps {
    children: React.ReactNode;
    navigation?: boolean;
    pagination?: boolean;
    thumbnails?: boolean;
    autoplay?: boolean;
    interval?: number;
    aspectRatio?: "16/9" | "4/3" | "1/1";
    loop?: boolean;
    draggable?: boolean;
    align?: "start" | "center" | "end";
    slidesToShow?: number;
    spacing?: number;
    duration?: number;
    dragFree?: boolean;
    className?: string;
}
export declare const Carousel: React.FC<CarouselProps>;
interface CarouselItemProps {
    children: React.ReactNode;
}
export declare const CarouselItem: React.FC<CarouselItemProps>;
export {};
