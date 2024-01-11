import { Modal, Button } from "react-bootstrap"
import { DeleteCreateUser } from "../../components/ServiceComponent/UserService";
import { toast } from 'react-toastify';


function ModalDeleteUser(props) {
    const {show, handleClose, dataUserDelete, handleDeleteUserFromModal} = props;
    
    const handleDeleteUser = async() => {
      let res = await DeleteCreateUser(dataUserDelete)
      if(res && +res.statusCode === 204) {
        toast.success('Delete success!')
        handleClose()
        handleDeleteUserFromModal(dataUserDelete)

      } else {
        toast.success('Delete error!')

      }
      console.log('check res >>>', res)
          
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
          <Modal.Title>Delete a User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="add-user-container">
                <div>
                <form>
                    <div className="mb-3">
                    Are you sure you want to delete this user with this email?
                    <br />
                    <p>Email = { dataUserDelete.email}</p>

                    </div>
                    </form> 
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDeleteUser}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

     
        </>)
}

export default ModalDeleteUser;