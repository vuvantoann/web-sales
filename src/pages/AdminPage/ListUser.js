import Table from 'react-bootstrap/Table';
import { FecthAllUser } from '../../components/ServiceComponent/UserService';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import  ModalAddNew from './modal'
import ModalEditUsers from './modaledit';
import ModalDeleteUser from './modaldelete';

function ListUser () {
    const [callUser, setCallUser ] = useState([])
    const [totalPages, setTotalPages] = useState(0)

    useEffect(()=>{
        // CallApi
        //try
        getUser(1);
    }, []);

    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);

    const [isShowModalEditUser, setIsShowModalEditUser] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({})

    const [isShowModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [dataUserDelete, setDataUserDelete] = useState({})

    const handleClose = () => {
        setIsShowModalAddNew(false)
        setIsShowModalEditUser(false)
        setShowModalDeleteUser(false)
    }

    const handleEditUser = (user) => {
        setDataUserEdit(user)
        setIsShowModalEditUser(true)

    }

    const handleDeleteUser = (user) => {
        setShowModalDeleteUser(true)
        setDataUserDelete(user)
    }

    

    const handleUpdateTable = (user) => {
        setCallUser( [user, ...callUser])
    }

    const _ = require('lodash');

    const handleEditUserFromModal = (user) => {
        let cloneCallUser = _.cloneDeep(callUser);
        let index = callUser.findIndex(item => item.id === user.id);
        
        if (index !== -1) {
            cloneCallUser[index].first_name = user.first_name;
            setCallUser(cloneCallUser);
        } else {
            console.error('User not found in callUser array.');
        }
    }
    
    const handleDeleteUserFromModal = (user) => {
        let cloneCallUser = _.cloneDeep(callUser);
        let index = callUser.findIndex(item => item.id === user.id);
        if (index !== -1) {
            cloneCallUser = cloneCallUser.filter(item => item.id !== user.id)
            setCallUser(cloneCallUser);
        } else {
            console.error('User not found in callUser array.');
        }
    }
    
    const handlePageClick = (event) => {
        console.log("check event",event)
        getUser(+event.selected + 1)
    };

    const getUser = async(page) => {
        let res = await FecthAllUser(page);
        // de kiem tra api co loi khong 
        // mot thang data la cua axios
        // gio khong con .data nua la to sua roi nhe. doc file customize-axios se hieu
        if(res && res.data ){
            setCallUser(res.data)
            setTotalPages(res.total_pages)  
        }
        
    }
   
    return (
        <>
       <div className='my-3 add-new'>
          <h4>ListUser</h4>
          <button className="btn btn-primary"
          onClick={()=>setIsShowModalAddNew(true)}
          >add User</button>
        </div>
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
            
            {
                // ta lai kiem tra xem calluser co loi khong
                callUser && callUser.length > 0 && 
                callUser.map((item,index) => {
                    return (
                        <tr key={`user ${index}`}>
                            <td>{item.id}</td>
                            <td>{item.first_name}</td>
                            <td>{item.last_name}</td>
                            <td>{item.email}</td>
                            <td>
                                <button className="btn btn-warning mx-3"
                                onClick={()=> handleEditUser(item)}
                                >edit</button>
                                <button className="btn btn-danger"
                                onClick={() => handleDeleteUser(item)}
                                >delete</button>
                            </td>
                        </tr>
                    )
                })
            }
        </tbody>
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="< previous"
        renderOnZeroPageCount={null}

        pageClassName='page-item'
        pageLinkClassName='page-link'
        previousClassName='page-item'
        previousLinkClassName='page-link'
        nextClassName='page-item'
        nextLinkClassName='page-link'
        breakClassName='page-item'
        breakLinkClassName='page-link'
        containerClassName='pagination'
        activeClassName='active'
      />

    <ModalAddNew 
      show = {isShowModalAddNew}
      handleClose = {handleClose}
      handleUpdateTable ={handleUpdateTable}
      />

    <ModalEditUsers 
    show = {isShowModalEditUser}
    handleClose = {handleClose}
    dataUserEdit = {dataUserEdit}
    handleEditUserFromModal={handleEditUserFromModal}
    />

    <ModalDeleteUser 
    show = {isShowModalDeleteUser}
    handleClose = {handleClose}
    dataUserDelete = {dataUserDelete}
    handleDeleteUserFromModal = {handleDeleteUserFromModal}
   
    />
    </>);
}

export default ListUser;