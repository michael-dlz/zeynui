"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ReactNode } from "react";

export interface AnimationProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  inView?: boolean;
  loop?: boolean;
}

export const AnimateIn = ({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
  inView = true,
  loop = false,
}: AnimationProps) => {
  const { ref, inView: isInView } = useInView({
    triggerOnce: !loop, // Cambiado a false para que se active cada vez que el componente entre en la vista
  });

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={
        inView && isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
      } // Anima cada vez que está en la vista
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const FadeScale = ({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
  inView = true,
  loop = false,
}: AnimationProps) => {
  const { ref, inView: isInView } = useInView({
    triggerOnce: !loop, // Cambiado a false para que se active cada vez que el componente entre en la vista
  });

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        scale: 0.95,
      }}
      animate={
        inView && isInView
          ? { opacity: 1, scale: 1 }
          : { opacity: 0, scale: 0.95 }
      } // Anima cada vez que está en la vista
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface SlideInProps extends AnimationProps {
  direction?: "left" | "right" | "up" | "down";
}
export const SlideIn = ({
  children,
  delay = 0,
  duration = 0.5,
  direction = "left",
  className = "",
  inView = true,
  loop = false,
}: SlideInProps) => {
  const { ref, inView: isInView } = useInView({
    triggerOnce: !loop, // Cambiado a false para que se active cada vez que el componente entre en la vista
  });

  const getInitialPosition = () => {
    switch (direction) {
      case "left":
        return {
          x: -50,
          y: 0,
        };
      case "right":
        return {
          x: 50,
          y: 0,
        };
      case "up":
        return {
          x: 0,
          y: 50,
        };
      case "down":
        return {
          x: 0,
          y: -50,
        };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        ...getInitialPosition(),
      }}
      animate={
        inView && isInView
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0, ...getInitialPosition() }
      } // Anima cada vez que está en la vista
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggeredAnimation = ({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
  inView = true,
  loop = false,
}: AnimationProps) => {
  const { ref, inView: isInView } = useInView({
    triggerOnce: !loop,
  });

  // Función para calcular el retraso en función de la posición en el grid
  const calculateDelay = (index: number, cols: number) => {
    const row = Math.floor(index / cols); // Fila actual
    const col = index % cols; // Columna actual
    const diagonal = row + col; // Diagonal actual
    return diagonal * 0.15; // Retraso de 0.15 segundos por diagonal
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView && isInView ? "visible" : "hidden"} // Anima cada vez que está en la vista
      className={className}
    >
      {React.Children.map(children, (child, index) => {
        const cols = className.includes("grid-cols-2") ? 2 : 4; // Determina el número de columnas basado en la clase
        return (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 20 }, // Inicia con opacidad 0 y un desplazamiento diagonal
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  delay: calculateDelay(index, cols), // Retraso basado en la posición en el grid
                  duration,
                  ease: [0.21, 0.47, 0.32, 0.98],
                },
              },
            }}
          >
            {child}
          </motion.div>
        );
      })}
    </motion.div>
  );
};
