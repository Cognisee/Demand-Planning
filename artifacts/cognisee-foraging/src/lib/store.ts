import { create } from "zustand";

export type ProvenanceInfo = {
  sourceType: string;
  contributorRole: string;
  context: string;
  jurisdiction: string;
  rights: string;
  timestamp: string;
} | null;

interface CogniseeState {
  strategy: string | null;
  setStrategy: (strategy: string) => void;
  provenance: ProvenanceInfo;
  setProvenance: (info: ProvenanceInfo) => void;
  hasSeenOnboarding: boolean;
  setHasSeenOnboarding: (val: boolean) => void;
}

export const useStore = create<CogniseeState>((set) => ({
  strategy: null,
  setStrategy: (strategy) => set({ strategy }),
  provenance: null,
  setProvenance: (provenance) => set({ provenance }),
  hasSeenOnboarding: localStorage.getItem("cognisee_onboarding") === "true",
  setHasSeenOnboarding: (val) => {
    localStorage.setItem("cognisee_onboarding", val ? "true" : "false");
    set({ hasSeenOnboarding: val });
  }
}));
