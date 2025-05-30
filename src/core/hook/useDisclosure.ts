import { useCallback, useState, useMemo } from "react";

interface UseDisclosureProps {
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const useDisclosure = ({
  defaultOpen = false,
  onOpenChange,
}: UseDisclosureProps = {}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const onOpen = useCallback(() => {
    setIsOpen(true);
    onOpenChange?.(true);
  }, [onOpenChange]);

  const onClose = useCallback(() => {
    setIsOpen(false);
    onOpenChange?.(false);
  }, [onOpenChange]);

  const toggle = useCallback(() => {
    setIsOpen((prev) => {
      const newState = !prev;
      onOpenChange?.(newState);
      return newState;
    });
  }, [onOpenChange]);

  return useMemo(
    () => ({
      isOpen,
      onOpen,
      onClose,
      toggle,
      setIsOpen, // opcional: por si necesitas control directo
    }),
    [isOpen, onOpen, onClose, toggle]
  );
};
