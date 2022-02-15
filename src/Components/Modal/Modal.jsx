import {useEffect} from 'react';
import {createPortal} from "react-dom";
import PropTypes from "prop-types";
import {ModalStyleOverlay, ModalStyle} from "./modalStyle";

const modalRoot = document.querySelector('#modal-root')

const Modal =({onClose,children})=> {

    console.log(children)
    useEffect(()=>{
      const  handleKeyDown = ev => {
            if(ev.code === 'Escape') {
                onClose()
            }
        }
        window.addEventListener('keydown',handleKeyDown);
        return ()=>{
            window.removeEventListener('keydown',handleKeyDown)
        }
    },[onClose]);


Modal.propTypes={
    onClose:PropTypes.func.isRequired,

    children:PropTypes.node.isRequired
}



   const handleBackDropClick=e=>{

        if(e.target === e.currentTarget){
            onClose()
        }
    }


        return createPortal(<ModalStyleOverlay onClick={handleBackDropClick}>
            <ModalStyle>{children}</ModalStyle>
        </ModalStyleOverlay>, modalRoot)

}




export default Modal;