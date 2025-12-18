import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function AnimatedSection({ 
  children, 
  delay = 0, 
  className = '',
  animationType = 'fadeUp', // fadeUp, slideLeft, slideRight, scale, fadeIn
  threshold = 0.1,
  once = true,
  duration = 0.6,
  damping = 20,
  stiffness = 100,
  staggerChildren = 0
}) {
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold: threshold,
  });

  // Animation variants
  const animationVariants = {
    fadeUp: {
      hidden: { opacity: 0, y: 50 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: {
          duration: duration,
          delay: delay,
          ease: "easeOut",
          staggerChildren: staggerChildren
        }
      }
    },
    slideLeft: {
      hidden: { opacity: 0, x: 100 },
      visible: { 
        opacity: 1, 
        x: 0,
        transition: {
          duration: duration,
          delay: delay,
          ease: "easeOut"
        }
      }
    },
    slideRight: {
      hidden: { opacity: 0, x: -100 },
      visible: { 
        opacity: 1, 
        x: 0,
        transition: {
          duration: duration,
          delay: delay,
          ease: "easeOut"
        }
      }
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: {
          duration: duration,
          delay: delay,
          type: "spring",
          damping: damping,
          stiffness: stiffness
        }
      }
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: {
          duration: duration,
          delay: delay,
          ease: "easeOut"
        }
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={animationVariants[animationType]}
      className={className}
    >
      {children}
    </motion.div>
  );
}
