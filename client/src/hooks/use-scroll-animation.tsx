import { useEffect } from "react";
import { useAnimation, AnimationControls } from "framer-motion";
import { useInView } from "react-intersection-observer";

export type ScrollAnimationVariants = {
  hidden: Record<string, any>;
  visible: Record<string, any>;
};

// Default animation variants
export const fadeInUpVariant: ScrollAnimationVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6,
      ease: "easeOut"
    } 
  }
};

export const fadeInVariant: ScrollAnimationVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      duration: 0.5,
      ease: "easeOut"
    } 
  }
};

export const slideInLeftVariant: ScrollAnimationVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 0.6,
      ease: "easeOut"
    } 
  }
};

export const slideInRightVariant: ScrollAnimationVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 0.6,
      ease: "easeOut"
    } 
  }
};

export const scaleInVariant: ScrollAnimationVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      duration: 0.5,
      ease: "easeOut"
    } 
  }
};

// Hook for controlling animations based on scroll position
export function useScrollAnimation(
  threshold: number = 0.2,
  delay: number = 0
): [AnimationControls, { ref: (node?: Element | null) => void }] {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold });

  useEffect(() => {
    if (inView) {
      // Element is in view, trigger animation after optional delay
      const timeout = setTimeout(() => {
        controls.start("visible");
      }, delay);
      
      return () => clearTimeout(timeout);
    }
  }, [controls, inView, delay]);

  return [controls, { ref }];
}

// Hook for creating staggered animations for multiple child elements
export function useStaggerAnimation(
  threshold: number = 0.1,
  staggerDelay: number = 0.1,
  initialDelay: number = 0
): [AnimationControls, { ref: (node?: Element | null) => void }, (index: number) => { delay: number }] {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Function to create staggered delays for child elements
  const getStaggerDelay = (index: number) => ({
    delay: initialDelay + index * staggerDelay
  });

  return [controls, { ref }, getStaggerDelay];
}