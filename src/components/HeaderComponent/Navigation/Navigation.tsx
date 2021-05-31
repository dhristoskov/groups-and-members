import React from 'react';
import { NavLink } from 'react-router-dom';

import './Navigation.scss';

const Navigation = () => {

    return(
        <div className='navigation'>
            <div className='navigation-wrapper'>
                <NavLink exact to='/groups' className='navigation-wrapper-link'>Groups</NavLink>
                <NavLink exact to='/users' className='navigation-wrapper-link'>Users</NavLink>
            </div>  
        </div>
    )
}

export default Navigation;