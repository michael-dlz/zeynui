interface UseDisclosureProps {
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
}
export declare const useDisclosure: ({ defaultOpen, onOpenChange, }?: UseDisclosureProps) => {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    toggle: () => void;
    setIsOpen: import("react").Dispatch<import("react").SetStateAction<boolean>>;
};
export {};
