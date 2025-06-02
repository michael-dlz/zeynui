"use client";

import {
  ReactNode,
  forwardRef,
  createContext,
  useContext,
  Children,
  isValidElement,
  ReactElement,
  useMemo,
} from "react";
import { twMerge } from "tailwind-merge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button, Text } from "@zeynui/react";
import { Checkbox } from "./Checkbox";

type TableContextType = {
  selectable?: boolean;
  selectedRows: string[];
  onSelectRow: (id: string, selected: boolean) => void;
  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
};

const TableContext = createContext<TableContextType>({
  selectedRows: [],
  onSelectRow: () => {},
});

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

export const Table = forwardRef<HTMLTableElement, TableProps>(
  (
    {
      striped = true,
      hoverable = true,
      compact = false,
      selectable = false,
      className,
      children,
      selectedRows = [],
      onSelectRow = () => {},
      page = 1,
      totalPages = 1,
      onPageChange,
      scrollable = true,
      ...props
    },
    ref
  ) => {
    const contextValue = useMemo(
      () => ({
        selectable,
        selectedRows,
        onSelectRow,
        page,
        totalPages,
        onPageChange,
      }),
      [selectable, selectedRows, onSelectRow, page, totalPages, onPageChange]
    );

    const hasPagination = totalPages > 1;
    const selectedCount = selectedRows.length;

    return (
      <TableContext.Provider value={contextValue}>
        <div className="flex flex-col gap-4">
          <div
            className={twMerge(
              "rounded-lg shadow-sm",
              scrollable && "overflow-x-auto"
            )}
          >
            <table
              ref={ref}
              className={twMerge(
                "w-full text-sm min-w-max border border-foreground/10",
                striped && "[&>tbody>tr:nth-child(even)]:bg-card/50",
                compact ? "text-sm" : "text-base",
                className
              )}
              {...props}
            >
              {children}
            </table>
          </div>

          {hasPagination && (
            <div className="flex items-center justify-between">
              <div>
                {selectable && selectedCount > 0 && (
                  <Text as="span" size="sm" className="text-foreground">
                    {selectedCount} selected
                  </Text>
                )}
              </div>
              <PaginationControls />
            </div>
          )}
        </div>
      </TableContext.Provider>
    );
  }
);

const PaginationControls = () => {
  const { page = 1, totalPages = 1, onPageChange } = useContext(TableContext);

  const handlePrevious = () => onPageChange?.(Math.max(1, page - 1));
  const handleNext = () => onPageChange?.(Math.min(totalPages, page + 1));

  return (
    <div className="flex items-center gap-2">
      <PaginationButton
        onClick={handlePrevious}
        disabled={page <= 1}
        icon={<ChevronLeft size={18} />}
      />
      <Text as="span" size="sm">
        Página {page} de {totalPages}
      </Text>
      <PaginationButton
        onClick={handleNext}
        disabled={page >= totalPages}
        icon={<ChevronRight size={18} />}
      />
    </div>
  );
};

const PaginationButton = ({
  onClick,
  disabled,
  icon,
}: {
  onClick: () => void;
  disabled: boolean;
  icon: ReactNode;
}) => (
  <Button
    isIconOnly
    size="sm"
    onClick={onClick}
    disabled={disabled}
    className="p-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-card/50"
  >
    {icon}
  </Button>
);

interface TableHeaderProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

export const TableHeader = forwardRef<
  HTMLTableSectionElement,
  TableHeaderProps
>(({ className, children, ...props }, ref) => {
  const {
    selectable,
    selectedRows = [],
    onSelectRow,
  } = useContext(TableContext);

  const rowIds = useMemo(() => {
    return Children.toArray(children)
      .filter((child): child is ReactElement<{ children: ReactNode }> =>
        isValidElement(child)
      )
      .flatMap((child) => {
        // Buscamos TableRow en los hijos
        const rows = Children.toArray(child.props.children).filter(
          (c): c is ReactElement<{ rowId: string; children: ReactNode }> =>
            isValidElement(c) && "props" in c && "rowId" in (c.props as any)
        );
        return rows.map((row) => row.props.rowId);
      });
  }, [children]);

  const allSelected =
    rowIds.length > 0 && selectedRows.length === rowIds.length;
  const someSelected = selectedRows.length > 0 && !allSelected;

  const handleSelectAll = (checked: boolean) => {
    rowIds.forEach((id) => onSelectRow(id, checked));
  };

  return (
    <thead
      ref={ref}
      className={twMerge(
        "bg-background text-foreground font-semibold border-b border-foreground/10",
        className
      )}
      {...props}
    >
      <tr>
        {selectable && (
          <th className="w-10 px-4 py-3">
            <Checkbox
              checked={allSelected}
              onChange={(e) => handleSelectAll(e.target.checked)}
              indeterminate={someSelected}
            />
          </th>
        )}
        {children}
      </tr>
    </thead>
  );
});

interface TableColumnProps {
  children: ReactNode;
  align?: "left" | "center" | "right";
  width?: string | number;
  className?: string;
}

export const TableColumn = forwardRef<HTMLTableCellElement, TableColumnProps>(
  ({ children, align = "left", width, className, ...props }, ref) => {
    const alignmentClass = {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    }[align];

    return (
      <th
        ref={ref}
        className={twMerge("px-4 py-3", alignmentClass, className)}
        style={{ width }}
        {...props}
      >
        <Text as="span" size="sm" weight="semibold" className="text-foreground">
          {children}
        </Text>
      </th>
    );
  }
);

interface TableBodyProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, children, ...props }, ref) => (
    <tbody
      ref={ref}
      className={twMerge("divide-y divide-foreground/10", className)}
      {...props}
    >
      {children}
    </tbody>
  )
);

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  rowId?: string;
  isDisabled?: boolean;
  hoverable?: boolean;
}

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  (
    { className, children, rowId, isDisabled, hoverable = true, ...props },
    ref
  ) => {
    const {
      selectable,
      selectedRows = [],
      onSelectRow,
    } = useContext(TableContext);

    const isSelected = rowId ? selectedRows.includes(rowId) : false;
    const rowClasses = twMerge(
      "transition-colors",
      isSelected && "bg-primary/10",
      isDisabled && "opacity-50 cursor-not-allowed",
      hoverable && "hover:bg-foreground/10",
      className
    );

    return (
      <tr ref={ref} className={rowClasses} {...props}>
        {selectable && (
          <td className="px-4 py-3 whitespace-nowrap">
            <Checkbox
              checked={isSelected}
              onChange={(e) => rowId && onSelectRow(rowId, e.target.checked)}
            />
          </td>
        )}
        {children}
      </tr>
    );
  }
);

interface TableCellProps {
  children: ReactNode;
  align?: "left" | "center" | "right";
  colSpan?: number;
  className?: string;
}

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ children, align = "left", colSpan, className, ...props }, ref) => {
    const alignmentClass = {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    }[align];

    return (
      <td
        ref={ref}
        colSpan={colSpan}
        className={twMerge(
          "px-4 py-3 whitespace-nowrap text-foreground",
          alignmentClass,
          className
        )}
        {...props}
      >
        <Text as="span" size="sm" className="text-foreground">
          {children}
        </Text>
      </td>
    );
  }
);
