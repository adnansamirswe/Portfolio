'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function GradientBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 bg-gradient-radial from-green-500/10 via-transparent to-transparent"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(0, 255, 157, 0.15), transparent 50%)',
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
    </div>
  );
}
