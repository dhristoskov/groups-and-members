import React from 'react';
import { motion } from 'framer-motion';

import Navigation from '../Navigation/Navigation';

import './Header.scss';

const Header = () => {
    return (
        <motion.div 
            className='main-header'
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: 'easeInOut', duration: .8 }}
        >
           <h3 className='main-header-title'>InterNations</h3> 
           <Navigation />
        </motion.div>
    )
}

export default Header;