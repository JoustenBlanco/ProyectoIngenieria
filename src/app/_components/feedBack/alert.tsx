import React, { useEffect, useState, ReactNode } from 'react';

type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertButton {
    text: string;
    onClick: () => void;
    color?: string;
}

interface AlertProps {
    type?: AlertType;
    message: string;
    onClose?: () => void;
    show?: boolean;
    buttons?: AlertButton[];
    children?: ReactNode;
}

const typeStyles: Record<AlertType, string> = {
    success: 'border-green-500',
    error: 'border-red-500',
    warning: 'border-yellow-500',
    info: 'border-blue-500',
};

const typePulse: Record<AlertType, string> = {
    success: 'animate-pulse-green',
    error: 'animate-pulse-red',
    warning: 'animate-pulse-yellow',
    info: 'animate-pulse-blue',
};

const typeButtonColor: Record<AlertType, string> = {
    success: 'bg-green-600 text-white hover:bg-green-700',
    error: 'bg-red-600 text-white hover:bg-red-700',
    warning: 'bg-yellow-500 text-white hover:bg-yellow-600',
    info: 'bg-blue-600 text-white hover:bg-blue-700',
};

export const Alert: React.FC<AlertProps> = ({
    type = 'info',
    message,
    onClose,
    show = true,
    buttons,
    children,
}) => {
    const [visible, setVisible] = useState(show);

    useEffect(() => {
        if (show) setVisible(true);
        else {
            const timeout = setTimeout(() => setVisible(false), 200);
            return () => clearTimeout(timeout);
        }
    }, [show]);

    if (!visible && !show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 transition-opacity duration-200">
            <div
                className={`
                    min-w-[320px] max-w-md w-full
                    rounded-lg shadow-lg border-l-8
                    ${typeStyles[type]} ${typePulse[type]}
                    transition-all duration-200
                    scale-100 opacity-100
                    bg-white dark:bg-gray-900
                `}
                role="alert"
            >
                <div className="flex flex-col p-6">
                    <div className="flex justify-between items-start">
                        <span className="text-base font-semibold text-gray-900 dark:text-gray-100">{message}</span>
                    </div>
                    {children && <div className="mt-2">{children}</div>}
                    <div className="flex justify-end gap-2 mt-6">
                        {buttons &&
                            buttons.map((btn, idx) => (
                                <button
                                    key={idx}
                                    onClick={btn.onClick}
                                    className={`
                                    px-4 py-2 rounded font-semibold transition
                                    ${
                                        btn.color === 'red'
                                            ? 'bg-red-600 text-white hover:bg-red-700'
                                            : btn.color === 'green'
                                            ? 'bg-green-600 text-white hover:bg-green-700'
                                            : btn.color === 'gray'
                                            ? 'bg-gray-400 text-white hover:bg-gray-500'
                                            : 'bg-blue-600 text-white hover:bg-blue-700'
                                    }
                                `}
                                >
                                    {btn.text}
                                </button>
                            ))}
                        {!buttons && onClose && (
                            <button
                                onClick={onClose}
                                className={`px-4 py-2 rounded font-semibold transition ${typeButtonColor[type]}`}
                            >
                                Aceptar
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Alert;