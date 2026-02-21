import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Info, X } from "lucide-react";
import { useEffect, useState } from "react";

const icons = {
    success: <CheckCircle className="text-green-500" size={22} />,
    error: <XCircle className="text-red-500" size={22} />,
    info: <Info className="text-blue-500" size={22} />,
};

export default function Notification({
    message,
    type = "info",
    visible,
    onClose,
    duration = 3000,
}) {
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        if (!visible) return;

        setProgress(100);

        const interval = 30;
        const decrement = 100 / (duration / interval);

        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev <= 0) {
                    clearInterval(timer);
                    onClose();
                    return 0;
                }
                return prev - decrement;
            });
        }, interval);

        return () => clearInterval(timer);
    }, [visible, duration, onClose]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 40 }}
                    transition={{ duration: 0.3 }}
                    className="fixed bottom-8 left-1/2 z-50 flex min-w-75 max-w-125 -translate-x-1/2 flex-col rounded-xl bg-gray-800 text-white shadow-lg overflow-hidden"
                >
                    <div className="flex items-center gap-3 px-5 py-3">
                        {icons[type]}
                        <p className="flex-1 text-sm font-medium leading-snug wrap-break-word">
                            {message}
                        </p>
                        <button
                            onClick={onClose}
                            className="ml-2 text-gray-400 hover:text-white transition-colors"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    <div className="h-1 w-full bg-gray-700">
                        <motion.div
                            initial={{ width: "100%" }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.03, ease: "linear" }}
                            className={`h-1 rounded-full ${type === "success"
                                ? "bg-green-500"
                                : type === "error"
                                    ? "bg-red-500"
                                    : "bg-blue-500"
                                }`}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}