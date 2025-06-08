"use client";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, createContext, useContext, Children, isValidElement, useMemo, } from "react";
import { twMerge } from "tailwind-merge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button, Text } from "@zeynui/react";
import { Checkbox } from "./Checkbox";
const TableContext = createContext({
    selectedRows: [],
    onSelectRow: () => { },
});
export const Table = forwardRef((_a, ref) => {
    var { striped = true, hoverable = true, compact = false, selectable = false, className, children, selectedRows = [], onSelectRow = () => { }, page = 1, totalPages = 1, onPageChange, scrollable = true } = _a, props = __rest(_a, ["striped", "hoverable", "compact", "selectable", "className", "children", "selectedRows", "onSelectRow", "page", "totalPages", "onPageChange", "scrollable"]);
    const contextValue = useMemo(() => ({
        selectable,
        selectedRows,
        onSelectRow,
        page,
        totalPages,
        onPageChange,
    }), [selectable, selectedRows, onSelectRow, page, totalPages, onPageChange]);
    const hasPagination = totalPages > 1;
    const selectedCount = selectedRows.length;
    return (_jsx(TableContext.Provider, { value: contextValue, children: _jsxs("div", { className: "flex flex-col gap-4", children: [_jsx("div", { className: twMerge("rounded-lg shadow-sm", scrollable && "overflow-x-auto"), children: _jsx("table", Object.assign({ ref: ref, className: twMerge("w-full text-sm min-w-max border border-foreground/10", striped && "[&>tbody>tr:nth-child(even)]:bg-card/50", compact ? "text-sm" : "text-base", className) }, props, { children: children })) }), hasPagination && (_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("div", { children: selectable && selectedCount > 0 && (_jsxs(Text, { as: "span", size: "sm", className: "text-foreground", children: [selectedCount, " selected"] })) }), _jsx(PaginationControls, {})] }))] }) }));
});
const PaginationControls = () => {
    const { page = 1, totalPages = 1, onPageChange } = useContext(TableContext);
    const handlePrevious = () => onPageChange === null || onPageChange === void 0 ? void 0 : onPageChange(Math.max(1, page - 1));
    const handleNext = () => onPageChange === null || onPageChange === void 0 ? void 0 : onPageChange(Math.min(totalPages, page + 1));
    return (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(PaginationButton, { onClick: handlePrevious, disabled: page <= 1, icon: _jsx(ChevronLeft, { size: 18 }) }), _jsxs(Text, { as: "span", size: "sm", children: ["P\u00E1gina ", page, " de ", totalPages] }), _jsx(PaginationButton, { onClick: handleNext, disabled: page >= totalPages, icon: _jsx(ChevronRight, { size: 18 }) })] }));
};
const PaginationButton = ({ onClick, disabled, icon, }) => (_jsx(Button, { isIconOnly: true, size: "sm", onClick: onClick, disabled: disabled, className: "p-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-card/50", children: icon }));
export const TableHeader = forwardRef((_a, ref) => {
    var { className, children } = _a, props = __rest(_a, ["className", "children"]);
    const { selectable, selectedRows = [], onSelectRow, } = useContext(TableContext);
    const rowIds = useMemo(() => {
        return Children.toArray(children)
            .filter((child) => isValidElement(child))
            .flatMap((child) => {
            // Buscamos TableRow en los hijos
            const rows = Children.toArray(child.props.children).filter((c) => isValidElement(c) && "props" in c && "rowId" in c.props);
            return rows.map((row) => row.props.rowId);
        });
    }, [children]);
    const allSelected = rowIds.length > 0 && selectedRows.length === rowIds.length;
    const someSelected = selectedRows.length > 0 && !allSelected;
    const handleSelectAll = (checked) => {
        rowIds.forEach((id) => onSelectRow(id, checked));
    };
    return (_jsx("thead", Object.assign({ ref: ref, className: twMerge("bg-background text-foreground font-semibold border-b border-foreground/10", className) }, props, { children: _jsxs("tr", { children: [selectable && (_jsx("th", { className: "w-10 px-2 py-1", children: _jsx(Checkbox, { checked: allSelected, onChange: (e) => handleSelectAll(e.target.checked), indeterminate: someSelected }) })), children] }) })));
});
export const TableColumn = forwardRef((_a, ref) => {
    var { children, align = "left", width, className } = _a, props = __rest(_a, ["children", "align", "width", "className"]);
    const alignmentClass = {
        left: "text-left",
        center: "text-center",
        right: "text-right",
    }[align];
    return (_jsx("th", Object.assign({ ref: ref, className: twMerge("px-2 py-1", alignmentClass, className), style: { width } }, props, { children: _jsx(Text, { as: "span", size: "sm", weight: "semibold", className: "text-foreground", children: children }) })));
});
export const TableBody = forwardRef((_a, ref) => {
    var { className, children } = _a, props = __rest(_a, ["className", "children"]);
    return (_jsx("tbody", Object.assign({ ref: ref, className: twMerge("divide-y divide-foreground/10", className) }, props, { children: children })));
});
export const TableRow = forwardRef((_a, ref) => {
    var { className, children, rowId, isDisabled, hoverable = true } = _a, props = __rest(_a, ["className", "children", "rowId", "isDisabled", "hoverable"]);
    const { selectable, selectedRows = [], onSelectRow, } = useContext(TableContext);
    const isSelected = rowId ? selectedRows.includes(rowId) : false;
    const rowClasses = twMerge("transition-colors", isSelected && "bg-primary/10", isDisabled && "opacity-50 cursor-not-allowed", hoverable && "hover:bg-foreground/10", className);
    return (_jsxs("tr", Object.assign({ ref: ref, className: rowClasses }, props, { children: [selectable && (_jsx("td", { className: "px-2 py-1 whitespace-nowrap", children: _jsx(Checkbox, { checked: isSelected, onChange: (e) => rowId && onSelectRow(rowId, e.target.checked) }) })), children] })));
});
export const TableCell = forwardRef((_a, ref) => {
    var { children, align = "left", colSpan, className } = _a, props = __rest(_a, ["children", "align", "colSpan", "className"]);
    const alignmentClass = {
        left: "text-left",
        center: "text-center",
        right: "text-right",
    }[align];
    return (_jsx("td", Object.assign({ ref: ref, colSpan: colSpan, className: twMerge("px-2 py-1 whitespace-nowrap text-foreground", alignmentClass, className) }, props, { children: _jsx(Text, { as: "span", size: "sm", className: "text-foreground", children: children }) })));
});
