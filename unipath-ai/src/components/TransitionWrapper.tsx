import { motion } from 'motion/react';
import React from 'react';
import { TransitionType } from '../types';

interface TransitionWrapperProps {
  children: React.ReactNode;
  transitionType: TransitionType;
  screenKey: string;
  key?: React.Key;
}

export default function TransitionWrapper({ children, transitionType, screenKey }: TransitionWrapperProps) {
  if (transitionType === 'none') {
    return (
      <div className="w-full min-h-screen">
        {children}
      </div>
    );
  }

  // Define transition animations based on the transitionType
  const variants = {
    push: {
      initial: { x: '100vw', opacity: 0.8 },
      animate: { x: 0, opacity: 1 },
      exit: { x: '-100vw', opacity: 0.8 },
    },
    slide_up: {
      initial: { y: '100vh', opacity: 0.9 },
      animate: { y: 0, opacity: 1 },
      exit: { y: '-100vh', opacity: 0.9 },
    },
  };

  const selectedVariant = variants[transitionType === 'push' ? 'push' : 'slide_up'];

  return (
    <motion.div
      key={screenKey}
      initial={selectedVariant.initial}
      animate={selectedVariant.animate}
      exit={selectedVariant.exit}
      transition={{ type: 'tween', ease: 'easeOut', duration: 0.35 }}
      style={{ width: '100%', minHeight: '100vh' }}
    >
      {children}
    </motion.div>
  );
}
