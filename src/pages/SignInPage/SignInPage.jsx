import React from "react";
import { useState, useEffect } from "react";
import {WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style'
import InputForm from "../../components/InputFrom/InputFrom";
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { Image } from "antd";
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import { useNavigate } from "react-router-dom";
import { useMutationHooks } from '../../hooks/UseMutationHook'
import * as UserService from '../../servives/UserService'
import Loading from "../../components/LoadingComponent/Loading";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { updateUser } from '../../redux/slides/userSlide';

function SignInPage () {
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const mutation = useMutationHooks(
         data => UserService.loginUser(data)
      )
    const {data, isLoading, isSuccess} = mutation


    useEffect(() => {
        if (isSuccess) {
          navigate('/')
          try {
            localStorage.setItem('access_token', JSON.stringify(data?.newReponse?.access_token));
            console.log('Lưu dữ liệu thành công!');
          } catch (error) {
            console.error('Lỗi khi lưu dữ liệu:', error);
          }
          
          if(data?.newReponse?.access_token) {
            const decoded = jwt_decode(data?.newReponse?.access_token)
            console.log('toanf checck >>>', decoded)
            if(decoded?.id) {
                handleGetDetailsUser(decoded?.id, data?.newReponse?.access_token)
            }
          }
        }
      }, [isSuccess]);

     const handleGetDetailsUser = async (id, token) => {
         const res = await UserService.getDetailsUser(id, token)
         console.log('toanf chec<< ress', res)
         dispatch(updateUser({...res?.response?.data, access_token: token}))
     }

    console.log('mutaion', mutation)
    const handleOnchangeEmail = (value) => {
        setEmail(value)
    }

    const handleOnchangePassword = (value) => {
        setPassword(value)
    }

    const handleNavigateSingup = () => {
        navigate('/signup')
    }

    const handleSingin = () => {
        mutation.mutate({
            email,
            password
        })
        console.log('data', email, password)
    }
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.53)', height: '100vh'}}>
            <div style={{width: '800px', height: '445px', borderRadius: '6px', background: '#fff', display: 'flex'}}>
                <WrapperContainerLeft>
                    <h1>Xin chào</h1>
                    <p>Đăng nhập và tạo tài khoản</p>
                    <InputForm 
                    style={{marginBottom: '10px'}} 
                    placeholder='abc@gmail.com' 
                    value={email}
                    onChange={handleOnchangeEmail}
                    />
                    <div style={{ position: 'relative' }}>
                        <span
                        onClick={() => setIsShowPassword(!isShowPassword)}
                        style={{
                            zIndex: 10,
                            position: 'absolute',
                            top: '4px',
                            right: '8px'
                        }}
                        >{
                            isShowPassword ? (
                            <EyeFilled />
                            ) : (
                            <EyeInvisibleFilled />
                            )
                        }
                        </span>
                        <InputForm
                        placeholder="password"
                        type={isShowPassword ? "text" : "password"}
                        value={password}
                        onChange={handleOnchangePassword}
                        />
                    </div>
                    {data?.status === 'ERR' && <span style={{color: 'red'}}>{data?.message}</span>}
                    <Loading isLoading={isLoading}>
                        <ButtonComponent
                        disabled={!email.length || !password.length }
                        onClick = {handleSingin}
                        bordered="false"
                        size={40}
                        styleButton={{
                            background: 'rgb(255, 57, 69)',
                            height: '48px',
                            width: '100%',
                            border: 'none',
                            borderRadius: '4px',
                            margin: '26px 0 10px'
                        }}
                        textbutton={'Đăng nhập'}
                        styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                        ></ButtonComponent>
                    </Loading>
                    <WrapperTextLight>Quên mật khẩu?</WrapperTextLight>
                    <p>Chưa có tài khoản? 
                        <WrapperTextLight
                        onClick={handleNavigateSingup}
                        >Tạo tài khoản</WrapperTextLight>
                    </p>
                </WrapperContainerLeft>
                <WrapperContainerRight>
                    <Image src="/image/logo-login.png" preview={false} alt="image-logo" height='203px' width='203px' />
                    <h5>Mua sắm tại NguyenCongPC</h5>
                </WrapperContainerRight>
            </div>
        </div>
    )
}

export default SignInPage;