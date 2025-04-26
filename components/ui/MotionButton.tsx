// components/ui/MotionButton.tsx
"use client";
import { motion } from "framer-motion";
import { Button } from "./button";

// Create a motion-enhanced Button without needing to import ButtonProps
export const MotionButton = motion(Button);
