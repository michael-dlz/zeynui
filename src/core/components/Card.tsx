import { RadiusVariant } from "../types";
import {
  Children,
  cloneElement,
  isValidElement,
  ReactElement,
  ReactNode,
} from "react";
type GradientDirection = "up" | "down" | "left" | "right";
interface CardProps {
  children: ReactNode;
  imageCover?: string;
  className?: string;
  gradient?: GradientDirection;
  radius?: RadiusVariant;
  compact?: boolean;
}
interface CardHeaderProps {
  children?: ReactNode;
  className?: string;
  hasImage?: boolean;
  compact?: boolean;
}
interface CardImageProps {
  children?: ReactNode;
  className?: string;
}
interface CardContentProps {
  children?: ReactNode;
  className?: string;
  hasImage?: boolean;
  compact?: boolean;
}
interface CardFooterProps {
  children?: ReactNode;
  className?: string;
  hasImage?: boolean;
  compact?: boolean;
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
  radius = "md",
}: CardProps) => {
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
        ${getRadiusClasses(radius)} overflow-hidden ${className}`}
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
            return cloneElement(child as ReactElement<any>, {
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
  compact = false,
}: CardHeaderProps) => {
  return (
    <div
      className={`${compact ? "py-4" : "p-4"} ${
        !hasImage ? "border-b border-b-gray-200" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};
export const CardContent = ({
  children,
  className = "",
  compact = false,
}: CardContentProps) => {
  return (
    <div className={`${compact ? "py-4" : "p-4"} ${className}`}>{children}</div>
  );
};
export const CardFooter = ({
  children,
  className = "",
  hasImage,
  compact = false,
}: CardFooterProps) => {
  return (
    <div
      className={`${compact ? "py-4" : "p-4"} ${
        !hasImage ? "border-t border-t-gray-200" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};
