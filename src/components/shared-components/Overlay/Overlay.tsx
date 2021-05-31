import React from 'react';
import ReactDOM from 'react-dom';

import './Overlay.scss';

interface Props {
    setCloseModal: (state: boolean) => void;
};

const Overlay: React.FC<Props> = ({ setCloseModal }) => {

    return ReactDOM.createPortal(
        <div className='overlay' onClick={() => setCloseModal(true) }></div>,
        document.getElementById('overlay') as HTMLElement
      );
}

export default Overlay;