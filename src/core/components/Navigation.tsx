"use client";
import React, { createContext, useContext } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { JustifyNavbar, PositionNavbar, SizeVariant } from "../types";
import { Button } from "./Button";
import { Drawer, DrawerBody } from "./Drawer";
import { useDisclosure } from "../hook/useDisclosure";

export interface NavbarProps {
  children: React.ReactNode;
  className?: string;
  position?: PositionNavbar;
  transparent?: boolean;
  size?: SizeVariant;
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
        return "max-w-[1024px]";
      case "md":
        return "max-w-[1240px]";
      case "lg":
        return "max-w-[1920px]";
      case "xl":
        return "max-w-[1240px]";
      default:
        return "max-w-[2560px]";
    }
  };

  return (
    <nav className={`${className} ${getPositionClass()}`}>
      <div>
        <div
          className={`
          mx-auto
          w-full py-3
          px-6
          sm:px-10 
          lg:px-20 ${getSizeClass()} ${getJustifyClass()} flex items-center`}
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

export interface NavbarStartProps {
  children: React.ReactNode;
  className?: string;
}

export const NavbarStart = ({ children, className = "" }: NavbarStartProps) => {
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
      <div className={`${getJustifyClass()} items-center ${className}`}>
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
