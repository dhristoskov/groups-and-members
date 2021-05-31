import { Fragment } from 'react';

import './PaginationComponent.scss';

interface Props {
    totalItems: number;
    itemsPerPage: number;
    pagination: (number: number) => void;
};

const PaginationComponent: React.FC<Props> = ({ totalItems, itemsPerPage, pagination }) => {

    const pageNumers: number[] = [];
    
    for( let i = 1; i <= Math.ceil(totalItems/ itemsPerPage); i++ ){
        pageNumers.push(i)
    }

    return (
        <Fragment>
            {
                pageNumers.length && 
                <div className='pagination'>
                    <p className='pagination-pages'>pages</p>
                    {
                        pageNumers.map(number => (
                            <div key={number} className='pagination-page'>
                                <button className='pagination-page-button' onClick={() => pagination(number)}>{number}</button>
                            </div>
                        ))
                    }
                </div> 
            }
        </Fragment>
    )

}

export default PaginationComponent;