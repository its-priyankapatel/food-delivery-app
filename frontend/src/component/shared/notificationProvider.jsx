import React, { createContext, useContext, useState, useCallback } from "react";
import Notification from "./notification";

const NotificationContext = createContext();

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error("useNotification must be used within NotificationProvider");
    }
    return context;
};

export default function NotificationProvider({ children }) {
    const [notification, setNotification] = useState(null);
    const [visible, setVisible] = useState(false);

    const showNotification = useCallback(
        (message, type = "info", duration = 3000) => {
            setNotification({ message, type });
            setVisible(true);

            setTimeout(() => {
                setVisible(false);
            }, duration);
        },
        []
    );

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            <Notification
                message={notification?.message || ""}
                type={notification?.type}
                visible={visible}
                onClose={() => setVisible(false)}
            />
        </NotificationContext.Provider>
    );
}