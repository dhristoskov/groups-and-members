import { Fragment, useState } from 'react';

import UserForm from 'src/components/FormComponent/UserFrom/UserForm';
import CreateUser from 'src/components/shared-components/CreateUser/CreateUser';
import AnimatedLayout from 'src/components/shared-components/Layouts/AnimatedLayout/AnimatedLayout';
import Modal from 'src/components/shared-components/Modal/Modal';
import PaginationComponent from 'src/components/shared-components/PaginationComponent/PaginationComponent';
import SearchComponent from 'src/components/shared-components/SearchComponent/SearchComponent';
import UserList from 'src/components/UsersComponent/UserList/UserList';
import { User } from 'src/interfaces/user';

const UsersPage = () => {

    const [ userToShow, setUsersToShow ] = useState<User[]>([])
    const [ closeModal, setCloseModal ] = useState<boolean>(true);
    const [ currentPage, setCurrenPage ] = useState<number>(1);
    const itemsPerPage = 12;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = userToShow.slice(indexOfFirstItem, indexOfLastItem);

    const onPaginationHandler = (number: number): void => {
        setCurrenPage(number);      
    };

    return(
        <Fragment>
            <SearchComponent setUsersToShow={setUsersToShow} />
            <AnimatedLayout>
                <Modal 
                    closeModal={closeModal}
                    setCloseModal={setCloseModal}
                >
                    <UserForm 
                        setCloseModal={setCloseModal}/
                    >
                </Modal>  
                <div className='user-main'>
                    <CreateUser setCloseModal={setCloseModal}/>
                    <div className='user-main-list'>
                        <UserList users={currentUsers}/>
                    </div>
                    { 
                        userToShow.length > itemsPerPage && 
                        <PaginationComponent totalItems={userToShow.length}
                        itemsPerPage={itemsPerPage}
                        pagination={onPaginationHandler}/>
                    }
                </div>
            </AnimatedLayout>
        </Fragment>
    )
}

export default UsersPage;