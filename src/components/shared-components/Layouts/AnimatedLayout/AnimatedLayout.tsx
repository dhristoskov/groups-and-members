import { Fragment, ReactNode, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import GlobalNotification from 'src/components/shared-components/GlobalNotification/GlobalNotification';
import { NotificationContext } from 'src/context/Notification/Notification';

import './AnimatedLayout.scss';

interface Props {
    children: ReactNode;
};


/*Add layout to animate page transition*/
const AnimatedLayout: React.FC<Props> = ({ children }) => {

    const { activeNotification } = useContext(NotificationContext);

    const routeAnimation = {
        initial: { scale: 0 },
        animate: {
            scale: 1,
            transition: {
                delay: 0.2,
                duration: 0.3
            }
        },
        exit: { 
            scale: 0,
            transition: {
                delay: 0.2,
                ease: 'easeInOut'
            }
        }
    }

    return (
        <Fragment>
            <motion.div
                className='main-wrapper'
                variants={ routeAnimation } 
                initial='initial' 
                animate='animate'
                exit='exit'
            >
                { children }
            </motion.div>
            <AnimatePresence>
                {
                    (activeNotification.message !== '' && activeNotification.type !== '' ) &&
                    <motion.div
                        initial={{ opacity: 0}}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: .5 }}
                    >
                            <GlobalNotification message={activeNotification.message} type={activeNotification.type}/>
                    </motion.div>
                }
            </AnimatePresence>
        </Fragment>
    )
}

export default AnimatedLayout;