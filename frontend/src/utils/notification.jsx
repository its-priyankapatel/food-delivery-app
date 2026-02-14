let notifyHandler = null;

export const registerNotifier = (handler) => {
    notifyHandler = handler;
};

export const notify = (message, duration = 3000) => {
    if (!notifyHandler) return;

    notifyHandler({
        message,
        duration,
    });
};
