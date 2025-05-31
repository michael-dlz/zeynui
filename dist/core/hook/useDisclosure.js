import { useCallback, useState, useMemo } from "react";
export const useDisclosure = ({ defaultOpen = false, onOpenChange, } = {}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const onOpen = useCallback(() => {
        setIsOpen(true);
        onOpenChange === null || onOpenChange === void 0 ? void 0 : onOpenChange(true);
    }, [onOpenChange]);
    const onClose = useCallback(() => {
        setIsOpen(false);
        onOpenChange === null || onOpenChange === void 0 ? void 0 : onOpenChange(false);
    }, [onOpenChange]);
    const toggle = useCallback(() => {
        setIsOpen((prev) => {
            const newState = !prev;
            onOpenChange === null || onOpenChange === void 0 ? void 0 : onOpenChange(newState);
            return newState;
        });
    }, [onOpenChange]);
    return useMemo(() => ({
        isOpen,
        onOpen,
        onClose,
        toggle,
        setIsOpen, // opcional: por si necesitas control directo
    }), [isOpen, onOpen, onClose, toggle]);
};
