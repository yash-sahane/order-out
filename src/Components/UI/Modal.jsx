import React from 'react';
import ReactDOM from 'react-dom';
import classes from './modal.module.css'

const Backdrop = (props) => {
    return <div onClick={props.onClick} className={classes.backdrop} />
}

const ModalOverlay = (props) => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    )
}

const portalElement = document.getElementById('overlays');

const Modal = ({ disableCart, children }) => {
    return (
        <>
            {ReactDOM.createPortal(<Backdrop onClick={disableCart} />, portalElement)}
            {ReactDOM.createPortal(<ModalOverlay>{children}</ModalOverlay>, portalElement)}
        </>
    )
}

export default Modal