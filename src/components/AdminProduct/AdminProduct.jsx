import { Button, Form, Space} from "antd";
import { WrapperHeader, WrapperUploadFile } from "./style";
import { PlusOutlined, DeleteOutlined, EditOutlined, SearchOutlined} from '@ant-design/icons';
import TableComponent from "../TableComponent/TableComponent";
import { useState } from "react";
import InputComponent from "../InputComponent/InputComponent";
import { getBase64 } from "../../utils";
import * as ProductService from '../../servives/ProductService'
import { useMutationHooks } from '../../hooks/UseMutationHook'
import Loading from "../LoadingComponent/Loading";
import { useEffect } from "react";
import * as message from "../MessageComponent/Message";
import { useQuery } from "@tanstack/react-query";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import { useSelector } from "react-redux";
import ModalComponent from "../ModalComponent/ModalComponent";
import { useRef } from "react";

function AdminProduct () {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const searchInput = useRef(null);

    const user = useSelector((state) => state?.user)
    const [stateProduct, setStateProduct] = useState({
        countInStock: '', 
        description: '', 
        image: '', 
        name: '', 
        price: '', 
        rating: '', 
        type: '', 
        
    })

    const [stateProductDetails, setStateProductDetails] = useState({
        countInStock: '', 
        description: '', 
        image: '', 
        name: '', 
        price: '', 
        rating: '', 
        type: '', 
        
    })
    
    const [form] = Form.useForm();

    const mutation = useMutationHooks(
        (data) => {
          const { name,
            price,
            description,
            rating,
            image,
            type,
            countInStock: countInStock } = data
         const res = ProductService.createProduct({
            name,
            price,
            description,
            rating,
            image,
            type,
            countInStock
          })
          return res
        }
      )
    
    
    const mutationUpdate = useMutationHooks(
        (data) => {
            const {id, token, ...rests } = data
            const res = ProductService.updateProduct(id, token,{...rests} )
            return res
        }
    )

    const mutationDelete = useMutationHooks(
        (data) => {
            const {id, token} = data
            const res = ProductService.deleteProduct(id, token )
            return res
        }
    )
    
    const mutationDeleteMany = useMutationHooks(
        (data) => {
          const {token, ...ids} = data
          const res = ProductService.deleteManyProduct(ids, token )
          return res
        }
    )


    const getAllProducts = async () => {
        const res = await ProductService.getAllProduct()
        return res
    }

    const fetchGetDetailsProduct = async () => {
        const res = await ProductService.getDetailsProduct(rowSelected)
        if(res?.data) {
            setStateProductDetails({
                name: res?.data?.name,
                price: res?.data?.price,
                description: res?.data?.description,
                rating: res?.data?.rating,
                image: res?.data?.image,
                type: res?.data?.type,
                countInStock: res?.data?.countInStock,
            })
        }
        setIsLoadingUpdate(false)
    }

    useEffect(() => {
        form.setFieldsValue(stateProductDetails)
    }, [form, stateProductDetails])

    useEffect(() => {
        if(rowSelected && isOpenDrawer) {
            setIsLoadingUpdate(true)
            fetchGetDetailsProduct(rowSelected)
        }
    }, [rowSelected, isOpenDrawer])
    
    const handleDetailsProduct = () => {
        setIsOpenDrawer(true)
    }
    const {data, isLoading, isSuccess, isError} = mutation
    const {data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated} = mutationUpdate
    const {data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDelected, isError: isErrorDeleted} = mutationDelete
    const {data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDelectedMany, isError: isErrorDeletedMany} = mutationDeleteMany

    const queryProduct = useQuery({queryKey: ['products'], queryFn: getAllProducts})
    const {isLoading: isLoadingProducts, data: products} = queryProduct

    const renderAction = () => {
        return (
          <div>
            <DeleteOutlined style={{ color: '#057654', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
            <EditOutlined style={{ color: 'rgb(0, 30, 43)', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsProduct} />
          </div>
        )
    }

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        // setSearchText(selectedKeys[0]);
        // setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        // setSearchText('');
    };
    
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div
            style={{
              padding: 8,
            }}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <InputComponent
              ref={searchInput}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{
                marginBottom: 8,
                display: 'block',
              }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{
                  width: 90,
                }}
              >
                Search
              </Button>
              <Button
                onClick={() => clearFilters && handleReset(clearFilters)}
                size="small"
                style={{
                  width: 90,
                }}
              >
                Reset
              </Button>
            </Space>
          </div>
        ),
        filterIcon: (filtered) => (
          <SearchOutlined
            style={{
              color: filtered ? '#1890ff' : undefined,
            }}
          />
        ),
        onFilter: (value, record) =>
          record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
          if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
          }
        },
        // render: (text) =>
        //   searchedColumn === dataIndex ? (
        //     // <Highlighter
        //     //   highlightStyle={{
        //     //     backgroundColor: '#ffc069',
        //     //     padding: 0,
        //     //   }}
        //     //   searchWords={[searchText]}
        //     //   autoEscape
        //     //   textToHighlight={text ? text.toString() : ''}
        //     // />
        //   ) : (
        //     text
        //   ),
      });
     
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            ...getColumnSearchProps('name')
        },
        {
            title: 'Price',
            dataIndex: 'price',
            sorter: (a, b) => a.price - b.price,
            filters: [
              {
                text: '>= 300',
                value: '>=',
              },
              {
                text: '<= 300',
                value: '<=',
              }
            ],
            onFilter: (value, record) => {
              if (value === '>=') {
                return record.price >= 300
              }
              return record.price <= 300
            },
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            sorter: (a, b) => a.rating - b.rating,
            filters: [
              {
                text: '>= 3',
                value: '>=',
              },
              {
                text: '<= 3',
                value: '<=',
              }
            ],
            onFilter: (value, record) => {
              if (value === '>=') {
                return Number(record.rating) >= 3
              }
              return Number(record.rating) <= 3
            },
        },
        {
          title: 'Type',
          dataIndex: 'type',
        },
        {
          title: 'Action',
          dataIndex: 'action',
          render: renderAction,

        },
      ];
      const dataTable = products?.data?.length && products?.data?.map((product) => {
        return {...product, key: product._id}
      })

    useEffect(()=> {
        if(isSuccess && data?.status === 'OK') {
            message.success()
            handleCancel()
        }else if(isError){
            message.error()
        }
    }, [isSuccess])

    useEffect(()=> {
        if(isSuccessUpdated && dataUpdated?.status === 'OK') {
            message.success()
            handleCloseDrawer()
        }else if(isErrorUpdated){
            message.error()
        }
    }, [isSuccessUpdated])

    useEffect(()=> {
        if(isSuccessDelected && dataDeleted?.status === 'OK') {
            message.success()
            handleCancelDelete()
        }else if(isErrorDeleted){
            message.error()
        }
    }, [isSuccessDelected])

    useEffect(()=> {
      if(isSuccessDelectedMany && dataDeletedMany?.status === 'OK') {
          message.success()
      }else if(isErrorDeletedMany){
          message.error()
      }
  }, [isSuccessDelectedMany])

    const handleCancel = () => {
        setIsModalOpen(false)
        setStateProduct({
            countInStock: '', 
            description: '', 
            image: '', 
            name: '', 
            price: '', 
            rating: '', 
            type: '',
        })
        form.resetFields()
    }


    const handleCloseDrawer = () => {
        setIsOpenDrawer(false)
        setStateProductDetails({
            countInStock: '', 
            description: '', 
            image: '', 
            name: '', 
            price: '', 
            rating: '', 
            type: '',
        })
        form.resetFields()
    }

    const handleCancelDelete = () => {
        setIsModalOpenDelete(false)
    }


    const onFinish = () => {
        mutation.mutate(stateProduct, {
            onSettled: () => {
              queryProduct.refetch()
            }
        })
        console.log('Finish', stateProduct)
    }
    const handleOnchange = (e) => {
        setStateProduct({
            ...stateProduct,
            [e.target.name]: e.target.value
        })
    }

    const handleOnchangeDetails = (e) => {
        setStateProductDetails({
            ...stateProductDetails,
            [e.target.name]: e.target.value
        })
    }
    

    const handleOnchangeAvatar = async ({fileList}) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj );
        }
        setStateProduct({
            ...stateProduct,
            image: file.preview
        })
    }

    const handleOnchangeAvatarDetails = async ({fileList}) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj );
        }
        setStateProductDetails({
            ...stateProduct,
            image: file.preview
        })
    }

    const onUpdateProduct = () => {
        mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateProductDetails }, {
            onSettled: () => {
              queryProduct.refetch()
            }
        })
    }

    const handleDeleteProduct = () => {
        mutationDelete.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
              queryProduct.refetch()
            }
        })
    }

    const handleDeleteManyProducts = (ids) => {
      mutationDeleteMany.mutate({ ids: ids, token: user?.access_token }, {
        onSettled: () => {
          queryProduct.refetch()
        }
      })
    }
    
    return(
        <div>
            <WrapperHeader>Quản lý sản phẩm </WrapperHeader>
            <div style={{marginTop: '10px'}}>
                <Button style={{height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed'}} onClick={()=>setIsModalOpen(true)} ><PlusOutlined style={{fontSize: '60px'}}/></Button>
            </div>
            <div style={{marginTop: '20px'}}>
                    <TableComponent handleDelteMany={handleDeleteManyProducts} columns ={columns} isLoading = {isLoadingProducts} data = {dataTable} onRow={(record, rowIndex) => {
                    return {
                        onClick: event => {
                        setRowSelected(record._id)
                        }
                    };
                    }} />
            </div>
            <ModalComponent forceRender title="Tạo sản phẩm" open={isModalOpen} onCancel={handleCancel} footer={null} >
                <Loading isLoading={isLoading}>
                <Form
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    onFinish={onFinish}
                    autoComplete="on"
                    form={form}
                >
                    <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                    <InputComponent value={stateProduct['name']} onChange={handleOnchange} name="name" />
                    </Form.Item>

                    <Form.Item
                    label="Type"
                    name="type"
                    rules={[{ required: true, message: 'Please input your type!' }]}
                    >
                    {/* <Select
                        name="type"
                        defaultValue="lucy"
                        style={{ width: 120 }}
                        value={stateProduct.type}
                        onChange={handleChangeSelect}
                        options={renderOptions(typeProduct?.data?.data)}
                        /> */}
                    <InputComponent value={stateProduct.type} onChange={handleOnchange} name="type" />
                    </Form.Item>
                    {/* <Form.Item
                        label='New type'
                        name="newType"
                        rules={[{ required: true, message: 'Please input your type!' }]}
                    >
                    <InputComponent value={stateProduct.newType} onChange={handleOnchange} name="newType" />
                    </Form.Item> */}
                    <Form.Item
                    label="Count inStock"
                    name="countInStock"
                    rules={[{ required: true, message: 'Please input your count inStock!' }]}
                    >
                    <InputComponent value={stateProduct.countInStock} onChange={handleOnchange} name="countInStock" />
                    </Form.Item>
                    <Form.Item
                    label="Price"
                    name="price"
                    rules={[{ required: true, message: 'Please input your count price!' }]}
                    >
                    <InputComponent value={stateProduct.price} onChange={handleOnchange} name="price" />
                    </Form.Item>
                    <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please input your count description!' }]}
                    >
                    <InputComponent value={stateProduct.description} onChange={handleOnchange} name="description" />
                    </Form.Item>
                    <Form.Item
                    label="Rating"
                    name="rating"
                    rules={[{ required: true, message: 'Please input your count rating!' }]}
                    >
                    <InputComponent value={stateProduct.rating} onChange={handleOnchange} name="rating" />
                    </Form.Item>
                    {/* <Form.Item
                    label="Discount"
                    name="discount"
                    rules={[{ required: true, message: 'Please input your discount of product!' }]}
                    >
                    <InputComponent value={stateProduct.discount} onChange={handleOnchange} name="discount" />
                    </Form.Item> */}
                    <Form.Item
                    label="Image"
                    name="image"
                    rules={[{ required: true, message: 'Please input your count image!' }]}
                    >
                    <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                        <Button >Select File</Button>
                        {stateProduct?.image && (
                        <img src={stateProduct?.image} style={{
                            height: '60px',
                            width: '60px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            marginLeft: '10px'
                        }} alt="avatar" />
                        )}
                    </WrapperUploadFile>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                        <Button type="primary" htmlType="submit" >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
                </Loading>
            </ModalComponent>
            <DrawerComponent title='Chi tiết sản phẩm' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="50%">
            <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>
                <Form
                    name="basic"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 18 }}
                    onFinish={onUpdateProduct}
                    autoComplete="on"
                    form={form}
                >
                    <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                    <InputComponent value={stateProductDetails['name']} onChange={handleOnchangeDetails} name="name" />
                    </Form.Item>
                    <Form.Item
                    label="Type"
                    name="type"
                    rules={[{ required: true, message: 'Please input your type!' }]}
                    >
                    <InputComponent value={stateProductDetails['type']} onChange={handleOnchangeDetails} name="type" />
                    </Form.Item>
                    <Form.Item
                    label="Count inStock"
                    name="countInStock"
                    rules={[{ required: true, message: 'Please input your count inStock!' }]}
                    >
                    <InputComponent value={stateProductDetails.countInStock} onChange={handleOnchangeDetails} name="countInStock" />
                    </Form.Item>
                    <Form.Item
                    label="Price"
                    name="price"
                    rules={[{ required: true, message: 'Please input your count price!' }]}
                    >
                    <InputComponent value={stateProductDetails.price} onChange={handleOnchangeDetails} name="price" />
                    </Form.Item>
                    <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please input your count description!' }]}
                    >
                    <InputComponent value={stateProductDetails.description} onChange={handleOnchangeDetails} name="description" />
                    </Form.Item>
                    <Form.Item
                    label="Rating"
                    name="rating"
                    rules={[{ required: true, message: 'Please input your count rating!' }]}
                    >
                    <InputComponent value={stateProductDetails.rating} onChange={handleOnchangeDetails} name="rating" />
                    </Form.Item>
                    {/* <Form.Item
                    label="Discount"
                    name="discount"
                    rules={[{ required: true, message: 'Please input your discount of product!' }]}
                    >
                    <InputComponent value={stateProduct.discount} onChange={handleOnchange} name="discount" />
                    </Form.Item> */}
                    <Form.Item
                    label="Image"
                    name="image"
                    rules={[{ required: true, message: 'Please input your count image!' }]}
                    >
                    <WrapperUploadFile onChange={handleOnchangeAvatarDetails} maxCount={1}>
                        <Button >Select File</Button>
                        {stateProductDetails?.image && (
                        <img src={stateProductDetails?.image} style={{
                            height: '60px',
                            width: '60px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            marginLeft: '10px'
                        }} alt="avatar" />
                        )}
                    </WrapperUploadFile>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 19, span: 16 }}>
                        <Button type="primary" htmlType="submit" >
                            Apply
                        </Button>
                    </Form.Item>
                </Form>
                </Loading>
            </DrawerComponent>
            <ModalComponent title="Xóa sản phẩm" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteProduct}>
                <Loading isLoading={isLoadingDeleted}>
                <div>
                    Bạn có chắc xóa sản phẩm{' '}
                    <span style={{ fontWeight: 'bold', color: '#2878ff', textDecoration: 'underline' }}>
                        {stateProductDetails['name']}
                    </span>{' '}
                    này không?
                </div>
                </Loading>
            </ModalComponent>
        </div>
    )
}

export default AdminProduct;
