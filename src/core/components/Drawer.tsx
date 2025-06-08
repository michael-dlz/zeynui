"use client";
import { ReactNode, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";
type DrawerContextType = {
  isOpen: boolean;
  onClose: () => void;
};
export const DrawerContext = createContext<DrawerContextType>({
  isOpen: false,
  onClose: () => {},
});
export const useDrawerContext = () => useContext(DrawerContext);

export type DrawerPlacement = "top" | "right" | "bottom" | "left";
export type DrawerSize = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
export type BackdropType = "blur" | "opaque" | "transparent";
interface DrawerProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  placement?: DrawerPlacement;
  size?: DrawerSize;
  backdrop?: BackdropType;
  className?: string;
}
const sizeMap: Record<DrawerSize, string> = {
  sm: "w-[90vw] md:w-[20vw]",
  md: "w-[90vw] md:w-[35vw]",
  lg: "w-[90vw] md:w-[50vw]",
  xl: "w-[90vw] md:w-[60vw]",
  "2xl": "w-[90vw] md:w-[70vw]",
  "3xl": "w-[90vw] md:w-[80vw]",
  full: "w-full",
};
const backdropStyles: Record<BackdropType, string> = {
  blur: "bg-black/30 backdrop-blur-md",
  opaque: "bg-black/70",
  transparent: "bg-black/40",
};

const getSizeValue = (size: DrawerSize) => {
  return sizeMap[size];
};

const getPlacementStyles = (placement: DrawerPlacement) => {
  switch (placement) {
    case "left":
      return {
        left: 0,
        top: 0,
        bottom: 0,
      };
    case "right":
      return {
        right: 0,
        top: 0,
        bottom: 0,
      };
    case "top":
      return {
        top: 0,
        left: 0,
        right: 0,
      };
    case "bottom":
      return {
        bottom: 0,
        left: 0,
        right: 0,
      };
  }
};
const getPlacementAnimation = (placement: DrawerPlacement) => {
  switch (placement) {
    case "left":
      return {
        x: "-100%",
      };
    case "right":
      return {
        x: "100%",
      };
    case "top":
      return {
        y: "-100%",
      };
    case "bottom":
      return {
        y: "100%",
      };
  }
};
export const Drawer = ({
  children,
  isOpen,
  onClose,
  placement = "right",
  size = "md",
  backdrop = "transparent",
  className = "bg-card",
}: DrawerProps) => {
  return (
    <DrawerContext.Provider
      value={{
        isOpen,
        onClose,
      }}
    >
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.15,
                ease: "easeInOut",
              }}
              onClick={onClose}
              className={`fixed inset-0 z-40 ${backdropStyles[backdrop]}`}
            />
            <motion.div
              initial={getPlacementAnimation(placement)}
              animate={{
                x: 0,
                y: 0,
              }}
              exit={getPlacementAnimation(placement)}
              transition={{
                type: "spring",
                damping: 15,
                stiffness: 300,
                mass: 0.2,
              }}
              style={getPlacementStyles(placement)}
              className={`fixed z-50 ${className} shadow-xl overflow-auto ${getSizeValue(
                size
              )}`}
            >
              <XMarkIcon
                className="absolute size-6 top-4 right-4 cursor-pointer p-1 rounded-full hover:bg-gray-100"
                onClick={onClose}
                aria-label="Close drawer"
              />
              {children}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </DrawerContext.Provider>
  );
};

interface DrawerHeaderProps {
  children: ReactNode;
}
export const DrawerHeader = ({ children }: DrawerHeaderProps) => {
  return <div className="px-6 py-4">{children}</div>;
};

interface DrawerBodyProps {
  children: ReactNode;
  className?: string;
}
export const DrawerBody = ({ children, className }: DrawerBodyProps) => {
  return (
    <div className={`flex-1 overflow-y-auto p-6 ${className}`}>{children}</div>
  );
};

interface DrawerFooterProps {
  children: ReactNode;
}
export const DrawerFooter = ({ children }: DrawerFooterProps) => {
  return <div className="px-6 py-4">{children}</div>;
};
