"use client";
import {
  useCallback,
  useEffect,
  useState,
  Children,
  useMemo,
  PropsWithChildren,
} from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaEventType } from "embla-carousel";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Button } from "./Button";
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

export const Carousel = ({
  children,
  navigation = false,
  pagination = false,
  thumbnails = false,
  autoplay = false,
  interval = 3000,
  loop = false,
  align = "center",
  slidesToShow = 1,
  spacing = 10,
  duration = 25,
  dragFree = false,
  radiusThumbnails = "sm",
  className = "",
}: CarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop,
    dragFree,
    containScroll: "keepSnaps",
    align,
    slidesToScroll: slidesToShow,
    skipSnaps: false,
    duration,
    startIndex: 0,
  });

  const [thumbsRef, thumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: dragFree,
    align: "start",
    slidesToScroll: 1,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [autoplayPaused, setAutoplayPaused] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  useEffect(() => {
    if (!autoplay || !emblaApi || autoplayPaused) return;
    const intervalId = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else if (loop) {
        emblaApi.scrollTo(0);
      }
    }, interval);
    return () => clearInterval(intervalId);
  }, [autoplay, interval, emblaApi, loop, autoplayPaused]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
    if (thumbsApi) {
      thumbsApi.scrollTo(emblaApi.selectedScrollSnap());
    }
  }, [emblaApi, thumbsApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onPointerDown = () => {
      setIsDragging(true);
      setAutoplayPaused(true);
    };
    const onPointerUp = () => {
      setIsDragging(false);
      setAutoplayPaused(false);
    };
    const onDragStart = () => setIsDragging(true);
    const onDragEnd = () => setIsDragging(false);
    emblaApi.on("pointerDown", onPointerDown);
    emblaApi.on("pointerUp", onPointerUp);
    emblaApi.on("dragStart" as EmblaEventType, onDragStart);
    emblaApi.on("dragEnd" as EmblaEventType, onDragEnd);
    return () => {
      emblaApi.off("pointerDown", onPointerDown);
      emblaApi.off("pointerUp", onPointerUp);
      emblaApi.off("dragStart" as EmblaEventType, onDragStart);
      emblaApi.off("dragEnd" as EmblaEventType, onDragEnd);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div
      className={`relative w-full h-full`}
      onMouseEnter={() => setAutoplayPaused(true)}
      onMouseLeave={() => setAutoplayPaused(false)}
    >
      <div className={`relative overflow-hidden ${className}`}>
        <div ref={emblaRef} className="overflow-hidden h-full">
          <div
            className={`flex touch-pan-y h-full ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
            style={{
              gap: `${spacing}px`,
              width: `calc(100% + ${spacing}px)`,
            }}
          >
            {Children.map(children, (child, index) => (
              <div
                key={index}
                className="flex-shrink-0"
                style={{
                  width: `calc(${100 / slidesToShow}% - ${spacing}px)`,
                }}
              >
                {child}
              </div>
            ))}
          </div>
        </div>
        {navigation && (
          <>
            <Button
              isRelative={false}
              isIconOnly
              color="primary"
              onClick={scrollPrev}
              radius="full"
              disabled={!loop && !prevBtnEnabled}
              className={`absolute hover:bg-white bg-white left-2 top-1/2 -translate-y-1/2 
                ${
                  !loop && !prevBtnEnabled
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-white"
                }`}
              aria-label="Previous slide"
            >
              <ChevronLeftIcon className="size-4" stroke="#000" />
            </Button>
            <Button
              isRelative={false}
              isIconOnly
              radius="full"
              onClick={scrollNext}
              disabled={!loop && !nextBtnEnabled}
              className={`absolute hover:bg-white bg-white right-2 top-1/2 -translate-y-1/2
                ${
                  !loop && !nextBtnEnabled
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-white"
                }`}
              aria-label="Next slide"
            >
              <ChevronRightIcon className="size-4" stroke="#000" />
            </Button>
          </>
        )}
        {pagination && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  selectedIndex === index ? "bg-white w-4" : "bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
      {thumbnails && (
        <div className="relative mt-4">
          <div ref={thumbsRef} className="overflow-hidden">
            <div className="flex gap-2">
              {Children.map(children, (child, index) => (
                <Button
                  key={index}
                  isBounce={false}
                  size="sm"
                  radius={radiusThumbnails}
                  onClick={() => scrollTo(index)}
                  className={`!p-0 flex-[0_0_100px] min-w-0 transition-opacity rounded-lg overflow-hidden aspect-square h-20 object-cover bg-black/50 cursor-pointer
                    ${
                      selectedIndex === index
                        ? ""
                        : "opacity-50 hover:opacity-75"
                    }`}
                  style={{
                    transition: "opacity 0.2s ease",
                  }}
                >
                  {child}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface CarouselItemProps extends PropsWithChildren {
  className?: string;
}

export const CarouselItem = ({
  children,
  className = "",
}: CarouselItemProps) => {
  return <div className={`flex-shrink-0 w-full ${className}`}>{children}</div>;
};
