import React, { ReactNode } from 'react';

import GroupContextProvider from 'src/context/GroupContext/GroupContext';
import NotificationCtxProvider from 'src/context/Notification/Notification';
import UserContextProvider from 'src/context/UsersContext/UserContext'

interface Props {
    children: ReactNode;   
};

const ContextLayout: React.FC<Props> = ({ children }) => {

    return (    
        <GroupContextProvider>
            <UserContextProvider>
                <NotificationCtxProvider>
                    { children }    
                </NotificationCtxProvider>
            </UserContextProvider>    
        </GroupContextProvider>
    )
} 

export default ContextLayout;