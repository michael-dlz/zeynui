import { useState, useEffect } from "react";
export const useRipples = () => {
    const [ripples, setRipples] = useState([]);
    useEffect(() => {
        const cleanup = ripples.reduce((acc, ripple) => {
            acc[ripple.id] = setTimeout(() => {
                setRipples((prevRipples) => prevRipples.filter((r) => r.id !== ripple.id));
            }, 1000); // Duración del ripple
            return acc;
        }, {});
        return () => {
            Object.values(cleanup).forEach((timeoutId) => clearTimeout(timeoutId));
        };
    }, [ripples]);
    const createRipple = (event) => {
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        setRipples([
            ...ripples,
            {
                x,
                y,
                id: Date.now(),
            },
        ]);
    };
    return { ripples, createRipple };
};
