'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';
import { Button } from '../ui/button';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  title: string;
}

function ExpandCollapseWrapper({ title, children }: Props) {
  const [visible, setSevible] = useState(false);
  return (
    <MotionConfig transition={{ duration: 0.3, type: 'spring', damping: 10 }}>
      <motion.div className="w-full" layout>
        <Card className="w-full p-0">
          <CardHeader>
            <CardTitle>
              <motion.div layout className="flex justify-between items-center">
                <span>{title}</span>
                <Button variant="outline" onClick={() => setSevible(!visible)}>
                  {visible ? (
                    <FaChevronUp className="text-2xl" />
                  ) : (
                    <FaChevronDown className="text-2xl" />
                  )}
                </Button>
              </motion.div>
            </CardTitle>
          </CardHeader>
          {visible && (
            <CardContent>
              <AnimatePresence>{children}</AnimatePresence>
            </CardContent>
          )}
        </Card>
      </motion.div>
    </MotionConfig>
  );
}

export default ExpandCollapseWrapper;
