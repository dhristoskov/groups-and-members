import { useState } from 'react';
import { GrGroup, GrAdd } from 'react-icons/gr';
import { motion } from 'framer-motion';

import './CreateGroup.scss';

interface Props {
    setCloseModal: (state: boolean) => void;
};

const CreateGroup: React.FC<Props> = ({ setCloseModal }) => {

    /*On group hover div*/
    const [ groupHover, setGroupHover ] = useState<boolean>(false);

    return(
        <motion.div 
            className='create-group'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: .5,  duration: 1 }}}
            onClick={() => setCloseModal(false)}
            onMouseEnter={() => setGroupHover(true)}
            onMouseLeave={() => setGroupHover(false)}
        >
            <p className='create-group-wrapper'>
                {
                    groupHover
                    ? <GrAdd className='create-group-wrapper_icon'/>
                    : <GrGroup className='create-group-wrapper_icon'/>
                }
            </p>
            <p className='create-group-title'>Create new group</p> 
        </motion.div>
    )
}

export default CreateGroup;