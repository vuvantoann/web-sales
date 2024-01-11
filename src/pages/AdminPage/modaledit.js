import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap"
import { PutCreateUser } from "../../components/ServiceComponent/UserService";
import { toast } from 'react-toastify';

function ModalEditUsers (props) {
    
  const { show, handleClose, dataUserEdit, handleEditUserFromModal } = props;

    const [name, setName] = useState('')
    const [job, setJob] = useState('')

    const handleEditUsers = async() => {
      try {
        let res = await PutCreateUser(name, job)
        console.log('check kakaka', res)
        if(res && res.updatedAt) {
          // success
          handleEditUserFromModal({
            first_name : name,
            id: dataUserEdit.id
          })
          handleClose()
          toast.success('edit success!')
        }
      } catch (error) {
        console.log(error);
      }
        
        

    }

    useEffect(()=> {
        if(show) {
            setName(dataUserEdit.first_name)
        }
    }, [dataUserEdit]) 

    useEffect(() => {
      console.log("ModalEditUsers mounted"); // Thêm dòng này để kiểm tra xem component có được mount không
  }, []); // Chỉ gọi một lần khi component được mount

    
    return (
        <>
      <Modal 
      show={show} 
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit user</Modal.Title>
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
          <Button variant="primary" onClick={handleEditUsers}>
           Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      
        </>)
}

export default ModalEditUsers 