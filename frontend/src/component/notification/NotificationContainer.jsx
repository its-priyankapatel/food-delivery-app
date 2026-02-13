import { useEffect, useState } from "react";
import { registerNotifier } from "../../utils/notification";

let idCounter = 0;

const NotificationContainer = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    registerNotifier((notification) => {
      const id = ++idCounter;

      setNotifications((prev) => [
        ...prev,
        { id, message: notification.message, visible: true },
      ]);

      // start fade-out after duration
      setTimeout(() => {
        setNotifications((prev) =>
          prev.map((n) =>
            n.id === id ? { ...n, visible: false } : n
          )
        );
      }, notification.duration || 3000);

      // remove after fade - out completes
      setTimeout(() => {
        setNotifications((prev) =>
          prev.filter((n) => n.id !== id)
        );
      }, (notification.duration || 3000) + 1000);
    });
  }, []);

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-9999 flex flex-col gap-2">
      {notifications.map((n) => (
        <div
          key={n.id}
          className={`
            transition-all duration-1000 ease-in-out
            ${n.visible ? "opacity-100" : "opacity-0"}
            min-h-8 min-w-16 py-2 px-4
            rounded-md bg-zinc-900 text-white
            font-poppins md:text-sm
          `}
        >
          {n.message}
        </div>
      ))}
    </div>
  );
};

export default NotificationContainer;
