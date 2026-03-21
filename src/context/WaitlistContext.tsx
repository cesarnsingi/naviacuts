"use client";

import { createContext, useContext, useState } from "react";

interface WaitlistContextType {
  open:    boolean;
  openModal:  () => void;
  closeModal: () => void;
}

const WaitlistContext = createContext<WaitlistContextType>({
  open:       false,
  openModal:  () => {},
  closeModal: () => {},
});

export function WaitlistProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <WaitlistContext.Provider value={{ open, openModal: () => setOpen(true), closeModal: () => setOpen(false) }}>
      {children}
    </WaitlistContext.Provider>
  );
}

export function useWaitlist() {
  return useContext(WaitlistContext);
}
