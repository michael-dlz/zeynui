import { ReactNode } from "react";
interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
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
}
export declare const Table: import("react").ForwardRefExoticComponent<TableProps & import("react").RefAttributes<HTMLTableElement>>;
interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
}
export declare const TableHeader: import("react").ForwardRefExoticComponent<TableHeaderProps & import("react").RefAttributes<HTMLTableSectionElement>>;
interface TableColumnProps {
    children: ReactNode;
    align?: "left" | "center" | "right";
    width?: string | number;
    className?: string;
}
export declare const TableColumn: import("react").ForwardRefExoticComponent<TableColumnProps & import("react").RefAttributes<HTMLTableCellElement>>;
interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
}
export declare const TableBody: import("react").ForwardRefExoticComponent<TableBodyProps & import("react").RefAttributes<HTMLTableSectionElement>>;
interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
    rowId?: string;
    isDisabled?: boolean;
    hoverable?: boolean;
}
export declare const TableRow: import("react").ForwardRefExoticComponent<TableRowProps & import("react").RefAttributes<HTMLTableRowElement>>;
interface TableCellProps {
    children: ReactNode;
    align?: "left" | "center" | "right";
    colSpan?: number;
    className?: string;
}
export declare const TableCell: import("react").ForwardRefExoticComponent<TableCellProps & import("react").RefAttributes<HTMLTableCellElement>>;
export {};
