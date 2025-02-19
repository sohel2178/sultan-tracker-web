import AnimationControl from '@/components/motion/AnimationControl';
import Gesture from '@/components/motion/Gesture';
import MotionTest from '@/components/motion/MotionTest';
import React from 'react';

function FramerTest() {
  return (
    <div className="w-full h-[100vh] bg-red-300 flex justify-center items-center">
      <AnimationControl />
    </div>
  );
}

export default FramerTest;
