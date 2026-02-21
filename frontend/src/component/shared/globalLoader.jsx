import React from "react";
import { useLoader } from "../../context/loaderProvider";

export default function GlobalLoader() {
    const { state } = useLoader();

    if (!state.isOpen) return null;

    return (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/40 backdrop-blur-sm pointer-events-auto">
            <div className="bg-white/90 px-6 py-4 rounded-xl shadow-lg flex flex-col items-center gap-2">
                <div className="h-8 w-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin" />

                <p className="text-sm font-medium text-gray-800">
                    {state.message || "Loading..."}
                </p>

                {state.progress !== null && (
                    <p className="text-xs text-gray-700">{state.progress}%</p>
                )}
            </div>
        </div>
    );
}