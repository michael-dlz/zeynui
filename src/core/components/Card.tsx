import { RadiusVariant, ShadowVariant } from "../types";
import React, {
  Children,
  cloneElement,
  isValidElement,
  ReactNode,
} from "react";
type GradientDirection = "up" | "down" | "left" | "right";
interface CardProps {
  children: ReactNode;
  imageCover?: string;
  className?: string;
  gradient?: GradientDirection;
  shadow?: ShadowVariant;
  radius?: RadiusVariant;
}
interface CardHeaderProps {
  children?: ReactNode;
  className?: string;
  hasImage?: boolean;
}
interface CardImageProps {
  children?: ReactNode;
  className?: string;
}
interface CardContentProps {
  children?: ReactNode;
  className?: string;
  hasImage?: boolean;
}
interface CardFooterProps {
  children?: ReactNode;
  className?: string;
  hasImage?: boolean;
}
const getGradientStyle = (direction?: GradientDirection) => {
  if (!direction) return "";
  const gradients = {
    down: "bg-gradient-to-b",
    up: "bg-gradient-to-t",
    left: "bg-gradient-to-l",
    right: "bg-gradient-to-r",
  };
  return gradients[direction];
};
export const Card = ({
  children,
  imageCover,
  className = "",
  gradient,
  shadow = "md",
  radius = "md",
}: CardProps) => {
  const getShadowClasses = (shadowVariant: ShadowVariant): string => {
    const shadowMap = {
      none: "shadow-none",
      xs: "shadow-xs",
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg",
      xl: "shadow-xl",
      "2xl": "shadow-2xl",
    };
    return shadowMap[shadowVariant];
  };

  const getRadiusClasses = (radiusSize: RadiusVariant): string => {
    const radiusMap = {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      full: "rounded-full",
    };
    return radiusMap[radiusSize];
  };

  return (
    <div
      className={`relative 
        ${getRadiusClasses(radius)} ${getShadowClasses(
        shadow
      )} overflow-hidden bg-white ${className}`}
      style={
        imageCover
          ? {
              backgroundImage: `url(${imageCover})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }
          : undefined
      }
    >
      {imageCover && (
        <div
          className={`absolute inset-0 ${
            gradient
              ? `${getGradientStyle(gradient)} from-black/60 to-transparent`
              : "bg-black/20"
          }`}
        />
      )}
      <div className={`relative ${imageCover ? "text-white" : ""}`}>
        {Children.map(children, (child) => {
          if (isValidElement(child)) {
            return cloneElement(child as React.ReactElement<any>, {
              hasImage: !!imageCover,
            });
          }
          return child;
        })}
      </div>
    </div>
  );
};

export const CardImage = ({ children, className = "" }: CardImageProps) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="hover:scale-105 transition-transform">{children}</div>
    </div>
  );
};

export const CardHeader = ({
  children,
  className = "",
  hasImage,
}: CardHeaderProps) => {
  return (
    <div className={`p-4 ${!hasImage ? "border-b border-b-gray-200" : ""} ${className}`}>
      {children}
    </div>
  );
};
export const CardContent = ({ children, className = "" }: CardContentProps) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};
export const CardFooter = ({
  children,
  className = "",
  hasImage,
}: CardFooterProps) => {
  return (
    <div className={`p-4 ${!hasImage ? "border-t border-t-gray-200" : ""} ${className}`}>
      {children}
    </div>
  );
};
