import React, { Fragment, ReactElement, useContext } from 'react';
import { GrTrash } from 'react-icons/gr';

import { GroupContext } from 'src/context/GroupContext/GroupContext';
import { UserContext } from 'src/context/UsersContext/UserContext';
import { NotificationContext } from 'src/context/Notification/Notification';
import { Group } from 'src/interfaces/group';

import './UserSelectComponent.scss';

interface Props {
    group: Group;
    setCloseModal: ( state: boolean ) => void;
}

const UserSelectComponent: React.FC<Props> = ({ group, setCloseModal }) => {

    const { removeMember } = useContext(GroupContext);
    const { removeGroup } = useContext(UserContext);
    const { showNotification } = useContext(NotificationContext); 

    const removeUserFromGroup = ( groupId: string, memberId: string ): void => {
        removeMember(groupId, memberId); 
        removeGroup(groupId, memberId);
        setCloseModal(true);
        showNotification({message: 'User was removed from the group', type: 'success'});
    }

    let userSelected: ReactElement;
    if ( group.members.length > 0 ){
        userSelected =
        <div className='user-dropdown' >
            {
                group.members.map(member => 
                    <div className='user-dropdown-element' key={ member.id }>
                        <p className='user-dropdown-element_item'>
                            { member.first_name } { member.last_name }
                        </p>
                        <p className='user-dropdown-element_button' 
                            onClick={() => removeUserFromGroup(group.id, member.id)}>
                            <GrTrash className='user-dropdown-element_button-icon'/>
                         </p>
                    </div>
                )
            }
        </div>
    }else {
        userSelected = 
        <div className='user-dropdown' >
            <p className='user-dropdown-empty'>There is not users in the group</p>
        </div>
    }

    return(
        <Fragment>
            { userSelected }
        </Fragment>
    )
}

export default UserSelectComponent;