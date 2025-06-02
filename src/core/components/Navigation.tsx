"use client";
import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  ReactNode,
  SetStateAction,
  useContext,
} from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { ContainerSizeVariant, JustifyNavbar, PositionNavbar } from "../types";
import { Drawer, DrawerBody } from "./Drawer";
import { useDisclosure } from "../hook/useDisclosure";
import { Button } from "./Button";

export interface NavbarProps extends PropsWithChildren {
  className?: string;
  position?: PositionNavbar;
  transparent?: boolean;
  size?: ContainerSizeVariant;
  responsive?: ReactNode;
  justify?: JustifyNavbar;
}

export interface NavbarContextProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
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
        return "max-w-[1290px]";
      case "lg":
        return "max-w-[1440px]";
      case "xl":
        return "max-w-[1920px]";
      case "2xl":
        return "max-w-[2560px]";
      case "full":
        return "w-full";
      default:
        return "";
    }
  };

  return (
    <nav className={`${className} ${getPositionClass()}`}>
      <div>
        <div
          className={`
          mx-auto
          w-full py-3
          bg-background
        ${
          size === "full" ? "px-0" : "px-6 sm:px-10 2xl:px-20"
        } ${getSizeClass()} ${getJustifyClass()} flex items-center`}
        >
          {responsive && (
            <div className="flex md:hidden">
              <Button variant="light" isIconOnly onClick={onOpen}>
                <Bars3Icon className="size-6" />
              </Button>
            </div>
          )}

          {children}

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
  children: ReactNode;
  className?: string;
}

export const NavbarStart = ({ children, className = "" }: NavbarStartProps) => {
  return <div className={`flex items-center ${className}`}>{children}</div>;
};

export interface NavbarContentProps {
  children: ReactNode;
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
        className={`${getJustifyClass()} gap-4 hidden md:flex items-center ${className}`}
      >
        {children}
      </div>
    </NavbarContext.Provider>
  );
};

export interface NavbarItemProps {
  children: ReactNode;
  className?: string;
}

export const NavbarItem = ({ children, className = "" }: NavbarItemProps) => {
  return <div className={`${className}`}>{children}</div>;
};

export interface NavbarEndProps {
  children: ReactNode;
  className?: string;
}

export const NavbarEnd = ({ children, className = "" }: NavbarEndProps) => {
  return <div className={`flex items-center ${className}`}>{children}</div>;
};
