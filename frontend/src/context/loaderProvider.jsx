import React, { createContext, useContext, useState } from "react";
import GlobalLoader from "../component/shared/globalLoader";

const LoaderContext = createContext(null);

export const LoaderProvider = ({ children }) => {
    const [state, setState] = useState({
        isOpen: false,
        message: "",
        progress: null,
    });

    const showLoader = (message) => {
        setState({
            isOpen: true,
            message,
            progress: null,
        });
    };

    const updateProgress = (pct) => {
        setState((prev) => ({
            ...prev,
            progress: pct,
        }));
    };

    const hideLoader = () => {
        setState({
            isOpen: false,
            message: "",
            progress: null,
        });
    };

    return (
        <LoaderContext.Provider
            value={{ showLoader, hideLoader, updateProgress, state }}
        >
            {children}
            <GlobalLoader />
        </LoaderContext.Provider>
    );
};

export const useLoader = () => {
    const ctx = useContext(LoaderContext);
    if (!ctx) {
        throw new Error("useLoader must be used inside LoaderProvider");
    }
    return ctx;
};