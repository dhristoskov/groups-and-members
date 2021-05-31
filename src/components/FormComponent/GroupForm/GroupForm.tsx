import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Group } from 'src/interfaces/group';
import { GroupContext } from 'src/context/GroupContext/GroupContext';
import { NotificationContext } from 'src/context/Notification/Notification';
import { checkErrors, ValidateInput } from 'src/utils/formValidator';

import './GroupForm.scss';

interface Props {
    setCloseModal: ( state: boolean ) => void;
}

const GroupForm: React.FC<Props> = ({ setCloseModal }) => {

    const { showNotification } = useContext(NotificationContext);
    const { addNewGroup } = useContext(GroupContext);
    const [ errors, setErrors ] = useState<any>({});
    const [ createGroup, setCreateGroup ] = useState<Group>({
        id: uuidv4(),
        name: '',
        members: []
     });

    const { name } = createGroup;

    const onHandleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;

        /*Check for input errors*/
        let error = ValidateInput( name, value );
        setErrors(error);
        setCreateGroup({...createGroup, [name]: value})
    };

    const onHandleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault(); 

        if(!checkErrors(errors)){
            showNotification({ message: 'Inccorect data', type: 'alert' });
        }else {
            addNewGroup(createGroup);
            showNotification({message: 'Group was successfully created', type: 'success'});
            setCloseModal(true);
            setCreateGroup({
                id: '',
                name: '',
                members: []
            });
        }
    };

    return (
        <div className='group-wrapper'>
            <h3 className='group-wrapper-title'>Create your new group</h3>
            <form className='group-wrapper-form' onSubmit={onHandleSubmit}>
                <div className='group-wrapper-form_field'>
                    <input type='text' name='name' placeholder='Give your group a name'  
                    value={ name } onChange={ onHandleChange } />
                </div>
                <div className='group-wrapper-form_field'>
                    <input type='submit' value='Create'/>
                </div>         
            </form>
            {
               !checkErrors(errors) && <div className='group-wrapper-error'>{ Object.values(errors) }</div>
            }  
        </div>
    )

}

export default GroupForm;