import React, { Fragment, ReactElement, useContext, useEffect, useState } from 'react';
import { GrAdd } from 'react-icons/gr';

import { GroupContext } from 'src/context/GroupContext/GroupContext';
import { NotificationContext } from 'src/context/Notification/Notification';
import { Group } from 'src/interfaces/group';
import { User } from 'src/interfaces/user';
import { UserContext } from 'src/context/UsersContext/UserContext';

import '../../GroupsComponent/UserSelectComponent/UserSelectComponent.scss';

interface Props {
    group: Group;
    setCloseModal: ( state: boolean ) => void;
}

const NewMembersComponent: React.FC<Props> = ({ group, setCloseModal }) => {

    const { addUserToGroup } = useContext(GroupContext);
    const { users, joinNewGroup } = useContext(UserContext);
    const { showNotification } = useContext(NotificationContext); 
    const [ usersToSelect, setUsersToSelect ] = useState<User[]>([]);

    useEffect(() => {
        const usersToChooseFrom = users
        .filter(user => group.members.findIndex( member => member.id === user.id) === -1);
        setUsersToSelect(usersToChooseFrom)
    }, [ users, group ])

    const joinToGroupHandler = ( group: Group, user: User ): void => {
        addUserToGroup(group.id, user); 
        joinNewGroup(group.id, user.id);
        setCloseModal(true);
        showNotification({message: `User has join the group ${ group.name }`, type: 'success'});
    }

    let selection: ReactElement;
    if ( usersToSelect.length > 0 ) {
        selection = 
        <div className='user-dropdown' >
            {
                usersToSelect.map(user => 
                    <div className='user-dropdown-element' key={ user.id }>
                        <p className='user-dropdown-element_item'>
                            { user.first_name } { user.last_name }
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
            <p className='user-dropdown-empty'>There is not users to join the group</p>
        </div>
    }

    return(
        <Fragment>
            { selection }
        </Fragment>
    )
}

export default NewMembersComponent;