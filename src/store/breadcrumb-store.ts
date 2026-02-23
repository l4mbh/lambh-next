import { create } from "zustand";

interface BreadcrumbState {
    customLabels: Record<string, string>;
    setCustomLabel: (pathSegment: string, label: string) => void;
    clearCustomLabels: () => void;
}

export const useBreadcrumbStore = create<BreadcrumbState>((set) => ({
    customLabels: {},
    setCustomLabel: (pathSegment, label) =>
        set((state) => ({
            customLabels: { ...state.customLabels, [pathSegment]: label },
        })),
    clearCustomLabels: () => set({ customLabels: {} }),
}));
