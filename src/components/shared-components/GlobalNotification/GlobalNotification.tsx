import { GrCheckmark, GrTrigger } from 'react-icons/gr';

import './GlobalNotification.scss';

interface Props {
    message: string;
    type: string;   
}

const NotificationComponent: React.FC<Props> = ({ message, type }) => {

    return (
        <div className='notification'>
            <div className='notification-wrapper' 
                style={ type==='alert' 
                ? { backgroundColor: 'rgba(231, 91, 4, 0.7)'} 
                : { backgroundColor: 'rgba(255, 186, 10, 0.6)'}}
            >
                {
                    type === 'alert' 
                    ?  <GrTrigger className='notification-wrapper-icon'/>
                    :  <GrCheckmark className='notification-wrapper-icon'/>
                }
                <p className='notification-wrapper-message'>{ message }</p>
            </div>                  
        </div>      
    )
}

export default NotificationComponent;