import {
  ReactNode,
  forwardRef,
  createContext,
  useContext,
  Children,
  isValidElement,
  ReactElement,
} from "react";
import { twMerge } from "tailwind-merge";
import Checkbox from "./Checkbox";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button, Text } from "@zeynui/react";

type TableContextType = {
  selectable?: boolean;
  selectedRows?: string[];
  onSelectRow?: (id: string, selected: boolean) => void;
  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
};

const TableContext = createContext<TableContextType>({});

// Main Table Component
export const Table = forwardRef<
  HTMLTableElement,
  React.TableHTMLAttributes<HTMLTableElement> & {
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
>(
  (
    {
      striped = true,
      hoverable = true,
      compact = false,
      selectable = false,
      className,
      children,
      selectedRows = [],
      onSelectRow,
      page = 1,
      totalPages = 1,
      onPageChange,
      scrollable = true,
      ...props
    },
    ref
  ) => {
    const contextValue = {
      selectable,
      selectedRows,
      onSelectRow,
      page,
      totalPages,
      onPageChange,
    };

    return (
      <TableContext.Provider value={contextValue}>
        <div className="flex flex-col gap-4">
          <div
            className={twMerge(
              "rounded-lg border border-gray-200 shadow-sm",
              scrollable && "overflow-x-auto"
            )}
          >
            <table
              ref={ref}
              className={twMerge(
                "w-full text-sm bg-white min-w-max",
                striped && "[&>tbody>tr:nth-child(even)]:bg-gray-50",
                hoverable && "hover:[&>tbody>tr]:bg-gray-50",
                compact ? "text-sm" : "text-base",
                className
              )}
              {...props}
            >
              {children}
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <div>
                {selectable && (
                  <span className="text-sm text-gray-600">
                    {selectedRows.length} selected
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  isIconOnly
                  size="sm"
                  onClick={() => onPageChange?.(Math.max(1, page - 1))}
                  disabled={page <= 1}
                  className="p-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                >
                  <ChevronLeft size={18} />
                </Button>
                <Text as="span" size="sm">
                  Página {page} de {totalPages}
                </Text>
                <Button
                  isIconOnly
                  size="sm"
                  onClick={() => onPageChange?.(Math.min(totalPages, page + 1))}
                  disabled={page >= totalPages}
                  className="p-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                >
                  <ChevronRight size={18} />
                </Button>
              </div>
            </div>
          )}
        </div>
      </TableContext.Provider>
    );
  }
);

// Header component with built-in select all checkbox
export const TableHeader = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, children, ...props }, ref) => {
  const {
    selectable,
    selectedRows = [],
    onSelectRow,
  } = useContext(TableContext);
  const allSelected = selectedRows.length > 0;
  const someSelected = selectedRows.length > 0 && !allSelected;

  return (
    <thead
      ref={ref}
      className={twMerge(
        "bg-gray-100 text-gray-700 font-semibold border-b border-gray-200",
        className
      )}
      {...props}
    >
      <tr>
        {selectable && (
          <th className="w-10 px-4 py-3">
            <Checkbox
              checked={allSelected}
              onChange={(e) => {
                const allIds = Children.toArray(children)
                  .filter(
                    (child): child is ReactElement<{ rowId: string }> =>
                      isValidElement(child) &&
                      "rowId" in (child.props as Record<string, unknown>)
                  )
                  .map((child) => (child.props as { rowId: string }).rowId);
                allIds.forEach((id) => onSelectRow?.(id, e.target.checked));
              }}
              indeterminate={someSelected}
            />
          </th>
        )}
        {children}
      </tr>
    </thead>
  );
});

// Column component
export const TableColumn = forwardRef<
  HTMLTableCellElement,
  {
    children: ReactNode;
    align?: "left" | "center" | "right";
    width?: string | number;
    className?: string;
  }
>(({ children, align = "left", width, className, ...props }, ref) => (
  <th
    ref={ref}
    className={twMerge(
      "px-4 py-3 text-left",
      align === "center" && "text-center",
      align === "right" && "text-right",
      className
    )}
    style={{ width }}
    {...props}
  >
    {children}
  </th>
));

// Body component
export const TableBody = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, children, ...props }, ref) => (
  <tbody
    ref={ref}
    className={twMerge("divide-y divide-gray-200", className)}
    {...props}
  >
    {children}
  </tbody>
));

// Row component with built-in selection
export const TableRow = forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement> & {
    rowId?: string;
    isDisabled?: boolean;
  }
>(({ className, children, rowId, isDisabled, ...props }, ref) => {
  const {
    selectable,
    selectedRows = [],
    onSelectRow,
  } = useContext(TableContext);
  const isSelected = rowId ? selectedRows.includes(rowId) : false;

  return (
    <tr
      ref={ref}
      className={twMerge(
        "transition-colors",
        isSelected && "bg-primary/10",
        isDisabled && "opacity-50 cursor-not-allowed",
        className
      )}
      {...props}
    >
      {selectable && (
        <td className="px-4 py-3 whitespace-nowrap">
          <Checkbox
            checked={isSelected}
            onChange={(e) => rowId && onSelectRow?.(rowId, e.target.checked)}
          />
        </td>
      )}
      {children}
    </tr>
  );
});

// Cell component
export const TableCell = forwardRef<
  HTMLTableCellElement,
  {
    children: ReactNode;
    align?: "left" | "center" | "right";
    colSpan?: number;
    className?: string;
  }
>(({ children, align = "left", colSpan, className, ...props }, ref) => (
  <td
    ref={ref}
    colSpan={colSpan}
    className={twMerge(
      "px-4 py-3 whitespace-nowrap",
      align === "center" && "text-center",
      align === "right" && "text-right",
      className
    )}
    {...props}
  >
    {children}
  </td>
));
