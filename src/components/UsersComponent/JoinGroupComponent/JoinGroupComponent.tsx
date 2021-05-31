import React, { Fragment, ReactElement, useContext, useEffect, useState } from 'react';
import { GrAdd } from 'react-icons/gr';

import { GroupContext } from 'src/context/GroupContext/GroupContext';
import { NotificationContext } from 'src/context/Notification/Notification';
import { Group } from 'src/interfaces/group';
import { User } from 'src/interfaces/user';
import { UserContext } from 'src/context/UsersContext/UserContext';

import '../../GroupsComponent/UserSelectComponent/UserSelectComponent.scss';

interface Props {
    user: User;
    setCloseModal: ( state: boolean ) => void;
}

const JoinGroupComponent: React.FC<Props> = ({ user, setCloseModal }) => {


    const { groups, addUserToGroup } = useContext(GroupContext);
    const { joinNewGroup } = useContext(UserContext);
    const { showNotification } = useContext(NotificationContext); 
    const [ groupsToSelect, setGroupsToSelect ] = useState<Group[]>([])

    useEffect(() => {
        const groupsToChooseFrom = groups.filter(group => !user.userGroups.includes(group.id));
        setGroupsToSelect(groupsToChooseFrom)
    }, [ groups, user ])

    const joinToGroupHandler = ( group: Group, user: User ): void => {
        addUserToGroup(group.id, user); 
        joinNewGroup(group.id, user.id);
        setCloseModal(true);
        showNotification({message: `User has join the group ${ group.name }`, type: 'success'});
    }

    let selection: ReactElement;
    if ( groupsToSelect.length > 0 ) {
        selection = 
        <div className='user-dropdown' >
            {
                groupsToSelect.map(group => 
                    <div className='user-dropdown-element' key={ group.id }>
                        <p className='user-dropdown-element_item'>
                            { group.name }
                        </p>
                        <p className='user-dropdown-element_button' 
                            onClick={() => joinToGroupHandler( group, user )}>
                            <GrAdd className='user-dropdown-element_button-icon'/>
                        </p>
                    </div>
                )
            }
        </div>
    }else {
        selection = 
        <div className='user-dropdown' >
            <p className='user-dropdown-empty'>There is not group to join</p>
        </div>
    }

    return(
        <Fragment>
            { selection }
        </Fragment>
    )
}

export default JoinGroupComponent;