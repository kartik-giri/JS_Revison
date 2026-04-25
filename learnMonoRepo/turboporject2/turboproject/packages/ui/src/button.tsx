"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  method?: ()=>{};
}

export const Button = ({ children, className, method }: ButtonProps) => {
  return (
    <button
      className={className}
      onClick={method}
    >
      {children}
    </button>
  );
};
