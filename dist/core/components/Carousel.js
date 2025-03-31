"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useState, Children } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "./Button";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
export const Carousel = ({ children, navigation = false, pagination = false, thumbnails = false, autoplay = false, interval = 3000, loop = false, draggable = true, align = "center", slidesToShow = 1, spacing = 10, duration = 25, dragFree = false, className = "", }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop,
        dragFree,
        containScroll: "keepSnaps",
        align,
        slidesToScroll: slidesToShow,
        skipSnaps: false,
        duration, // Duración de la transición ajustada
        startIndex: 0,
    });
    const [thumbsRef, thumbsApi] = useEmblaCarousel({
        containScroll: "keepSnaps",
        dragFree: true,
        align: "start",
        slidesToScroll: 1,
    });
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState([]);
    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [autoplayPaused, setAutoplayPaused] = useState(false);
    const scrollPrev = useCallback(() => emblaApi === null || emblaApi === void 0 ? void 0 : emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi === null || emblaApi === void 0 ? void 0 : emblaApi.scrollNext(), [emblaApi]);
    const scrollTo = useCallback((index) => emblaApi === null || emblaApi === void 0 ? void 0 : emblaApi.scrollTo(index), [emblaApi]);
    useEffect(() => {
        if (!autoplay || !emblaApi || autoplayPaused)
            return;
        const intervalId = setInterval(() => {
            if (emblaApi.canScrollNext()) {
                emblaApi.scrollNext();
            }
            else if (loop) {
                emblaApi.scrollTo(0);
            }
        }, interval);
        return () => clearInterval(intervalId);
    }, [autoplay, interval, emblaApi, loop, autoplayPaused]);
    const onSelect = useCallback(() => {
        if (!emblaApi)
            return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
        setPrevBtnEnabled(emblaApi.canScrollPrev());
        setNextBtnEnabled(emblaApi.canScrollNext());
        if (thumbsApi) {
            thumbsApi.scrollTo(emblaApi.selectedScrollSnap());
        }
    }, [emblaApi, thumbsApi]);
    useEffect(() => {
        if (!emblaApi)
            return;
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
        emblaApi.on("dragStart", onDragStart);
        emblaApi.on("dragEnd", onDragEnd);
        return () => {
            emblaApi.off("pointerDown", onPointerDown);
            emblaApi.off("pointerUp", onPointerUp);
            emblaApi.off("dragStart", onDragStart);
            emblaApi.off("dragEnd", onDragEnd);
        };
    }, [emblaApi]);
    useEffect(() => {
        if (!emblaApi)
            return;
        setScrollSnaps(emblaApi.scrollSnapList());
        onSelect();
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
        return () => {
            emblaApi.off("select", onSelect);
            emblaApi.off("reInit", onSelect);
        };
    }, [emblaApi, onSelect]);
    return (_jsxs("div", { className: `relative w-full h-full`, onMouseEnter: () => setAutoplayPaused(true), onMouseLeave: () => setAutoplayPaused(false), children: [_jsxs("div", { className: `relative overflow-hidden ${className}`, children: [_jsx("div", { ref: emblaRef, className: "overflow-hidden h-full", children: _jsx("div", { className: `flex touch-pan-y h-full ${isDragging ? "cursor-grabbing" : "cursor-grab"}`, style: {
                                gap: `${spacing}px`,
                                width: `calc(100% + ${spacing}px)`,
                            }, children: Children.map(children, (child, index) => (_jsx("div", { className: "flex-shrink-0", style: {
                                    width: `calc(${100 / slidesToShow}% - ${spacing}px)`,
                                }, children: child }, index))) }) }), navigation && (_jsxs(_Fragment, { children: [_jsx(Button, { isRelative: false, isIconOnly: true, color: "primary", onClick: scrollPrev, radius: "full", disabled: !loop && !prevBtnEnabled, className: `absolute hover:bg-white bg-white left-2 top-1/2 -translate-y-1/2 
                ${!loop && !prevBtnEnabled
                                    ? "opacity-50 cursor-not-allowed"
                                    : "hover:bg-white"}`, "aria-label": "Previous slide", children: _jsx(ChevronLeftIcon, { className: "size-4", stroke: "#000" }) }), _jsx(Button, { isRelative: false, isIconOnly: true, radius: "full", onClick: scrollNext, disabled: !loop && !nextBtnEnabled, className: `absolute hover:bg-white bg-white right-2 top-1/2 -translate-y-1/2
                ${!loop && !nextBtnEnabled
                                    ? "opacity-50 cursor-not-allowed"
                                    : "hover:bg-white"}`, "aria-label": "Next slide", children: _jsx(ChevronRightIcon, { className: "size-4", stroke: "#000" }) })] })), pagination && (_jsx("div", { className: "absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2", children: scrollSnaps.map((_, index) => (_jsx("button", { onClick: () => scrollTo(index), className: `w-2 h-2 rounded-full transition-all ${selectedIndex === index ? "bg-white w-4" : "bg-white/50"}`, "aria-label": `Go to slide ${index + 1}` }, index))) }))] }), thumbnails && (_jsx("div", { className: "relative mt-4", children: _jsx("div", { ref: thumbsRef, className: "overflow-hidden", children: _jsx("div", { className: "flex gap-2", children: Children.map(children, (child, index) => (_jsx("button", { onClick: () => scrollTo(index), className: `flex-[0_0_100px] min-w-0 transition-opacity rounded-lg overflow-hidden aspect-square h-20 object-cover bg-neutral-50
                    ${selectedIndex === index
                                ? ""
                                : "opacity-50 hover:opacity-75"}`, style: {
                                transition: "opacity 0.2s ease", // Transición más rápida para los thumbnails
                            }, children: child }, index))) }) }) }))] }));
};
export const CarouselItem = ({ children, className = "", }) => {
    return _jsx("div", { className: `flex-shrink-0 w-full ${className}`, children: children });
};
