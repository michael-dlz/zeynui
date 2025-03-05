"use client";

import React, { JSX } from "react";
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}
export const Container = ({
  children,
  className = "",
  as: Component = "div",
}: ContainerProps) => {
  return (
    <Component
      className={`
        mx-auto
        w-full
        px-4
        sm:px-6 
        md:px-8 
        lg:px-12
        max-w-[1240px]
        ${className}
      `}
    >
      {children}
    </Component>
  );
};
