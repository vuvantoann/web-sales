import * as React from 'react';

import { Badge, Col, Popover} from "antd";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { 
    WrapperHeader,
    WrapperIconHeader, 
    WrapperTextHeader,
    StyledLocationOnIcon,
    WrapperLogoHeader,
    WrapperLogoContein,
    WrapperContentPoup
} from "./style";

import ComputerIcon from '@mui/icons-material/Computer';
import PhoneIcon from '@mui/icons-material/Phone';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';     
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'

import * as UserService from '../../servives/UserService'
import { useDispatch } from "react-redux";
import { resetUser } from '../../redux/slides/userSlide'
import { useState } from 'react';
import Loading from '../../components/LoadingComponent/Loading'
import { useEffect } from 'react';
import { searchProduct } from '../../redux/slides/productSlide';

function HeaderComponent ({
    isHiddenMap = false,
    isHiddenSearch = false,
    isHiddenConfiguration = false,
    isHiddenContact = false,
    isHiddenNews = false,
    isHiddenCart = false,
    }) {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const [userName, setUserName] = useState('')
    const [userAvatar, setUserAvatar] = useState('')
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const handleNavigateSignin = () => {
        navigate('/signin')
    }

    const handleLogout = async () => {
        setLoading(true)
       await UserService.logoutUser()
        dispatch(resetUser())
        setLoading(false)
    };
    
    useEffect(() => {
        setLoading(true)
        setUserName(user?.name)
        setUserAvatar(user?.avatar)
        setLoading(false)

    },  [user?.name, user?.avatar])
    

    const content = (
        <div>
          <WrapperContentPoup onClick={()=> {navigate('/profile-user')}}>Thông tin người dùng</WrapperContentPoup>
          {user?.isAdmin && (
            <WrapperContentPoup onClick={()=> {navigate('/system/admin')}}>Quản lý hệ thống</WrapperContentPoup>
 
          )}
          <WrapperContentPoup onClick={handleLogout}>Đăng xuất</WrapperContentPoup>

        </div>
    );
    
    const onSearch = (e) => {
        setSearch(e.target.value)
        dispatch(searchProduct(e.target.value))
    }

    return (
        <div>
            <img src={'/image/logo_background1.webp'} alt="logo_hearder" />
        <WrapperHeader 
            style={{ justifyContent: isHiddenSearch ? 'space-between' : 'unset' }}>
            <WrapperLogoContein span={6}>
            <WrapperLogoHeader />
            {!isHiddenMap && (
                <StyledLocationOnIcon />
            )}
            </WrapperLogoContein>
            {!isHiddenSearch && (
                <Col span={8}>
                <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 430, height: 40, marginLeft: '10px' }}>
                    <InputBase
                        sx={{ ml: 1, flex: 1, }}
                        placeholder="Bạn cần tìm gì ?"
                        inputProps={{ 'aria-label': 'Bạn cần tìm gì ?' }}
                        onChange={onSearch}
                    />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
                </Col>
            )}
            <Col span={10}>
            <div style={{display: "flex"}}>
            {!isHiddenConfiguration &&  (
                <WrapperIconHeader>
                    <ComputerIcon  />
                    <WrapperTextHeader >Xây dựng cấu hình</WrapperTextHeader>
                </WrapperIconHeader>  
                )}
                {!isHiddenContact && (
                <WrapperIconHeader>
                    <PhoneIcon  />
                    <WrapperTextHeader >Khách Hàng Liên Hệ</WrapperTextHeader>
                </WrapperIconHeader>
                )}
                {!isHiddenNews && (
                <WrapperIconHeader>
                    <NewspaperIcon />
                    <WrapperTextHeader >Tin Tức Công Nghệ</WrapperTextHeader>
                </WrapperIconHeader>
                )}
                {!isHiddenCart && (
                <WrapperIconHeader>
                    <Badge count = {4}  size='small'>
                        <ShoppingCartIcon  />
                    </Badge>
                        <WrapperTextHeader >Giỏ Hàng</WrapperTextHeader>
                </WrapperIconHeader>
                )}
                <Loading isLoading = {loading}>
                <WrapperIconHeader >
                    {userAvatar ? (
                        <img src={userAvatar} alt='avarta'style={{
                            height: '24px',
                            width: '24px',
                            borderRadius: '50%',
                            objectFit: 'cover'
                        }}/>
                    ) : (
                        <AccountCircleIcon/>
                    )}
                    {user?.access_token ? (
                        <>
                        <Popover content={content} trigger="click">
                            <WrapperTextHeader>{userName?.length ? userName : user?.email}</WrapperTextHeader>
                        </Popover>
                    </>) : (
                        <WrapperTextHeader onClick={handleNavigateSignin}>Tài Khoản</WrapperTextHeader>
                    )}     
                </WrapperIconHeader>
                </Loading>
            </div>
            </Col>
        </WrapperHeader>
        </div>
    )
}

export default HeaderComponent;