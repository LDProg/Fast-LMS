import { create } from "zustand";

export const useConfettiStore = create((set) => ({
  inOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
