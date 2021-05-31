import React, { Fragment, useContext, useState } from 'react';
import { GrTrash, GrGroup } from 'react-icons/gr';
import { FiUserMinus } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import { UserContext } from 'src/context/UsersContext/UserContext';
import { NotificationContext } from 'src/context/Notification/Notification';
import UserIcon from 'src/assets/Icons/user.png'
import { User } from 'src/interfaces/user';
import Modal from 'src/components/shared-components/Modal/Modal';
import JoinGroupComponent from 'src/components/UsersComponent/JoinGroupComponent/JoinGroupComponent';
import LeaveGroupComponent from '../LeaveGroupComponent/LeaveGroupComponent';

import './UserItem.scss';

interface Props {
    user: User;
}

const UserItem: React.FC<Props> = ({ user }) => {

    const history = useHistory();
    const { showNotification } = useContext(NotificationContext); 
    const { deleteUser } = useContext(UserContext);
    const [ closeModal, setCloseModal ] = useState<boolean>(true);
    const [ modalContent, setModalContent ] = useState<string>('')

    const groupText = user.userGroups.length === 1 ? 'Group' : 'Groups'

    const onDeleteHndler = (user: User): void => {

        if( user.userGroups.length > 0 ) {
            showNotification({message: 'User is still a member to group(s) ', type: 'alert'});
        }else{
            deleteUser(user.id);
            showNotification({message: `User ${ user.first_name } ${ user.last_name } was deleted`, type: 'success'});
        }   
    }

    return(
        <Fragment>
            <div className='user'>
                <div className='user-upper' onClick={() => history.push(`/users/${ user.id }`)}>
                    <img className='user-upper-icon' src={UserIcon} alt='icon' />
                    <div className='user-upper-name'>
                        <p className='user-upper-name-first'>{ user.first_name }</p>
                        <p className='user-upper-name-second'>{ user.last_name }</p>
                    </div>
                    <p className='user-groups'>Part of { user.userGroups.length } { groupText }</p>
                </div>
                <div className='user-buttons'>
                    <p className='user-buttons-item' onClick={() => onDeleteHndler(user)}>
                        <GrTrash className='user-buttons-item_icon'/>
                    </p>
                    <p className='user-buttons-item' onClick={() => {setCloseModal(false); setModalContent('join')}}>
                        <GrGroup className='user-buttons-item_icon'/>
                    </p>
                    <p className='user-buttons-item' onClick={() => {setCloseModal(false); setModalContent('leave')}}>
                        <FiUserMinus className='user-buttons-item_icon'/>
                    </p>
                </div>
            </div>
            <Modal 
                closeModal={closeModal}
                setCloseModal={setCloseModal}
            >
                {
                    modalContent === 'join'
                    ? <JoinGroupComponent user={user} setCloseModal={setCloseModal}/>
                    : <LeaveGroupComponent user={user} setCloseModal={setCloseModal}/>
                }             
            </Modal> 
        </Fragment>
    )
}

export default UserItem;