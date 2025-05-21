"use client"

import { ReactNode } from "react";

// Tipos
type SidebarProps = {
  children: ReactNode;
  width?: string;
  className?: string;
};

type SidebarSectionProps = {
  children: ReactNode;
  className?: string;
  sticky?: boolean;
};

// Sidebar Principal (siempre visible)
export function Sidebar({
  children,
  width = "250px",
  className = "",
}: SidebarProps) {
  return (
    <aside
      className={`top-0 left-0 h-screen p-2 space-y-6 ${className}`}
      style={{ width }}
      aria-label="Sidebar"
      data-testid="sidebar"
    >
      {children}
    </aside>
  );
}

// Sección reutilizable (Header/Body/Footer)
export function SidebarSection({
  children,
  className = "",
  sticky = false,
}: SidebarSectionProps) {
  return (
    <div className={`${sticky ? "sticky top-0 z-10" : ""} ${className}`}>
      {children}
    </div>
  );
}

// Componentes semánticos opcionales (para mejor organización)
export function SidebarHeader(props: SidebarSectionProps) {
  return <SidebarSection {...props} className="px-6 py-2" />;
}

export function SidebarBody(props: SidebarSectionProps) {
  return <SidebarSection {...props} />;
}

export function SidebarFooter(props: SidebarSectionProps) {
  return <SidebarSection sticky {...props} className="bottom-0 p-6" />;
}
