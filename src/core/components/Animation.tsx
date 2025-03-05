"use client"

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
}

export const AnimateIn = ({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
  inView = true,
}: AnimationProps) => {
  const { ref, inView: isInView } = useInView({
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={inView && isInView ? { opacity: 1, y: 0 } : {}} // Solo anima si está en la vista
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

export const FadeScale: React.FC<AnimationProps> = ({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
  inView = true,
}) => {
  const { ref, inView: isInView } = useInView({
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        scale: 0.95,
      }}
      animate={inView && isInView ? { opacity: 1, scale: 1 } : {}} // Solo anima si está en la vista
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

export const RevealAnimation: React.FC<AnimationProps> = ({
  children,
  delay = 0,
  duration = 0.7,
  className = "",
  inView = true,
}) => {
  const { ref, inView: isInView } = useInView({
    triggerOnce: true,
  });

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={inView && isInView ? { opacity: 1 } : {}} // Solo anima si está en la vista
        transition={{
          duration: duration * 0.5,
          delay,
        }}
      >
        {children}
      </motion.div>
      <motion.div
        className="absolute inset-0 bg-white"
        initial={{
          scaleX: 1,
        }}
        animate={inView && isInView ? { scaleX: 0 } : {}} // Solo anima si está en la vista
        transition={{
          duration,
          delay,
          ease: [0.645, 0.045, 0.355, 1],
        }}
        style={{
          originX: 0,
        }}
      />
    </div>
  );
};

interface SlideInProps extends AnimationProps {
  direction?: "left" | "right" | "up" | "down";
}
export const SlideIn: React.FC<SlideInProps> = ({
  children,
  delay = 0,
  duration = 0.5,
  direction = "left",
  className = "",
  inView = true,
}) => {
  const { ref, inView: isInView } = useInView({
    triggerOnce: true,
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
      animate={inView && isInView ? { opacity: 1, x: 0, y: 0 } : {}} // Solo anima si está en la vista
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
