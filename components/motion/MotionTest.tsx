'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function MotionTest() {
  const [visible, setVisible] = useState(false);
  return (
    <div className="w-[700px] h-[500px] bg-white relative">
      <motion.button
        className="bg-purple-400 size-8 rounded-full absolute right-2 bottom-2"
        onClick={() => setVisible(!visible)}
        layout
      >
        Click Me
      </motion.button>

      <AnimatePresence mode="popLayout">
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0, rotateY: 0 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateY: 180 }}
            exit={{ opacity: 0, y: 100, scale: 0, rotateY: 0 }}
            transition={{ duration: 1, type: 'spring' }}
            className="w-[400px] p-4 bg-gray-900 absolute right-2 bottom-12 overflow-hidden"
          >
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
              amet recusandae quibusdam sint molestiae. Quam molestias
              consectetur, est sed placeat sequi delectus eum consequuntur
              possimus in officia ea tenetur ipsa.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
              amet recusandae quibusdam sint molestiae. Quam molestias
              consectetur, est sed placeat sequi delectus eum consequuntur
              possimus in officia ea tenetur ipsa.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
              amet recusandae quibusdam sint molestiae. Quam molestias
              consectetur, est sed placeat sequi delectus eum consequuntur
              possimus in officia ea tenetur ipsa.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MotionTest;
