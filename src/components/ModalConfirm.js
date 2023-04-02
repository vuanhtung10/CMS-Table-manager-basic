import { deleteUser } from './services/UserService';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
const ModalConfirm = (props) => {
    const { handleClose, show, dataUserDelete, handleDeleteUserForm } = props;

    const confirmDelete = async () => {
        let res = await deleteUser(dataUserDelete.id);
        if (res && res.statusCode === 204) {
            toast.success('detele user success');
            handleClose();
            handleDeleteUserForm(dataUserDelete);
        } else {
            toast.error('error delete user');
        }
        console.log('check', res);
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    this action can'be undone ! Do you want to delete this user <br />{' '}
                    <b>email = {dataUserDelete.email}?</b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => confirmDelete()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalConfirm;
