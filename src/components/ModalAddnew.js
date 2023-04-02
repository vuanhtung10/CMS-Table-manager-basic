import { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { postCreateUSer, putUpdateUser } from './services/UserService';
import { toast } from 'react-toastify';

const ModalAddNew = (props) => {
    const { handleClose, show, handleUpdateTable, handleEditUserFromModal, isEdit, dataUserEdit } = props;
    const [name, setName] = useState('');
    const [job, setJob] = useState('');

    useEffect(() => {
        if (dataUserEdit && Object.keys(dataUserEdit).length > 0) {
            setName(dataUserEdit.first_name);
        }
    }, [dataUserEdit]);

    const handleSaveUser = async () => {
        if (!isEdit) {
            let res = await postCreateUSer(name, job);
            console.log('check res:', res);
            if (res && res.id) {
                //success

                setName('');
                setJob('');
                toast.success('a user is created success');
                handleUpdateTable({
                    first_name: res.name,
                    id: res.id,
                });
            } else {
                toast.error('a user is created error');
            }
        } else {
            let res = await putUpdateUser(name, job);
            if (res && res.updatedAt) {
                handleEditUserFromModal({
                    first_name: name,
                    id: dataUserEdit.id,
                });
                toast.success('update user success');
            }
            console.log('res', res);
        }
        handleClose();
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEdit ? 'update user' : 'Add new user'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            Name
                        </label>
                        <input
                            onChange={(event) => {
                                setName(event.target.value);
                            }}
                            value={name}
                            type="text"
                            className="form-control"
                            id="exampleInputEmail1"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Job</label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(event) => {
                                setJob(event.target.value);
                            }}
                            value={job}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSaveUser()}>
                        {isEdit ? 'Save Changes' : 'Add new user'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalAddNew;
