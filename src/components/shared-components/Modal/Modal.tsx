import { Fragment, ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import Overlay from '../Overlay/Overlay';

import './Modal.scss';

interface Props {
    children: ReactNode;
    closeModal: boolean;
    setCloseModal: (state: boolean) => void;
};

const Modal: React.FC<Props> = ({ children, setCloseModal, closeModal }) => {

    /*Modal fade in and fade out animation*/
    const variants = {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: {
                duration: 1
            }
        },
        exit: { 
            opacity: 0,
            transition: {
                delay: 0.5
            }
        }
    }

    return(
        <AnimatePresence>
        {
            !closeModal &&
            <Fragment>
                <Overlay setCloseModal={setCloseModal}/>
                <motion.div 
                    className='modal-wrapper' 
                    variants={variants}
                    initial='initial'
                    animate='animate'
                    exit='exit'
                    >
                    { children }
                </motion.div>
            </Fragment>
        }
        </AnimatePresence>
    )
}

export default Modal