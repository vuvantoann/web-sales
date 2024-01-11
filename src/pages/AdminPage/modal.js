import { useState } from "react";
import { Modal, Button } from "react-bootstrap"
import { PostCreateUser } from "../../components/ServiceComponent/UserService";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ModalAddNew(props) {
    const {show, handleClose, handleUpdateTable} = props;
    const [name, setName] = useState('')
    const [job, setJob] = useState('')

    const handleSaveUser = async() => {
        let res = await PostCreateUser(name, job)
        if(res && res.id) {
          toast.success('Add Users Success!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
          handleClose()
          setJob('')
          setName('')
          handleUpdateTable({first_name: name, id: res.id})
          // success

        } else {
          // erros
          toast.error('Users Error')
        }
    }
    return (
        <>
      <Modal 
      show={show} 
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="add-user-container">
                <div>
                <form>
                    <div className="mb-3">
                        <label  className="form-label">Name</label>
                        <input 
                        type="text" 
                        className="form-control"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label  className="form-label">Job</label>
                        <input 
                        type="text" 
                        className="form-control"
                        value={job}
                        onChange={(event) => setJob(event.target.value)}
                        />
                    </div>
                    </form> 
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

     
        </>)
}

export default ModalAddNew