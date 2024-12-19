"use client";
import React from "react";

interface LoadingProps {
  size?: "xs" | "sm" | "md" | "lg";
}

function Loading({ size }: LoadingProps) {
  return (
    <div
      className={`loading loading-ring loading-${
        size ? size : "md"
      } text-center mx-auto`}
    ></div>
  );
}

export default Loading;
