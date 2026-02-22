"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Loader2 } from "lucide-react";

interface GlobalLoadingContextType {
    isLoading: boolean;
    startLoading: () => void;
    stopLoading: () => void;
}

const GlobalLoadingContext = createContext<GlobalLoadingContextType | undefined>(undefined);

export const GlobalLoadingProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState(false);

    const startLoading = useCallback(() => setIsLoading(true), []);
    const stopLoading = useCallback(() => setIsLoading(false), []);

    return (
        <GlobalLoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
            {children}
            {isLoading && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/50 backdrop-blur-sm">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                </div>
            )}
        </GlobalLoadingContext.Provider>
    );
};

export const useGlobalLoading = () => {
    const context = useContext(GlobalLoadingContext);
    if (!context) {
        throw new Error("useGlobalLoading must be used within a GlobalLoadingProvider");
    }
    return context;
};
