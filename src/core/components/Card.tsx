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

  return (
    <div
      className={`relative ${getRadiusClasses(
        radius
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
      <div className={`relative grid ${imageCover ? "text-foreground" : ""}`}>
        {Children.map(children, (child) => {
          if (isValidElement(child)) {
            const isImage = child.type === CardImage;
            return cloneElement(child as ReactElement<any>, {
              hasImage: !!imageCover,
              isCompact,
              isImage,
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
    <div className={`relative overflow-hidden p-0 ${className}`}>
      <div className="hover:scale-105 transition-transform">{children}</div>
    </div>
  );
};

export const CardHeader = ({
  children,
  className = "",
  isCompact,
}: CardHeaderProps & { isCompact?: boolean }) => {
  return (
    <div className={`${!isCompact ? "p-[1.144rem]" : "p-0"} ${className}`}>
      {children}
    </div>
  );
};
export const CardContent = ({
  children,
  className = "",
  isCompact,
}: CardContentProps & { isCompact?: boolean }) => {
  return (
    <div className={`${!isCompact ? "p-[1.144rem]" : "p-0"} ${className}`}>
      {children}
    </div>
  );
};
export const CardFooter = ({
  children,
  className = "",
  isCompact,
}: CardFooterProps & { isCompact?: boolean }) => {
  return (
    <div className={`${!isCompact ? "p-[1.144rem]" : "p-0"} ${className}`}>
      {children}
    </div>
  );
};
