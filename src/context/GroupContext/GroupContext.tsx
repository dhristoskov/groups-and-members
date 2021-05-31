import React, { createContext, ReactNode, useState } from 'react';

import { Group } from 'src/interfaces/group';
import { User } from 'src/interfaces/user';
import { initialGroupsData } from 'src/test-data/group-data';

interface Props {
    children: ReactNode;   
};

interface Groups {
    groups: Group[];
    deleteGroup: (id: string) => void;
    addNewGroup: ( newGroup: Group ) => void;
    addUserToGroup: (id: string, user: User ) => void;
    removeMember: ( groupId: string, memberId: string ) => void;
}

export const GroupContext = createContext<Groups>({} as Groups);


const GroupContextProvider: React.FC<Props> = ({ children }) => {

    const [ groups, setGroups ] = useState<Group[]>(initialGroupsData);

    const deleteGroup = (id: string): void => {

        const target: Group | undefined = groups.find(group => group.id === id);
        if(target && target.members.length > 0){
            return;
        }

        const newGroups = groups.filter(group => group.id !== id); 
        setGroups(newGroups);
    };

    const addNewGroup = ( newGroup: Group ): void => {
        setGroups([ newGroup, ...groups ]);
    };

    const addUserToGroup = (id: string, user: User ): void => {
        const targetGroup = groups.find(group => group.id === id );

        if( targetGroup ) {
            targetGroup.members.push(user);
        }
    };

    const removeMember = ( groupId: string, memberId: string ): void => {
        const targetGroup: Group | undefined = groups.find(group => group.id === groupId );

        if( targetGroup ){
            targetGroup.members = targetGroup.members.filter(member => member.id !== memberId)
        }
    }

    return (
        <GroupContext.Provider 
            value={{ 
                groups,
                deleteGroup,
                addNewGroup,
                addUserToGroup,
                removeMember,
            }}>
            { children }
        </GroupContext.Provider>
    )
}

export default GroupContextProvider;