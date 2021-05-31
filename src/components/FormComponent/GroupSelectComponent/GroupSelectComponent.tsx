import { useContext, useState } from 'react';

import { GroupContext } from 'src/context/GroupContext/GroupContext';
import { Group } from 'src/interfaces/group';

import './GroupSelectComponent.scss';

interface Props {
    setSelectedGroup: (group: Group) => void;
    selectedGroup: Group
}

const GroupSelectComponent: React.FC<Props> = ({ setSelectedGroup, selectedGroup }) => {

    const { groups } = useContext(GroupContext);
    const [ isListOpen, setListState ] = useState<boolean>(false);

    const toggleSelect = (): void => {
        setListState(prevState => !prevState);
    };

    return(
        <div className='select-wrapper' tabIndex={0} onBlur={() => setListState(false)}>
            <div onClick={ toggleSelect } className='select-wrapper-default'>
                <span>{ selectedGroup.name ? selectedGroup.name : 'Pick a group'}</span>
            </div>
            {
                isListOpen && 
                <div className='select-wrapper-selectors'>
                    {
                        groups.map(group => {
                            return (
                                <p className='select-wrapper-selectors_item' 
                                    key={group.id}
                                    onClick={() => {setSelectedGroup(group); setListState(false)}}
                                >
                                    { group.name }
                                </p>
                            )          
                        })
                    }
                </div>
            }
            </div>
    )
}

export default GroupSelectComponent;


  