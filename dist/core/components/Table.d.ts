import { ReactNode } from "react";
export declare const Table: import("react").ForwardRefExoticComponent<import("react").TableHTMLAttributes<HTMLTableElement> & {
    striped?: boolean;
    hoverable?: boolean;
    compact?: boolean;
    selectable?: boolean;
    selectedRows?: string[];
    onSelectRow?: (id: string, selected: boolean) => void;
    page?: number;
    totalPages?: number;
    onPageChange?: (page: number) => void;
    scrollable?: boolean;
} & import("react").RefAttributes<HTMLTableElement>>;
export declare const TableHeader: import("react").ForwardRefExoticComponent<import("react").HTMLAttributes<HTMLTableSectionElement> & import("react").RefAttributes<HTMLTableSectionElement>>;
export declare const TableColumn: import("react").ForwardRefExoticComponent<{
    children: ReactNode;
    align?: "left" | "center" | "right";
    width?: string | number;
    className?: string;
} & import("react").RefAttributes<HTMLTableCellElement>>;
export declare const TableBody: import("react").ForwardRefExoticComponent<import("react").HTMLAttributes<HTMLTableSectionElement> & import("react").RefAttributes<HTMLTableSectionElement>>;
export declare const TableRow: import("react").ForwardRefExoticComponent<import("react").HTMLAttributes<HTMLTableRowElement> & {
    rowId?: string;
    isDisabled?: boolean;
} & import("react").RefAttributes<HTMLTableRowElement>>;
export declare const TableCell: import("react").ForwardRefExoticComponent<{
    children: ReactNode;
    align?: "left" | "center" | "right";
    colSpan?: number;
    className?: string;
} & import("react").RefAttributes<HTMLTableCellElement>>;
