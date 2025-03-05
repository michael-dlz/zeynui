"use client";

import React from "react";
import {
  AnimateIn,
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
  Select,
  SelectItem,
  Tab,
  Tabs,
  Tooltip,
  Typography,
  useDisclosure,
} from "../src/core";
import { colors } from "../utils/colors";
import { variants } from "../utils/variants";
import {
  CheckCircleIcon,
  PhoneArrowDownLeftIcon,
  PlusIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

const homePage = () => {
  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
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
              startContent={<PlusIcon className="size-5" />}
              isElevation={false}
            >
              {variant}
            </Button>
          ))}
        </div>
      </Container>
      <Container className="py-10">
        <Typography size="2xl" weight="semibold" as="h3">
          Hola, soy un título
        </Typography>
      </Container>
      <Container className="py-10">
        <Dropdown>
          <DropdownTrigger>
            <Tooltip content="Abrir menú" placement="top">
              <Button variant="outline" isElevation={false}>
                Open Menu
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
              startContent={<PlusIcon className="size-5" />}
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
              startContent={<PlusIcon className="size-5" />}
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
        <Button variant="outline" onClick={onOpen}>
          Abrir Drawer
        </Button>
        <Drawer
          isOpen={isOpen}
          onClose={onClose}
          placement="bottom"
          size="3xl"
          backdrop="opaque"
        >
          <DrawerHeader>
            <h2 className="text-xl font-semibold">Drawer Header</h2>
          </DrawerHeader>
          <DrawerBody>
            <p>
              Este es el contenido del drawer. Puedes poner cualquier contenido
              aquí.
            </p>
          </DrawerBody>
          <DrawerFooter>
            <div className="flex justify-end gap-2">
              <Button onClick={onClose} variant="light" color="danger">
                Cancelar
              </Button>
              <Button onClick={onClose} variant="solid" color="success">
                Aceptar
              </Button>
            </div>
          </DrawerFooter>
        </Drawer>
      </Container>
      <Container className="py-10">
        <Carousel
          loop
          pagination
          autoplay
          slidesToShow={1}
          navigation
          spacing={0}
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
        <AnimateIn className="grid gap-2 grid-cols-2 lg:grid-cols-4">
          {[...Array(6)].map((_, index) => (
            <Card key={index} shadow="xl">
              <CardHeader className="space-y-2 ">
                <Typography size="base" weight="bold">
                  Kia Cerato 2021
                </Typography>
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
                <Typography size="sm" as="p">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Typography>
              </CardContent>
              <CardFooter className="flex justify-between gap-2">
                <Button
                  color="danger"
                  variant="soft"
                  radius="md"
                  startContent={<XCircleIcon className="size-4" />}
                >
                  Rechazar
                </Button>
                <Button
                  color="success"
                  variant="soft"
                  radius="md"
                  startContent={<CheckCircleIcon className="size-4" />}
                >
                  Aceptar
                </Button>
              </CardFooter>
            </Card>
          ))}
        </AnimateIn>
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
            <Tab key="musica" title="Música">
              <p>Contenido de Música</p>
            </Tab>
            <Tab key="television" title="Televisión">
              <p>Contenido de Televisión</p>
            </Tab>
            <Tab key="deportes" title="Deportes">
              <p>Contenido de Deportes</p>
            </Tab>
          </Tabs>
        ))}
      </Container>
      <Container className="py-10 space-y-3">
        {variants.map((variant) => (
          <div key={variant} className="grid grid-cols-2 gap-3">
            {colors.map((color: ColorVariant) => (
              <Input
                key={color}
                id={color + variant}
                label="Número de Teléfono"
                name="phone"
                labelPlacement="outside"
                inputSize="md"
                color={color}
                radius="full"
                variant={variant}
                description="Ingresa tu número de teléfono"
                disabled={color === "whatsapp"}
                leftContent={<PhoneArrowDownLeftIcon className="size-4" />}
              />
            ))}
          </div>
        ))}
      </Container>
      <Container>
        <Select
          label="Número de Teléfono"
          name="phone"
          labelPlacement="outside"
          selectSize="md"
          color="primary"
          radius="full"
          variant="soft"
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
