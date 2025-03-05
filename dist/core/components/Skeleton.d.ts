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
export declare const Skeleton: React.FC<SkeletonProps>;
