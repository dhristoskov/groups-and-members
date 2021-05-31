import { createContext, useState, ReactNode, useEffect, useCallback } from 'react';

interface Props {
    children: ReactNode;
};

interface NotificationMessage {
    message: string;
    type: string;
}

interface Notification {
    activeNotification: NotificationMessage;
    showNotification: (notification: NotificationMessage) => void;
}

export const NotificationContext = createContext<Notification>({} as Notification)

const NotificationCtxProvider: React.FC<Props> = ({ children }) => {

    const [ activeNotification, setActiveNotification ] = useState<NotificationMessage>({ message: '', type: ''});

    const showNotification = useCallback((notification: NotificationMessage) => {
        setActiveNotification(notification)
    }, []);

    useEffect(() => {
        if(activeNotification){
            const timer = setTimeout(() => {
                setActiveNotification({ message: '', type: ''});
            }, 3500);

            return () => {
                clearTimeout(timer);
            }
        }
    }, [activeNotification]);

    return (
        <NotificationContext.Provider 
        value={{
            activeNotification,
            showNotification
        }}>
            { children }
        </NotificationContext.Provider>
    )
}

export default NotificationCtxProvider

