import React, { Fragment, useContext, useState } from 'react';
import { GrTrash, GrUserAdd, GrUser } from 'react-icons/gr';
import { useHistory } from 'react-router-dom';

import { Group } from 'src/interfaces/group';
import GroupIcon from 'src/assets/Icons/group.png'
import { GroupContext } from 'src/context/GroupContext/GroupContext';
import { NotificationContext } from 'src/context/Notification/Notification';
import UserSelectComponent from '../UserSelectComponent/UserSelectComponent';
import Modal from 'src/components/shared-components/Modal/Modal';
import NewMembersComponent from '../NewMembersComponent/NewMembersComponent';

import './GroupItem.scss';

interface Props {
    group: Group;
}

const GroupItem: React.FC<Props> = ({ group }) => {

    const history = useHistory();
    const { showNotification } = useContext(NotificationContext); 
    const { deleteGroup } = useContext(GroupContext);
    const [ closeModal, setCloseModal ] = useState<boolean>(true);
    const [ modalContent, setModalContent ] = useState<string>('')

    const onDeleteHndler = (id: string): void => {

        if( group.members.length > 0 ){
            showNotification({message: 'You do not have right to delete the group', type: 'alert'});
        }else {
            deleteGroup(id)
            showNotification({message: 'Group was deleted', type: 'success'});
        }
    }

    const members = group.members.length === 1 ? 'Member' : 'Members'

    return(
        <Fragment>
            <div className='group'>
                <div className='group-upper' onClick={() => history.push(`/groups/${ group.id }`)}>
                    <img className='group-upper-icon' src={GroupIcon} alt='icon' />
                    <p className='group-upper-name'>{ group.name }</p>
                    <p className='group-upper-members'>{ group.members.length } { members }</p>
                </div>           
                <div className='group-buttons'>
                    <p className='group-buttons-item' onClick={() => onDeleteHndler(group.id)}>
                        <GrTrash className='group-buttons-item_icon'/>
                    </p>
                    <p className='group-buttons-item' onClick={() => {setCloseModal(false); setModalContent('existing')}}>
                        <GrUser className='group-buttons-item_icon'/>
                    </p>
                    <p className='group-buttons-item' onClick={() => {setCloseModal(false); setModalContent('new')}}>
                        <GrUserAdd className='group-buttons-item_icon'/>
                    </p>
                </div>
            </div>
            <Modal 
                closeModal={closeModal}
                setCloseModal={setCloseModal}
            >
                {
                    modalContent === 'existing'
                    ? <UserSelectComponent group={group} setCloseModal={setCloseModal}/>
                    : <NewMembersComponent group={group} setCloseModal={setCloseModal}/>
                }             
            </Modal> 
        </Fragment>
    )
}

export default GroupItem;