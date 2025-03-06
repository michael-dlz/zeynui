export type ColorVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "warning"
  | "success"
  | "info"
  | "whatsapp";
export type RadiusVariant = "none" | "sm" | "md" | "lg" | "full";
export type SizeVariant = "sm" | "md" | "lg" | "xl" | "2xl";
export type StyleVariant =
  | "solid"
  | "outline"
  | "soft"
  | "light"
  | "underline"
  | "ghost";
export type AlignmentVariant = "left" | "center" | "right";
export type ShadowVariant = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
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
