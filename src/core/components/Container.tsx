"use client";

import React, { JSX } from "react";
import { SizeVariant } from "../types";
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  size?: SizeVariant;
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
        return "max-w-[1240px]";
      case "lg":
        return "max-w-[1920px]";
      case "xl":
        return "max-w-[1240px]";
      default:
        return "max-w-[2560px]";
    }
  };

  return (
    <Component
      className={`
        mx-auto
        w-full
        px-6
        sm:px-10 
        lg:px-20
        ${getSizeClass()}
        ${className}
      `}
    >
      {children}
    </Component>
  );
};
