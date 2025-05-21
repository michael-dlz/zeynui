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
import { forwardRef, createContext, useContext, Children, isValidElement, } from "react";
import { twMerge } from "tailwind-merge";
import Checkbox from "./Checkbox";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button, Text } from "@zeynui/react";
const TableContext = createContext({});
// Main Table Component
export const Table = forwardRef((_a, ref) => {
    var { striped = true, hoverable = true, compact = false, selectable = false, className, children, selectedRows = [], onSelectRow, page = 1, totalPages = 1, onPageChange, scrollable = true } = _a, props = __rest(_a, ["striped", "hoverable", "compact", "selectable", "className", "children", "selectedRows", "onSelectRow", "page", "totalPages", "onPageChange", "scrollable"]);
    const contextValue = {
        selectable,
        selectedRows,
        onSelectRow,
        page,
        totalPages,
        onPageChange,
    };
    return (_jsx(TableContext.Provider, { value: contextValue, children: _jsxs("div", { className: "flex flex-col gap-4", children: [_jsx("div", { className: twMerge("rounded-lg border border-gray-200 shadow-sm", scrollable && "overflow-x-auto"), children: _jsx("table", Object.assign({ ref: ref, className: twMerge("w-full text-sm bg-white min-w-max", striped && "[&>tbody>tr:nth-child(even)]:bg-gray-50", hoverable && "hover:[&>tbody>tr]:bg-gray-50", compact ? "text-sm" : "text-base", className) }, props, { children: children })) }), totalPages > 1 && (_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("div", { children: selectable && (_jsxs("span", { className: "text-sm text-gray-600", children: [selectedRows.length, " selected"] })) }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Button, { isIconOnly: true, size: "sm", onClick: () => onPageChange === null || onPageChange === void 0 ? void 0 : onPageChange(Math.max(1, page - 1)), disabled: page <= 1, className: "p-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100", children: _jsx(ChevronLeft, { size: 18 }) }), _jsxs(Text, { as: "span", size: "sm", children: ["P\u00E1gina ", page, " de ", totalPages] }), _jsx(Button, { isIconOnly: true, size: "sm", onClick: () => onPageChange === null || onPageChange === void 0 ? void 0 : onPageChange(Math.min(totalPages, page + 1)), disabled: page >= totalPages, className: "p-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100", children: _jsx(ChevronRight, { size: 18 }) })] })] }))] }) }));
});
// Header component with built-in select all checkbox
export const TableHeader = forwardRef((_a, ref) => {
    var { className, children } = _a, props = __rest(_a, ["className", "children"]);
    const { selectable, selectedRows = [], onSelectRow, } = useContext(TableContext);
    const allSelected = selectedRows.length > 0;
    const someSelected = selectedRows.length > 0 && !allSelected;
    return (_jsx("thead", Object.assign({ ref: ref, className: twMerge("bg-gray-100 text-gray-700 font-semibold border-b border-gray-200", className) }, props, { children: _jsxs("tr", { children: [selectable && (_jsx("th", { className: "w-10 px-4 py-3", children: _jsx(Checkbox, { checked: allSelected, onChange: (e) => {
                            const allIds = Children.toArray(children)
                                .filter((child) => isValidElement(child) &&
                                "rowId" in child.props)
                                .map((child) => child.props.rowId);
                            allIds.forEach((id) => onSelectRow === null || onSelectRow === void 0 ? void 0 : onSelectRow(id, e.target.checked));
                        }, indeterminate: someSelected }) })), children] }) })));
});
// Column component
export const TableColumn = forwardRef((_a, ref) => {
    var { children, align = "left", width, className } = _a, props = __rest(_a, ["children", "align", "width", "className"]);
    return (_jsx("th", Object.assign({ ref: ref, className: twMerge("px-4 py-3 text-left", align === "center" && "text-center", align === "right" && "text-right", className), style: { width } }, props, { children: children })));
});
// Body component
export const TableBody = forwardRef((_a, ref) => {
    var { className, children } = _a, props = __rest(_a, ["className", "children"]);
    return (_jsx("tbody", Object.assign({ ref: ref, className: twMerge("divide-y divide-gray-200", className) }, props, { children: children })));
});
// Row component with built-in selection
export const TableRow = forwardRef((_a, ref) => {
    var { className, children, rowId, isDisabled } = _a, props = __rest(_a, ["className", "children", "rowId", "isDisabled"]);
    const { selectable, selectedRows = [], onSelectRow, } = useContext(TableContext);
    const isSelected = rowId ? selectedRows.includes(rowId) : false;
    return (_jsxs("tr", Object.assign({ ref: ref, className: twMerge("transition-colors", isSelected && "bg-primary/10", isDisabled && "opacity-50 cursor-not-allowed", className) }, props, { children: [selectable && (_jsx("td", { className: "px-4 py-3 whitespace-nowrap", children: _jsx(Checkbox, { checked: isSelected, onChange: (e) => rowId && (onSelectRow === null || onSelectRow === void 0 ? void 0 : onSelectRow(rowId, e.target.checked)) }) })), children] })));
});
// Cell component
export const TableCell = forwardRef((_a, ref) => {
    var { children, align = "left", colSpan, className } = _a, props = __rest(_a, ["children", "align", "colSpan", "className"]);
    return (_jsx("td", Object.assign({ ref: ref, colSpan: colSpan, className: twMerge("px-4 py-3 whitespace-nowrap", align === "center" && "text-center", align === "right" && "text-right", className) }, props, { children: children })));
});
