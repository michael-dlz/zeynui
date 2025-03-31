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
}
const sizeMap = {
  sm: "15rem",
  md: "20rem",
  lg: "25rem",
  xl: "30rem",
  "2xl": "35rem",
  "3xl": "40rem",
  full: "100%",
};
const backdropStyles: Record<BackdropType, string> = {
  blur: "bg-black/30 backdrop-blur-md",
  opaque: "bg-black/70",
  transparent: "bg-black/40",
};
const getPlacementStyles = (placement: DrawerPlacement, size: DrawerSize) => {
  const sizeValue = sizeMap[size];
  switch (placement) {
    case "left":
      return {
        left: 0,
        top: 0,
        bottom: 0,
        width: sizeValue,
      };
    case "right":
      return {
        right: 0,
        top: 0,
        bottom: 0,
        width: sizeValue,
      };
    case "top":
      return {
        top: 0,
        left: 0,
        right: 0,
        height: sizeValue,
      };
    case "bottom":
      return {
        bottom: 0,
        left: 0,
        right: 0,
        height: sizeValue,
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
              style={getPlacementStyles(placement, size)}
              className="fixed z-50 bg-white shadow-xl overflow-auto"
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
}
export const DrawerBody = ({ children }: DrawerBodyProps) => {
  return <div className="flex-1 overflow-y-auto p-6">{children}</div>;
};

interface DrawerFooterProps {
  children: ReactNode;
}
export const DrawerFooter = ({ children }: DrawerFooterProps) => {
  return <div className="px-6 py-4">{children}</div>;
};
