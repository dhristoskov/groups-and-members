import React from 'react';
import { motion } from 'framer-motion';

import GroupItem from '../GroupItem/GroupItem';
import { Group } from 'src/interfaces/group';

import './GroupList.scss';

interface Props {
    groups: Group[]
}

const GroupList: React.FC<Props> = ({ groups }) => {

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
                groups.map(group => {
                    return (
                        <motion.div key={ group.id }  variants={ animatedItem }>
                            <GroupItem                               
                                group={ group } 
                            />
                        </motion.div>
                        
                    )
                })
            }
        </motion.div>
    )
}

export default GroupList;