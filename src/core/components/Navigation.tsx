"use client";
import React, {
  useState,
  createContext,
  Children,
  isValidElement,
  useContext,
} from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { JustifyNavbar, PositionNavbar, SizeNavbar } from "../types";
import { Button } from "./Button";
import { Drawer, DrawerBody, DrawerFooter } from "./Drawer";
import { useDisclosure } from "../hook/useDisclosure";

export interface NavbarProps {
  children: React.ReactNode;
  className?: string;
  position?: PositionNavbar;
  transparent?: boolean;
  size?: SizeNavbar;
  responsive?: React.ReactNode;
  justify?: JustifyNavbar;
}

export interface NavbarContextProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  itemSpacing?: string;
  fullHeightItems?: boolean;
  activeItemClassName?: string;
}

export const NavbarContext = createContext<NavbarContextProps>({
  isOpen: false,
  setIsOpen: () => {},
});

export const Navbar = ({
  children,
  className = "",
  position = "sticky",
  size = "xl",
  responsive,
  justify = "between",
}: NavbarProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const getJustifyClass = () => {
    switch (justify) {
      case "start":
        return "justify-start";
      case "center":
        return "justify-center";
      case "end":
        return "justify-end";
      case "between":
        return "justify-between";
      case "around":
        return "justify-around";
      case "evenly":
        return "justify-evenly";
      default:
        return "justify-between";
    }
  };

  const getPositionClass = () => {
    switch (position) {
      case "fixed":
        return "fixed top-0 left-0 right-0 z-50";
      case "sticky":
        return "sticky top-0 z-50";
      default:
        return "";
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case "sm":
        return "mx-auto w-full max-w-[1024px]";
      case "xl":
        return "mx-auto w-full max-w-[1240px]";
      case "2xl":
        return "mx-auto w-full max-w-[1366px]";
      case "full":
        return "mx-auto w-full max-w-full";
      default:
        return "";
    }
  };

  return (
    <nav className={`${className} ${getPositionClass()}`}>
      <div>
        <div
          className={`px-4 sm:px-6 md:px-8 lg:px-12 ${getSizeClass()} ${getJustifyClass()} flex items-center`}
        >
          {/* Botón para abrir el Drawer en móviles */}
          <div className="flex md:hidden">
            <Button variant="light" isIconOnly onClick={onOpen}>
              <Bars3Icon className="size-6" />
            </Button>
          </div>

          {/* Renderizar el contenido normal en desktop */}
          {children}

          {/* Drawer para móviles */}
          <Drawer
            isOpen={isOpen}
            onClose={onClose}
            placement="right"
            size="md"
            backdrop="blur"
          >
            <DrawerBody>{responsive}</DrawerBody>
          </Drawer>
        </div>
      </div>
    </nav>
  );
};

export interface NavbarBrandProps {
  children: React.ReactNode;
  className?: string;
}

export const NavbarBrand = ({ children, className = "" }: NavbarBrandProps) => {
  return <div className={`flex items-center ${className}`}>{children}</div>;
};

export interface NavbarContentProps {
  children: React.ReactNode;
  className?: string;
  justify?: JustifyNavbar;
  fullHeightItems?: boolean;
}

export const NavbarContent = ({
  children,
  className = "",
  justify = "center",
  fullHeightItems = false,
}: NavbarContentProps) => {
  const { isOpen, setIsOpen } = useContext(NavbarContext);

  const getJustifyClass = () => {
    switch (justify) {
      case "start":
        return "justify-start";
      case "center":
        return "justify-center";
      case "end":
        return "justify-end";
      case "between":
        return "justify-between";
      case "around":
        return "justify-around";
      case "evenly":
        return "justify-evenly";
      default:
        return "justify-center";
    }
  };

  return (
    <NavbarContext.Provider
      value={{
        isOpen,
        setIsOpen,
        fullHeightItems,
      }}
    >
      <div
        className={`${getJustifyClass()} items-center ${className}`}
      >
        {children}
      </div>
    </NavbarContext.Provider>
  );
};

export interface NavbarItemProps {
  children: React.ReactNode;
  className?: string;
}

export const NavbarItem = ({ children, className = "" }: NavbarItemProps) => {
  return <div className={`${className}`}>{children}</div>;
};

export interface NavbarEndProps {
  children: React.ReactNode;
  className?: string;
}

export const NavbarEnd = ({ children, className = "" }: NavbarEndProps) => {
  return <div className={`flex items-center ${className}`}>{children}</div>;
};
