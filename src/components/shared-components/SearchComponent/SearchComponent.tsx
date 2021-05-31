import { useEffect, useState, ChangeEvent, useContext } from 'react';
import { GrSearch } from 'react-icons/gr';

import { UserContext } from 'src/context/UsersContext/UserContext';
import { User } from 'src/interfaces/user';

import './SearchComponent.scss'

interface Props {
    setUsersToShow: (state: User[]) => void;
}

const SearchComponent: React.FC<Props> = ({ setUsersToShow }) => {

    const { users } = useContext(UserContext);
    const [ filtered, setFiltered ] = useState<string>('');

    const onHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setFiltered(e.target.value);
    };

    useEffect(() => {
        const usersCopy = users.slice()
        const results = usersCopy.filter(user =>
            user.first_name.toLowerCase().includes(filtered.toLowerCase()) ||
            user.last_name.toLowerCase().includes(filtered.toLowerCase())
          );
          setUsersToShow(results);
    }, [ filtered, users, setUsersToShow ])

    return (
        <div className='search-user-wrapper'>
            <form className='search-user-wrapper_form'>
                <GrSearch className='search-user-wrapper_form-icon' />
                <input className='search-user-wrapper_form-input' type="text" 
                                placeholder='Find User' name='filtered'
                                value={filtered} onChange={onHandleChange}/>
            </form>
        </div>
    )
}

export default SearchComponent