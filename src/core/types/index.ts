import { ComponentPropsWithoutRef, ElementType, PropsWithChildren } from "react";

export type ColorVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "warning"
  | "success"
  | "info"
export type RadiusVariant = "none" | "sm" | "md" | "lg" | "full";
export type SizeVariant = "sm" | "md" | "lg";
export type ContainerSizeVariant = "sm" | "md" | "lg" | "xl" | "2xl" | "full";
export type StyleVariant =
  | "solid"
  | "shadow"
  | "outline"
  | "soft"
  | "light"
  | "underline"
  | "ghost"
export type AlignmentVariant = "left" | "center" | "right";
export type ShadowVariant = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type GradientDirection = "up" | "down" | "left" | "right";
export type LabelPlacement = "outside" | "outside-left";
export type PositionNavbar = "static" | "fixed" | "sticky";
export type JustifyNavbar =
  | "between"
  | "around"
  | "evenly"
  | "center"
  | "end"
  | "start";
export type PaddingNavbar = "none" | "sm" | "lg";
export type AsProp<C extends ElementType> = {
  as?: C;
};
export type PropsToOmit<C extends ElementType, P> = keyof (AsProp<C> & P);
export type PolymorphicComponentProp<
  C extends ElementType,
  Props = {}
> = PropsWithChildren<Props & AsProp<C>> &
  Omit<ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

export type VarianActiveClasses = {
  [key in StyleVariant]: {
    [key in ColorVariant]: { active: string; inactive: string };
  };
};

export type VariantClasses = {
  [key in StyleVariant]: {
    [key in ColorVariant]: string;
  };
};
