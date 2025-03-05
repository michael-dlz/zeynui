import { useState, useEffect } from "react";

export const useRipples = () => {
  const [ripples, setRipples] = useState<
    Array<{
      x: number;
      y: number;
      id: number;
    }>
  >([]);

  useEffect(() => {
    const cleanup = ripples.reduce(
      (acc, ripple) => {
        acc[ripple.id] = setTimeout(() => {
          setRipples((prevRipples) =>
            prevRipples.filter((r) => r.id !== ripple.id)
          );
        }, 1000); // Duración del ripple
        return acc;
      },
      {} as {
        [key: number]: NodeJS.Timeout;
      }
    );
    return () => {
      Object.values(cleanup).forEach((timeoutId) => clearTimeout(timeoutId));
    };
  }, [ripples]);

  const createRipple = (event: React.MouseEvent<HTMLElement>) => {
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
