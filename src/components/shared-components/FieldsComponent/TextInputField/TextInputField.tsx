import { ChangeEvent } from 'react';

import './TextInputField.scss';

interface Props {
    name: string;
    placeholder?: string;
    value: string;
    onHandleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const TextInputField: React.FC<Props> = ({ value, onHandleChange, name, placeholder }) => {

    return(
        <div className='input-field'>
            <input type='text' name={ name } placeholder={ placeholder }  
            value={ value } onChange={ onHandleChange } />
        </div>
    )
}

export default TextInputField