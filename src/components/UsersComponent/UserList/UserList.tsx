import React from 'react';
import { motion } from 'framer-motion';

import UserItem from '../UserItem/UserItem';
import { User } from 'src/interfaces/user';

import '../../GroupsComponent/GroupList/GroupList.scss';

interface Props {
    users: User[]
}


const UserList: React.FC<Props> = ({ users }) => {

    /*Stagger animation the 
    section appear element by element*/
    const container = {
        hidden: { 
            opacity: 1, 
            scale: 0 
        },
        visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.4
        }
        }
    };
    
    const animatedItem = {
        hidden: { 
            y: 20, 
            opacity: 0 
        },
        visible: {
        y: 0,
        opacity: 1
        }
    };

    return(
        <motion.div 
            className='list-wrapper'
            variants={ container }
            initial="hidden"
            animate='visible'
        >
            {
                users.map(user => {
                    return (
                        <motion.div key={ user.id }  variants={ animatedItem }>
                            <UserItem user={ user }/>
                        </motion.div>
                        
                    )
                })
            }
        </motion.div>
    )
}

export default UserList;