"use client";

import { useConfettiStore } from "@/hooks/confetti-hooks";
import ReactConfetti from "react-confetti";

export const Confetti = () => {
  const confetti = useConfettiStore();

  if (!confetti.isOpen) return null;
  return (
    <ReactConfetti
      className="pointer-events-none z-[100]"
      numberOfPieces={500}
      recycle={false}
      onConfettiComplete={() => {
        confetti.onClose();
      }}
    />
  );
};
