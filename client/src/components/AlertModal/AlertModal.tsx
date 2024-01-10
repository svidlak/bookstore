import { ReactNode } from 'react'
import './AlertModal.scss'
import Button from 'react-bootstrap/esm/Button'
import Modal from 'react-bootstrap/esm/Modal'

interface Props {
    show: boolean
    title: string
    content: ReactNode
    confirmText?: string
    cancelText?: string
    handleConfirm: () => void
    handleClose: () => void
}
function AlertModal({ show, title, content, confirmText = 'confirm', cancelText = 'cancel', handleConfirm, handleClose }: Props) {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{content}</Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={handleClose}>
                    {cancelText}
                </Button>
                <Button variant='danger' onClick={handleConfirm}>
                    {confirmText}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AlertModal