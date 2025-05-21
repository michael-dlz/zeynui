import { jsx as _jsx } from "react/jsx-runtime";
// Sidebar Principal (siempre visible)
export function Sidebar({ children, width = "250px", className = "", }) {
    return (_jsx("aside", { className: `top-0 left-0 h-screen p-2 space-y-6 ${className}`, style: { width }, "aria-label": "Sidebar", "data-testid": "sidebar", children: children }));
}
// Sección reutilizable (Header/Body/Footer)
export function SidebarSection({ children, className = "", sticky = false, }) {
    return (_jsx("div", { className: `${sticky ? "sticky top-0 z-10" : ""} ${className}`, children: children }));
}
// Componentes semánticos opcionales (para mejor organización)
export function SidebarHeader(props) {
    return _jsx(SidebarSection, Object.assign({}, props, { className: "px-6 py-2" }));
}
export function SidebarBody(props) {
    return _jsx(SidebarSection, Object.assign({}, props));
}
export function SidebarFooter(props) {
    return _jsx(SidebarSection, Object.assign({ sticky: true }, props, { className: "bottom-0 p-6" }));
}
