"use client";

import { useState } from "react";

export default function useOpenClose() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  return { isOpen, toggle };
}
