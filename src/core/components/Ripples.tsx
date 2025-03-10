import { ColorVariant, StyleVariant } from "../types";

interface RippleProps {
  variant: StyleVariant;
  color: ColorVariant;
  ripples: Array<{
    x: number;
    y: number;
    id: number;
  }>;
}

export const Ripple = ({ variant, ripples, color }: RippleProps) => {
  const getRippleColor = (variant: StyleVariant): string => {
    const rippleColorMap = {
      solid: `bg-white/40`,
      outline: `bg-white/40`,
      soft: `bg-white/40`,
      light: `bg-${color}/10`,
      underline: `bg-${color}/10`,
      ghost: `bg-white/40`,
    };
    return rippleColorMap[variant];
  };

  return (
    <>
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className={`absolute animate-ripple rounded-full ${getRippleColor(
            variant
          )}`}
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: "translate(-50%, -50%)",
            width: "200%",
            paddingBottom: "200%",
            zIndex: 10, // Asegura que el ripple esté por encima del contenido
          }}
        />
      ))}
    </>
  );
};
