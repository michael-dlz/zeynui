"use client";

import { PropsWithChildren } from "react";
import { Container } from "./Container";

interface LayoutProps extends PropsWithChildren {
  className?: string;
}

export const Layout = ({ children, className = "" }: LayoutProps) => {
  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      {children}
    </div>
  );
};

interface HeaderProps extends PropsWithChildren {
  className?: string;
}

export const Header = ({ children, className = "" }: HeaderProps) => {
  return (
    <header className={className}>
      <Container>{children}</Container>
    </header>
  );
};

interface MainProps extends PropsWithChildren {
  className?: string;
  fullWidth?: boolean;
}

export const Main = ({ 
  children, 
  className = "",
  fullWidth = false 
}: MainProps) => {
  if (fullWidth) {
    return <main className={`flex-1 ${className}`}>{children}</main>;
  }

  return (
    <main className={`flex-1 ${className}`}>
      <Container>{children}</Container>
    </main>
  );
};

interface FooterProps extends PropsWithChildren {
  className?: string;
}

export const Footer = ({ children, className = "" }: FooterProps) => {
  return (
    <footer className={className}>
      <Container>{children}</Container>
    </footer>
  );
}; 