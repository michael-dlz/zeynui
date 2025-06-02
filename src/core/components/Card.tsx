import { GradientDirection, RadiusVariant } from "../types";
import {
  Children,
  cloneElement,
  isValidElement,
  PropsWithChildren,
  ReactElement,
} from "react";

interface CardProps extends PropsWithChildren {
  imageCover?: string;
  className?: string;
  gradient?: GradientDirection;
  radius?: RadiusVariant;
  hasShadow?: boolean;
  isCompact?: boolean;
}
interface CardHeaderProps extends PropsWithChildren {
  className?: string;
}
interface CardImageProps extends PropsWithChildren {
  className?: string;
}
interface CardContentProps extends PropsWithChildren {
  className?: string;
  hasImage?: boolean;
}
interface CardFooterProps extends PropsWithChildren {
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
  radius = "md",
  hasShadow = true,
  isCompact = false,
}: CardProps) => {
  const getRadiusClasses = (radiusSize: RadiusVariant): string => {
    const radiusMap = {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      full: "rounded-[9999px]",
    };
    return radiusMap[radiusSize];
  };

  const getPaddingClasses = (isCompact: boolean) => {
    if (!isCompact) return "p-[1.144rem]";
    return "p-0";
  };

  return (
    <div
      className={`relative
        ${getRadiusClasses(radius)} ${getPaddingClasses(
        isCompact
      )} overflow-hidden ${className} ${
        hasShadow ? "shadow-lg shadow-black/10" : ""
      }`}
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
      <div
        className={`relative grid gap-4 ${imageCover ? "text-foreground" : ""}`}
      >
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

export const CardHeader = ({ children, className = "" }: CardHeaderProps) => {
  return <div className={className}>{children}</div>;
};
export const CardContent = ({ children, className = "" }: CardContentProps) => {
  return <div className={className}>{children}</div>;
};
export const CardFooter = ({ children, className = "" }: CardFooterProps) => {
  return <div className={className}>{children}</div>;
};
