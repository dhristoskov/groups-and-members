import { useState } from 'react';
import { GrUserAdd, GrAdd } from 'react-icons/gr';
import { motion } from 'framer-motion';

import './CreateUser.scss';

interface Props {
    setCloseModal: (state: boolean) => void;
};

const CreateUser: React.FC<Props> = ({ setCloseModal }) => {

    /*On user hover div*/
    const [ userHover, setUserHover ] = useState<boolean>(false);

    return(
        <motion.div 
            className='create-user'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: .5,  duration: 1 }}}
            onClick={() => setCloseModal(false)}
            onMouseEnter={() => setUserHover(true)}
            onMouseLeave={() => setUserHover(false)}
        >
            <p className='create-user-wrapper'>
                {
                    userHover
                    ? <GrAdd className='create-user-wrapper_icon'/>
                    : <GrUserAdd className='create-user-wrapper_icon'/>
                }
            </p>
            <p className='create-user-title'>Create new user</p> 
        </motion.div>
    )
}

export default CreateUser;