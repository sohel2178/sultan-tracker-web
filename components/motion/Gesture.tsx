'use client';
import React from 'react';
import { motion, MotionConfig } from 'framer-motion';

function Gesture() {
  return (
    <div className="w-full h-full flex-col gap-4 flex justify-center items-center">
      <MotionConfig transition={{ duration: 0.125, ease: 'easeInOut' }}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95, rotate: 2.5 }}
          className="bg-red-500 p-4 rounded-md"
        >
          Click Me
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.85, rotate: 2.5 }}
          className="bg-blue-500 p-4 rounded-md"
        >
          Another Button
        </motion.button>
      </MotionConfig>
    </div>
  );
}

export default Gesture;
