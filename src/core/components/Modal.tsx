"use client";

import { Button } from "@zeynui/react";
import React, { ReactNode, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XIcon } from "lucide-react";
import { useDisclosure } from "../hook/useDisclosure";

type BackdropType = "blur" | "opaque" | "transparent";
type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

interface ModalProps {
  children: ReactNode;
  backdrop?: BackdropType;
  size?: ModalSize;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  onClose?: () => void;
  closeOnClickOutside?: boolean;
}

interface ModalSubcomponentProps {
  children: ReactNode;
  className?: string;
  onClose?: () => void;
}

export const Modal = ({
  children,
  backdrop = "blur",
  size = "md",
  isOpen: isOpenProp,
  onOpenChange,
  onClose,
  closeOnClickOutside = true,
}: ModalProps) => {
  const { isOpen, onOpen, onClose: internalOnClose } = useDisclosure();
  const modalRef = useRef<HTMLDivElement>(null);
  const controlled = isOpenProp !== undefined;

  const finalIsOpen = controlled ? isOpenProp : isOpen;
  const finalOnClose = () => {
    if (onClose) onClose();
    if (!controlled) internalOnClose();
    if (onOpenChange) onOpenChange(false);
  };

  const backdropClasses = {
    blur: "backdrop-blur-sm",
    opaque: "bg-black/50",
    transparent: "bg-transparent",
  };

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    full: "max-w-full",
  };

  const handleClickOutside = (e: React.MouseEvent) => {
    if (
      closeOnClickOutside &&
      modalRef.current &&
      !modalRef.current.contains(e.target as Node)
    ) {
      finalOnClose();
    }
  };

  return (
    <AnimatePresence>
      {finalIsOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClickOutside}
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${backdropClasses[backdrop]}`}
        >
          <motion.div
            ref={modalRef}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 500 }}
            className={`relative w-full ${sizeClasses[size]} max-h-[calc(100vh-2rem)] bg-card rounded-lg shadow-xl overflow-hidden flex flex-col`}
          >
            {React.Children.map(children, (child) => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child, {
                  onClose: finalOnClose,
                } as Partial<typeof child.props>);
              }
              return child;
            })}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const ModalHeader = ({
  children,
  className = "",
  onClose,
}: ModalSubcomponentProps) => {
  return (
    <header className={`p-4 flex justify-between items-center ${className}`}>
      <div>{children}</div>
      {onClose && (
        <Button variant="ghost" color="info" onClick={onClose} isIconOnly>
          <XIcon size={16} />
        </Button>
      )}
    </header>
  );
};

export const ModalBody = ({
  children,
  className = "",
}: ModalSubcomponentProps) => {
  return (
    <main className={`p-4 flex-1 overflow-y-auto ${className}`}>
      {children}
    </main>
  );
};

export const ModalFooter = ({
  children,
  className = "",
}: ModalSubcomponentProps) => {
  return <footer className={`p-4  ${className}`}>{children}</footer>;
};
