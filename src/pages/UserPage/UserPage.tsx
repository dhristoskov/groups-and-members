import { useContext, useEffect, useState } from 'react';
import { useHistory, useParams} from 'react-router-dom';

import AnimatedLayout from 'src/components/shared-components/Layouts/AnimatedLayout/AnimatedLayout';
import { GroupContext } from 'src/context/GroupContext/GroupContext';
import { UserContext } from 'src/context/UsersContext/UserContext';
import { Group } from 'src/interfaces/group';
import { User } from 'src/interfaces/user';

import '../GroupPage/GroupPage.scss';

interface Params {
    id: string;
};

const GroupPage = () => {

    const { users } = useContext(UserContext);
    const { groups } = useContext(GroupContext);
    const [ selectedUser, setSelectedUser] = useState<User>()
    const [ selectedGroups, setSelectedGroups ] = useState<Group[]>([])
    const { id }= useParams<Params>();
    const history = useHistory();

    useEffect(() => {
        const selected: any = users.find(user => user.id === id);
        
        if(selected){
            setSelectedUser(selected);
            const userGroups = groups.filter(group => selected.userGroups.includes(group.id));

            if( userGroups ){
                setSelectedGroups(userGroups);
            }
        };

    }, [ users, groups, id ])

    return(
        <AnimatedLayout>      
            {
                selectedUser && 
                <div className='group-element'>
                    <div className='group-element-head'>
                        <p className='group-element-head-title'>{ selectedUser.first_name } { selectedUser.last_name }</p>
                        <p className='group-element-head-context'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
                                deserunt mollit anim id est laborum
                        </p>
                    </div>
                    <div className='group-element-members'>
                        <p className='group-element-members_title'>Joined Groups:</p>
                        {
                            selectedGroups.map((group: Group) =>
                            (
                                <p className='group-element-members_item' 
                                onClick={() => history.push(`/groups/${group.id}`)}
                                key={group.id}> 
                                    { group.name }
                                </p>                              
                            ))
                        }
                    </div>
                </div>
            }   
        </AnimatedLayout>
    )
}

export default GroupPage;