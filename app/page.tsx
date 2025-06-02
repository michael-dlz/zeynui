"use client";

import React from "react";
import {
  CardImage,
  Carousel,
  CarouselItem,
  Chip,
  ColorVariant,
  Container,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  Dropdown,
  DropdownContent,
  DropdownTrigger,
  Input,
  Navbar,
  NavbarStart,
  NavbarContent,
  NavbarEnd,
  NavbarItem,
  Select,
  SelectItem,
  Tab,
  Tabs,
  Text,
  useDisclosure,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Modal,
  Table,
  TableColumn,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Autocomplete,
  Checkbox,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "../src/core";
import { colors } from "../utils/colors";
import { variants } from "../utils/variants";
import {
  CheckCircleIcon,
  ChevronDownIcon,
  PhoneArrowDownLeftIcon,
  PlusIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { DoorClosed, LogOut, MapPinIcon } from "lucide-react";
import { Button } from "../src/core/components/Button";

const homePage = () => {
  const {
    isOpen: isOpenDrawer,
    onOpen: onOpenDrawer,
    onClose: onCloseDrawer,
    toggle: toggleDrawer,
  } = useDisclosure();
  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
    toggle: toggleModal,
  } = useDisclosure();

  return (
    <>
      <Navbar
        responsive={
          <div>
            <Button>Login</Button>
          </div>
        }
      >
        <NavbarStart>
          <LogOut size={20} />
        </NavbarStart>

        <NavbarContent>
          <NavbarItem>Inicio</NavbarItem>
          <NavbarItem>Productos</NavbarItem>
          <NavbarItem>Contacto</NavbarItem>
        </NavbarContent>

        <NavbarEnd>
          <Button>Login</Button>
        </NavbarEnd>
      </Navbar>
      <div className="grid gap-10 py-96">
        <Container className="grid gap-3 py-10">
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => {
              return (
                <div className="flex flex-wrap items-center gap-4" key={color}>
                  <Text as="h2" size="sm" className="w-16">
                    {color}
                  </Text>
                  {variants.map((variant) => (
                    <div key={color + variant}>
                      <Button
                        key={color + variant}
                        align="left"
                        variant={variant}
                        size="md"
                        radius="sm"
                        isElevation={false}
                        color={color}
                      >
                        {variant}
                      </Button>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </Container>
        <Container className="grid gap-3 py-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(10)].map((_, index) => (
            <Card key={index}>
              <CardHeader>
                <Text as="h2" size="sm" className="w-16">
                  Hola
                </Text>
              </CardHeader>
              <CardContent>
                <Text as="h2" size="sm" className="w-16">
                  Hola
                </Text>
              </CardContent>
              <CardFooter>
                <Button>Click me</Button>
              </CardFooter>
            </Card>
          ))}
        </Container>
        <Container>
          <Carousel thumbnails navigation pagination>
            {[...Array(10)].map((_, index) => (
              <CarouselItem key={index}>
                <img
                  src="/aDznPbh8WN-LVdee_sl1-desk-cyber-apple-010625a-cl.webp"
                  className="w-full h-96 object-cover"
                  alt=""
                />
              </CarouselItem>
            ))}
          </Carousel>
        </Container>
        <Container>
          <Checkbox />
        </Container>
        <Container className="grid gap-3 py-10">
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => {
              return (
                <div className="flex flex-wrap items-center gap-4" key={color}>
                  <Text as="h2" size="sm" className="w-16">
                    {color}
                  </Text>
                  {variants.map((variant) => (
                    <div key={color + variant} className="flex flex-col gap-2">
                      <Input
                        key={color + variant}
                        variant={variant}
                        radius="sm"
                        color={color}
                        label={variant}
                        description="This is a description"
                      />
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </Container>
        <Container className="grid gap-3 py-10">
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => {
              return (
                <div className="flex flex-wrap items-center gap-4" key={color}>
                  <Text as="h2" size="sm" className="w-16">
                    {color}
                  </Text>
                  {variants.map((variant) => (
                    <Select
                      key={color + variant}
                      variant={variant}
                      radius="sm"
                      color={color}
                      label={variant}
                      className="w-96"
                    >
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                    </Select>
                  ))}
                </div>
              );
            })}
          </div>
        </Container>
        <Container className="grid gap-3 py-10">
          {" "}
          <Autocomplete
            leftContent={<MapPinIcon className="size-4" />}
            label="País"
            options={countries}
          />
        </Container>
      </div>
    </>
  );
};

export default homePage;

const countries = [
  { value: "1", label: "Argentina" },
  { value: "2", label: "Brasil" },
  { value: "3", label: "Chile" },
];
