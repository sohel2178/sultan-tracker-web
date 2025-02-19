'use client';
import React from 'react';
import { motion, useAnimationControls } from 'framer-motion';

function AnimationControl() {
  const controls = useAnimationControls();

  const handleClick = () => {
    controls.start('flip');
  };
  return (
    <div className="w-full h-full flex-col gap-4 flex justify-center items-center">
      <motion.button
        className="bg-red-500 p-4 rounded-md"
        onClick={handleClick}
      >
        Click Me
      </motion.button>

      <motion.div
        className="w-[150px] h-[150px] bg-black"
        variants={{ initial: { rotate: 0 }, flip: { rotate: 180 } }}
        whileHover="flip"
        animate={controls}
      ></motion.div>
    </div>
  );
}

export default AnimationControl;
