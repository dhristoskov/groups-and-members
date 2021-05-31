import { useContext, useEffect, useState } from 'react';
import { useHistory, useParams} from 'react-router-dom';

import AnimatedLayout from 'src/components/shared-components/Layouts/AnimatedLayout/AnimatedLayout';
import { GroupContext } from 'src/context/GroupContext/GroupContext';
import { Group } from 'src/interfaces/group';
import { User } from 'src/interfaces/user';

import './GroupPage.scss';

interface Params {
    id: string;
};

const GroupPage = () => {

    const { groups } = useContext(GroupContext);
    const [ selectedGroup, setSelectedGroup ] = useState<Group>()
    const { id }= useParams<Params>();
    const history = useHistory();

    useEffect(() => {
        const selected: any = groups.find(group => group.id === id);

        if(selected){
            setSelectedGroup(selected);
        };

    }, [ groups, id ])

    return(
        <AnimatedLayout>      
            {
                selectedGroup && 
                <div className='group-element'>
                    <div className='group-element-head'>
                        <p className='group-element-head-title'>{ selectedGroup.name }</p>
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
                        <p className='group-element-members_title'>Group Members:</p>
                        {
                            selectedGroup.members.map((member: User) =>
                            (
                                <p className='group-element-members_item' 
                                onClick={() => history.push(`/users/${member.id}`)}
                                key={member.id}> 
                                    { member.first_name } { member.last_name } 
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