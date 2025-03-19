"use client";

import React, { JSX } from "react";
import { ContainerSizeVariant, SizeVariant } from "../types";
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  size?: ContainerSizeVariant;
}
export const Container = ({
  children,
  className = "",
  as: Component = "div",
  size = "md",
}: ContainerProps) => {
  const getSizeClass = () => {
    switch (size) {
      case "sm":
        return "max-w-[1024px]";
      case "md":
        return "max-w-[1290px]";
      case "lg":
        return "max-w-[1440px]";
      case "xl":
        return "max-w-[1920px]";
      case "2xl":
        return "max-w-[2560px]";
      case "full":
        return "w-full";
      default:
        return "";
    }
  };

  return (
    <Component
      className={`
        mx-auto
        w-full
        ${size === "full" ? "px-0" : "px-6 sm:px-10 2xl:px-20"}
        ${getSizeClass()}
        ${className}
      `}
    >
      {children}
    </Component>
  );
};
