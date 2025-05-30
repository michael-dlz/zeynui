"use client";

import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
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
  StaggeredAnimation,
  Tab,
  Tabs,
  Tooltip,
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
import Checkbox from "../src/core/components/Checkbox";
import { DoorClosed } from "lucide-react";

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
        position="sticky"
        size="xl"
        className="bg-white shadow-sm"
        responsive={
          <div className="space-y-3">
            <NavbarStart>
              <a href="#" className="font-bold text-xl text-primary">
                Brand
              </a>
            </NavbarStart>
            <NavbarContent className="space-y-3">
              <NavbarItem>
                <Button
                  variant="soft"
                  align="left"
                  radius="none"
                  isElevation={false}
                  as={Link}
                  href="#"
                  fullWidth
                >
                  Inicio
                </Button>
              </NavbarItem>
              <NavbarItem>
                <Dropdown>
                  <DropdownTrigger isHover className="w-full">
                    <Button
                      variant="soft"
                      isElevation={false}
                      fullWidth
                      align="left"
                      rightContent={<ChevronDownIcon className="size-4" />}
                    >
                      Features
                    </Button>
                  </DropdownTrigger>
                  <DropdownContent aria-label="Static Actions">
                    <Button
                      align="left"
                      variant="light"
                      size="md"
                      radius="md"
                      isElevation={false}
                      color="success"
                      fullWidth
                      leftContent={<PlusIcon className="size-5" />}
                      onClick={() => console.log("Validar")}
                    >
                      Validar
                    </Button>
                    <Button
                      align="left"
                      variant="light"
                      size="md"
                      radius="md"
                      isElevation={false}
                      color="danger"
                      fullWidth
                      leftContent={<PlusIcon className="size-5" />}
                    >
                      Eliminar
                    </Button>
                  </DropdownContent>
                </Dropdown>
              </NavbarItem>
              <NavbarItem>
                <Button
                  variant="soft"
                  align="left"
                  radius="none"
                  isElevation={false}
                  as={Link}
                  href="#"
                  fullWidth
                >
                  Pricing
                </Button>
              </NavbarItem>
              <NavbarItem>
                <Button
                  variant="soft"
                  align="left"
                  radius="none"
                  isElevation={false}
                  as={Link}
                  href="#"
                  fullWidth
                >
                  About
                </Button>
              </NavbarItem>
            </NavbarContent>
            <NavbarEnd>
              <Button
                color="primary"
                leftContent={<PhoneArrowDownLeftIcon className="size-4" />}
                isElevation={false}
                isBounce={false}
                fullWidth
                align="left"
              >
                Contact
              </Button>
            </NavbarEnd>
          </div>
        }
      >
        <NavbarStart>
          <a href="#" className="font-bold text-xl text-primary">
            Brand
          </a>
        </NavbarStart>
        <NavbarContent className="hidden md:flex ">
          <NavbarItem>
            <Button
              variant="light"
              radius="none"
              isElevation={false}
              as={Link}
              href="#"
            >
              Inicio
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Dropdown>
              <DropdownTrigger isHover>
                <Button
                  variant="light"
                  isElevation={false}
                  rightContent={<ChevronDownIcon className="size-4" />}
                >
                  Features
                </Button>
              </DropdownTrigger>
              <DropdownContent aria-label="Static Actions">
                <div className="grid grid-cols-3 w-2xl">
                  <Button
                    align="left"
                    variant="light"
                    size="md"
                    radius="md"
                    isElevation={false}
                    color="success"
                    fullWidth
                    leftContent={<PlusIcon className="size-5" />}
                    onClick={() => console.log("Validar")}
                  >
                    Validar
                  </Button>
                  <Button
                    align="left"
                    variant="light"
                    size="md"
                    radius="md"
                    isElevation={false}
                    color="danger"
                    fullWidth
                    leftContent={<PlusIcon className="size-5" />}
                  >
                    Eliminar
                  </Button>
                </div>
              </DropdownContent>
            </Dropdown>
          </NavbarItem>
          <NavbarItem>
            <Button
              variant="light"
              radius="none"
              isElevation={false}
              as={Link}
              href="#"
            >
              Pricing
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button
              variant="light"
              radius="none"
              isElevation={false}
              as={Link}
              href="#"
            >
              About
            </Button>
          </NavbarItem>
        </NavbarContent>
        <NavbarEnd>
          <Button
            radius="none"
            color="primary"
            leftContent={<PhoneArrowDownLeftIcon className="size-4" />}
            isElevation={false}
            isBounce={false}
          >
            Contact
          </Button>
        </NavbarEnd>
      </Navbar>
      <Container className="grid gap-3 py-10">
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <Button
              key={color}
              align="left"
              variant="solid"
              size="md"
              radius="full"
              isElevation={false}
              color={color}
            >
              {color}
            </Button>
          ))}
        </div>
      </Container>
      <Container className="grid gap-3 py-10">
        <div className="flex flex-wrap gap-2">
          {variants.map((variant) => (
            <Button
              key={variant}
              align="left"
              variant={variant}
              size="md"
              radius="md"
              color="primary"
              topContent={<PhoneArrowDownLeftIcon className="size-4" />}
              isElevation={false}
            >
              {variant}
            </Button>
          ))}
        </div>
      </Container>
      <Container className="py-10">
        <Text size="2xl" weight="semibold" as="h3">
          Hola, soy un título
        </Text>
      </Container>
      <Container className="py-10">
        <Dropdown>
          <DropdownTrigger>
            <Tooltip content="Abrir menú" placement="top" variant="solid">
              <Button variant="outline" isElevation={false}>
                Hola
              </Button>
            </Tooltip>
          </DropdownTrigger>
          <DropdownContent aria-label="Static Actions">
            <Button
              align="left"
              variant="light"
              size="md"
              radius="md"
              isElevation={false}
              color="success"
              fullWidth
              leftContent={<PlusIcon className="size-5" />}
              onClick={() => console.log("Validar")}
            >
              Validar
            </Button>
            <Button
              align="left"
              variant="light"
              size="md"
              radius="md"
              isElevation={false}
              color="danger"
              fullWidth
              leftContent={<PlusIcon className="size-5" />}
            >
              Eliminar
            </Button>
          </DropdownContent>
        </Dropdown>
      </Container>
      <Container className="py-10 space-y-5">
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <Chip
              key={color}
              variant="outline"
              color={color}
              size="sm"
              radius="full"
            >
              {color}
            </Chip>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {variants.map((variant) => (
            <Chip
              key={variant}
              variant={variant}
              color="primary"
              size="sm"
              radius="sm"
            >
              {variant}
            </Chip>
          ))}
        </div>
      </Container>
      <Container className="py-10">
        <Button variant="outline" onClick={onOpenDrawer}>
          Abrir Drawer
        </Button>
        <Drawer
          isOpen={isOpenDrawer}
          onClose={onCloseDrawer}
          placement="right"
          size="3xl"
          backdrop="opaque"
        >
          <DrawerHeader>
            <h2 className="text-xl font-semibold">Drawer Header</h2>
          </DrawerHeader>
          <DrawerBody className="grid grid-cols-4 gap-3">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="shadow-lg">
                <CardHeader className="space-y-2 ">
                  <Text size="base" weight="bold">
                    Kia Cerato 2021
                  </Text>
                </CardHeader>
                <CardImage>
                  <Carousel
                    loop
                    pagination
                    slidesToShow={1}
                    navigation
                    spacing={0}
                  >
                    <CarouselItem>
                      <img
                        src="https://plp-statics.s3.amazonaws.com/auction/image/d55e47fa-ee56-4e10-865e-76950f70da5d.jpg"
                        alt="carousel"
                        className="w-full h-full object-cover"
                      />
                    </CarouselItem>
                    <CarouselItem>
                      <img
                        src="https://plp-statics.s3.amazonaws.com/auction/image/d55e47fa-ee56-4e10-865e-76950f70da5d.jpg"
                        alt="carousel"
                        className="w-full h-full object-cover"
                      />
                    </CarouselItem>
                  </Carousel>
                </CardImage>
                <CardContent>
                  <Text size="sm" as="p">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </Text>
                </CardContent>
                <CardFooter className="flex justify-between gap-2">
                  <Button
                    color="danger"
                    variant="soft"
                    radius="md"
                    leftContent={<XCircleIcon className="size-4" />}
                  >
                    Rechazar
                  </Button>
                  <Button
                    color="success"
                    variant="soft"
                    radius="md"
                    leftContent={<CheckCircleIcon className="size-4" />}
                  >
                    Aceptar
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </DrawerBody>
          <DrawerFooter>
            <div className="flex justify-end gap-2">
              <Button onClick={onCloseDrawer} variant="light" color="danger">
                Cancelar
              </Button>
              <Button onClick={onCloseDrawer} variant="solid" color="success">
                Aceptar
              </Button>
            </div>
          </DrawerFooter>
        </Drawer>
      </Container>
      <Container className="py-10">
        <Button variant="outline" onClick={onOpenModal}>
          Abrir Modal
        </Button>
        <Modal
          isOpen={isOpenModal}
          onClose={onCloseModal}
          backdrop="blur"
          size="sm"
          className="bg-white"
        >
          <ModalHeader>
            <h2 className="text-xl font-semibold">Modal Header</h2>
          </ModalHeader>
          <ModalBody className="grid grid-cols-4 gap-3">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="shadow-lg">
                <CardHeader className="space-y-2 ">
                  <Text size="base" weight="bold">
                    Kia Cerato 2021
                  </Text>
                </CardHeader>
                <CardImage>
                  <Carousel
                    loop
                    pagination
                    slidesToShow={1}
                    navigation
                    spacing={0}
                  >
                    <CarouselItem>
                      <img
                        src="https://plp-statics.s3.amazonaws.com/auction/image/d55e47fa-ee56-4e10-865e-76950f70da5d.jpg"
                        alt="carousel"
                        className="w-full h-full object-cover"
                      />
                    </CarouselItem>
                    <CarouselItem>
                      <img
                        src="https://plp-statics.s3.amazonaws.com/auction/image/d55e47fa-ee56-4e10-865e-76950f70da5d.jpg"
                        alt="carousel"
                        className="w-full h-full object-cover"
                      />
                    </CarouselItem>
                  </Carousel>
                </CardImage>
                <CardContent>
                  <Text size="sm" as="p">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </Text>
                </CardContent>
                <CardFooter className="flex justify-between gap-2">
                  <Button
                    color="danger"
                    variant="soft"
                    radius="md"
                    leftContent={<XCircleIcon className="size-4" />}
                  >
                    Rechazar
                  </Button>
                  <Button
                    color="success"
                    variant="soft"
                    radius="md"
                    leftContent={<CheckCircleIcon className="size-4" />}
                  >
                    Aceptar
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </ModalBody>
          <ModalFooter>
            <div className="flex justify-end gap-2">
              <Button onClick={onCloseModal} variant="light" color="danger">
                Cancelar
              </Button>
              <Button onClick={onCloseModal} variant="solid" color="success">
                Aceptar
              </Button>
            </div>
          </ModalFooter>
        </Modal>
      </Container>
      <Container>
        <Table selectable striped={false}>
          <TableHeader>
            <TableColumn>Nombre</TableColumn>
            <TableColumn>Apellido</TableColumn>
            <TableColumn>Email</TableColumn>
            <TableColumn>Teléfono</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Juan</TableCell>
              <TableCell>Perez</TableCell>
              <TableCell>juan.perez@gmail.com</TableCell>
              <TableCell>1234567890</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Juan</TableCell>
              <TableCell>Perez</TableCell>
              <TableCell>juan.perez@gmail.com</TableCell>
              <TableCell>1234567890</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Juan</TableCell>
              <TableCell>Perez</TableCell>
              <TableCell>juan.perez@gmail.com</TableCell>
              <TableCell>1234567890</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Container>
      <Container className="py-10">
        <Carousel
          loop
          pagination
          autoplay
          slidesToShow={1}
          navigation
          spacing={0}
          thumbnails
        >
          <CarouselItem>
            <img
              src="https://plp-statics.s3.amazonaws.com/banner/banner-pc-6.png"
              alt="carousel"
              className="w-full h-full object-cover"
            />
          </CarouselItem>
          <CarouselItem>
            <img
              src="https://plp-statics.s3.amazonaws.com/banner/que-bienes-puedo-comprar.png"
              alt="carousel"
              className="w-full h-full object-cover"
            />
          </CarouselItem>
        </Carousel>
      </Container>
      <Container className="py-10">
        <StaggeredAnimation
          loop
          className="grid gap-2 grid-cols-2 lg:grid-cols-4"
        >
          {[...Array(6)].map((_, index) => (
            <Card key={index} className="shadow-lg">
              <CardHeader className="space-y-2 ">
                <Text size="base" weight="bold">
                  Kia Cerato 2021
                </Text>
              </CardHeader>
              <CardImage>
                <Carousel
                  loop
                  pagination
                  slidesToShow={1}
                  navigation
                  spacing={0}
                >
                  <CarouselItem>
                    <img
                      src="https://plp-statics.s3.amazonaws.com/auction/image/d55e47fa-ee56-4e10-865e-76950f70da5d.jpg"
                      alt="carousel"
                      className="w-full h-full object-cover"
                    />
                  </CarouselItem>
                  <CarouselItem>
                    <img
                      src="https://plp-statics.s3.amazonaws.com/auction/image/d55e47fa-ee56-4e10-865e-76950f70da5d.jpg"
                      alt="carousel"
                      className="w-full h-full object-cover"
                    />
                  </CarouselItem>
                </Carousel>
              </CardImage>
              <CardContent>
                <Text size="sm" as="p">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Text>
              </CardContent>
              <CardFooter className="flex justify-between gap-2">
                <Button
                  color="danger"
                  variant="soft"
                  radius="md"
                  leftContent={<XCircleIcon className="size-4" />}
                >
                  Rechazar
                </Button>
                <Button
                  color="success"
                  variant="soft"
                  radius="md"
                  leftContent={<CheckCircleIcon className="size-4" />}
                >
                  Aceptar
                </Button>
              </CardFooter>
            </Card>
          ))}
        </StaggeredAnimation>
      </Container>
      <Container className="space-y-10">
        {variants.map((variant) => (
          <Tabs
            key={variant}
            variant={variant}
            color="danger"
            size="md"
            radius="none"
          >
            <Tab
              key="musica"
              title="Música"
              as="button"
              isDefault
              topContent={<PhoneArrowDownLeftIcon className="size-4" />}
            >
              <p>Contenido de Música</p>
            </Tab>
            <Tab
              key="television"
              title="Televisión"
              topContent={<PhoneArrowDownLeftIcon className="size-4" />}
            >
              <p>Contenido de Televisión</p>
            </Tab>
            <Tab
              key="deportes"
              title="Deportes"
              topContent={<PhoneArrowDownLeftIcon className="size-4" />}
            >
              <p>Contenido de Deportes</p>
            </Tab>
          </Tabs>
        ))}
      </Container>
      <Container className="py-10 space-y-3">
        {variants.map((variant) => (
          <div key={variant} className="grid grid-cols-2 gap-3">
            {colors.map((color: ColorVariant) => (
              <div className="flex gap-2 items-end" key={color}>
                <Input
                  id={color + variant}
                  label="Número de Teléfono"
                  name="phone"
                  color={color}
                  variant={variant}
                  disabled={color === "whatsapp"}
                  leftContent={<PhoneArrowDownLeftIcon className="size-4" />}
                  error="Error"
                />
                <Button color={color} variant={variant}>
                  Buscar
                </Button>
              </div>
            ))}
          </div>
        ))}
      </Container>
      <Container>
        <Checkbox label="Checkbox" />
      </Container>
      <Container>
        <Select
          label="Número de Teléfono"
          name="phone"
          labelPlacement="outside"
          selectSize="md"
          color="primary"
          radius="full"
          variant="light"
          description="Ingresa tu número de teléfono"
          leftContent={<PhoneArrowDownLeftIcon className="size-4" />}
        >
          {colors.map((color) => (
            <SelectItem key={color} value={color}>
              {color}
            </SelectItem>
          ))}
        </Select>
      </Container>
    </>
  );
};

export default homePage;
