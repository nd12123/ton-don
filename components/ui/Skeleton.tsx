// components/ui/Skeleton.tsx
"use client";
import React, { CSSProperties } from "react";

export type SkeletonProps = {
  width?: string;
  height?: string;
  circle?: boolean;
  style?: CSSProperties;
} & React.HTMLAttributes<HTMLDivElement>;

const Skeleton: React.FC<SkeletonProps> = ({
  width = "100%",
  height = "1rem",
  circle = false,
  className = "",
  style,
  ...rest
}) => {
  return (
    <div
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 ${
        circle ? "rounded-full" : "rounded"
      } ${className}`}
      style={{ width, height, ...style }}
      {...rest}
    />
  );
};

export default Skeleton;
