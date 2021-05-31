import { useContext, useState } from 'react';

import CreateGroup from 'src/components/shared-components/CreateGroup/CreateGroup';
import GroupList from 'src/components/GroupsComponent/GroupList/GroupList';
import Modal from 'src/components/shared-components/Modal/Modal';
import GroupForm from 'src/components/FormComponent/GroupForm/GroupForm';
import AnimatedLayout from 'src/components/shared-components/Layouts/AnimatedLayout/AnimatedLayout';
import { GroupContext } from 'src/context/GroupContext/GroupContext';
import PaginationComponent from 'src/components/shared-components/PaginationComponent/PaginationComponent';

const GroupsPage = () => {

    const { groups } = useContext(GroupContext);
    const [ closeModal, setCloseModal ] = useState<boolean>(true);
    const [ currentPage, setCurrenPage ] = useState<number>(1);
    const itemsPerPage = 12;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentGroups = groups.slice(indexOfFirstItem, indexOfLastItem);

    const onPaginationHandler = (number: number): void => {
        setCurrenPage(number);      
    };

    return(
        <AnimatedLayout>
            <Modal 
                closeModal={closeModal}
                setCloseModal={setCloseModal}
            >
                <GroupForm 
                    setCloseModal={setCloseModal}/
                >
            </Modal>          
            <div className='group-main'>
                <CreateGroup setCloseModal={setCloseModal}/>
                <div className='group-main-list'>
                    <GroupList groups={ currentGroups }/>
                </div>
                { 
                    groups.length > itemsPerPage && 
                    <PaginationComponent totalItems={groups.length}
                    itemsPerPage={itemsPerPage}
                    pagination={onPaginationHandler}/>
                }
            </div>
        </AnimatedLayout>
    )
}

export default GroupsPage;