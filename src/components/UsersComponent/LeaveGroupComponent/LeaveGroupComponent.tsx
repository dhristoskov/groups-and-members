import React, { useContext, useEffect, useState } from 'react';
import { FiUserMinus } from 'react-icons/fi';

import { GroupContext } from 'src/context/GroupContext/GroupContext';
import { UserContext } from 'src/context/UsersContext/UserContext';
import { NotificationContext } from 'src/context/Notification/Notification';
import { User } from 'src/interfaces/user';
import { Group } from 'src/interfaces/group';

import '../../GroupsComponent/UserSelectComponent/UserSelectComponent.scss';

interface Props {
    user: User;
    setCloseModal: ( state: boolean ) => void;
}

const LeaveGroupComponent: React.FC<Props> = ({ user, setCloseModal }) => {

    const { removeMember, groups } = useContext(GroupContext);
    const { removeGroup } = useContext(UserContext);
    const { showNotification } = useContext(NotificationContext);
    const [ groupsToSelect, setGroupsToSelect ] = useState<Group[]>([]) 

    useEffect(() => {
        const groupsToChooseFrom = groups.filter(group => user.userGroups.includes(group.id));
        setGroupsToSelect(groupsToChooseFrom)
    }, [ groups, user ]);

    const removeUserFromGroup = ( group: Group, user: User ): void => {
        removeMember(group.id, user.id); 
        removeGroup(group.id, user.id);
        setCloseModal(true);
        showNotification({message: 'User was removed from the group', type: 'success'});
    }

    return(
        <div className='user-dropdown' >
            {
                groupsToSelect.map(group => 
                    <div className='user-dropdown-element' key={ group.id }>
                        <p className='user-dropdown-element_item'>
                            { group.name }
                        </p>
                        <p className='user-dropdown-element_button' 
                            onClick={() => removeUserFromGroup(group, user)}>
                            <FiUserMinus className='user-dropdown-element_button-icon'/>
                         </p>
                    </div>
                )
            }
        </div>
    )
}

export default LeaveGroupComponent;