import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { NotificationContext } from 'src/context/Notification/Notification';
import GroupSelectComponent from '../GroupSelectComponent/GroupSelectComponent';
import { Group } from 'src/interfaces/group';
import { User } from 'src/interfaces/user';
import { UserContext } from 'src/context/UsersContext/UserContext';
import { GroupContext } from 'src/context/GroupContext/GroupContext';
import { checkErrors, emptyValidation, ValidateInput } from 'src/utils/formValidator';

import './UserForm.scss';

interface Props {
    setCloseModal: ( state: boolean ) => void;
}

const UserForm: React.FC<Props> = ({ setCloseModal }) => {

    const { addNewUser } = useContext(UserContext);
    const { addUserToGroup } = useContext(GroupContext);
    const [ selectedGroup, setSelectedGroup ] = useState<Group>({} as Group);
    const { showNotification } = useContext(NotificationContext);
    const [ errors, setErrors ] = useState<any>({});
    const [ createUser, setCreateUser ] = useState<any>({
        id: uuidv4(),
        first_name: '',
        last_name: ''
     });

    const { first_name, last_name } = createUser;

    const onHandleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>): void => {
        const { name, value } = e.target;

         /*Check for input errors*/
         let error = ValidateInput( name, value );
         setErrors(error);
        setCreateUser({...createUser, [name]: value})
    };

    const onHandleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault(); 

        if(!checkErrors(errors)){
            showNotification({ message: 'Inccorect data', type: 'alert' });
        }else if(emptyValidation(createUser)){
            showNotification({ message: 'Form could not be empty or with empty fields', type: 'alert' });
        }else if( !selectedGroup.id ){
            showNotification({ message: 'User must join a group', type: 'alert' });
        }else{
            const user: User = {
                id: createUser.id,
                first_name: createUser.first_name,
                last_name: createUser.last_name,
                userGroups: [ selectedGroup.id ],
            }
            addNewUser(user);
            addUserToGroup( selectedGroup.id, user);
            showNotification({message: 'User was successfully created', type: 'success'});
            setCloseModal(true);
            setSelectedGroup({} as Group);
            setCreateUser({
                id: '',
                first_name: '',
                last_name: ''
            });
        }
    };

    return (
        <div className='wrapper'>
            <h3 className='wrapper-title'>Create your new group</h3>
            <form className='wrapper-form' onSubmit={onHandleSubmit}>
                <div className='wrapper-form-fields'>
                    <div className='wrapper-form-fields_item'>
                        <input type='text' name='first_name' placeholder='Your first name'  
                        value={ first_name } onChange={ onHandleChange } />
                    </div>
                    <div className='wrapper-form-fields_item'>
                        <input type='text' name='last_name' placeholder='Your last name'  
                        value={ last_name } onChange={ onHandleChange } />
                    </div>
                </div>          
                <GroupSelectComponent 
                    setSelectedGroup={ setSelectedGroup }
                    selectedGroup={selectedGroup}
                /> 
                <div className='wrapper-form-submit'>
                    <input type='submit' value='Create'/>
                </div>         
            </form>
            {
               !checkErrors(errors) && <div className='wrapper-error'>{ Object.values(errors) }</div>
            }  
        </div>
    )

}

export default UserForm;