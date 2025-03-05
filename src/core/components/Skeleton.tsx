import React from "react";
export type SkeletonVariant = "text" | "circular" | "rectangular";
export type SkeletonAnimation = "pulse" | "wave" | "none";
export type SkeletonRadius = "none" | "sm" | "md" | "lg" | "full";
export interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  animation?: SkeletonAnimation;
  radius?: SkeletonRadius;
  className?: string;
}
export const Skeleton: React.FC<SkeletonProps> = ({
  variant = "text",
  width,
  height,
  animation = "pulse",
  radius = "md",
  className = "",
}) => {
  const getRadiusClasses = () => {
    const radiuses = {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded",
      lg: "rounded-lg",
      full: "rounded-full",
    };
    return radiuses[radius];
  };
  const getAnimationClasses = () => {
    const animations = {
      pulse: "animate-pulse",
      wave: "before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent",
      none: "",
    };
    return animations[animation];
  };
  const getVariantClasses = () => {
    switch (variant) {
      case "circular":
        return "rounded-full";
      case "text":
        return "h-4 w-full";
      case "rectangular":
        return getRadiusClasses();
    }
  };
  const style: React.CSSProperties = {
    width: width || (variant === "text" ? "100%" : undefined),
    height: height || (variant === "circular" ? width : undefined),
  };
  return (
    <div
      className={`
        bg-gray-200/70 relative overflow-hidden isolate
        ${getVariantClasses()}
        ${getAnimationClasses()}
        ${className}
      `}
      style={style}
      role="status"
      aria-label="Loading..."
      aria-busy="true"
    />
  );
};
