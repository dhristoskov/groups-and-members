import React, { createContext, ReactNode, useState } from 'react';

import { User } from 'src/interfaces/user';
import { initialUsersData } from 'src/test-data/user-data';

interface Props {
    children: ReactNode;   
};

interface Users {
    users: User[];
    deleteUser: (id: string) => void;
    addNewUser: ( newUser: User ) => void;
    removeGroup: ( groupId: string, memberId: string ) => void;
    joinNewGroup: ( groupId: string, memberId: string ) => void;
}

export const UserContext = createContext<Users>({} as Users);


const UserContextProvider: React.FC<Props> = ({ children }) => {

    const [ users, setUser ] = useState<User[]>(initialUsersData);

    const deleteUser = (id: string): void => {
        const newUser = users.filter(user => user.id !== id);
        setUser(newUser);
    };

    const addNewUser = ( newUser: User ): void => {
        setUser([ newUser, ...users ]);
    };

    const joinNewGroup = (groupId: string, memberId: string): void => {
        const targetUser: User | undefined = users.find(user => user.id === memberId );

        if( targetUser ) {
            targetUser.userGroups.push(groupId);
        }
    }

    const removeGroup = ( groupId: string, memberId: string ):void => {
        const targetUser: User | undefined = users.find(user => user.id === memberId );

        if( targetUser ){
            targetUser.userGroups = targetUser.userGroups.filter(item => item !== groupId );
            
            /*Remove user if has no active groups*/
            if ( targetUser.userGroups.length <= 0) {
                const newUsers: User[] = users.filter(user => user.id !== memberId)
                setUser(newUsers);
            }
        }
    }

    return (
        <UserContext.Provider 
            value={{ 
                users,
                deleteUser,
                addNewUser,
                removeGroup,
                joinNewGroup
            }}>
            { children }
        </UserContext.Provider>
    )
}

export default UserContextProvider;