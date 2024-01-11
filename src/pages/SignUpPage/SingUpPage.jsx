import React from "react";
import { useState, useEffect } from "react";
import {WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style'
import InputForm from "../../components/InputFrom/InputFrom";
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { Image } from "antd";
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import { useNavigate } from "react-router-dom";
import { useMutationHooks } from "../../hooks/UseMutationHook";

import * as UserService from '../../servives/UserService'
import Loading from "../../components/LoadingComponent/Loading";
import * as message from "../../components/MessageComponent/Message";

function SignUppage () {
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [isShowComfirmPassword, setIsShowComfirmPassword ] = useState(false)

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate()
    const mutation = useMutationHooks(
        data => UserService.registerUser(data)
     )
    const {data, isLoading, isSuccess, isError } = mutation

    useEffect(() => {
        if (isSuccess) {
          message.success()
          handleNavigateSignin()
        } else if (isError) {
          message.error()
        }
      }, [isSuccess, isError]);

    const handleOnchangeEmail = (value) => {
        setEmail(value)
    }

    const handleOnchangePassword = (value) => {
        setPassword(value)
    }

    const handleOnchangeConfirmPassword = (value)  => {
        setConfirmPassword(value)
    }

    const handleNavigateSignin = () => {
        navigate('/signin')
    }

    const handleSingup = () => {
        mutation.mutate({
            email,
            password,
            confirmPassword
        })
        console.log('data', email, password, confirmPassword)
    }
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.53)', height: '100vh'}}>
            <div style={{width: '800px', height: '445px', borderRadius: '6px', background: '#fff', display: 'flex'}}>
                <WrapperContainerLeft>
                    <h1>Xin chào</h1>
                    <p>Đăng ký tài khoản</p>
                    <InputForm 
                    style={{marginBottom: '10px'}} 
                    placeholder='abc@gmail.com'
                    value={email}
                    onChange={handleOnchangeEmail}
                    />
                    <div style={{ position: 'relative', marginBottom: '10px' }}>
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
                    <div style={{ position: 'relative' }}>
                        <span
                        onClick={() => setIsShowComfirmPassword(!isShowComfirmPassword)}
                        style={{
                            zIndex: 10,
                            position: 'absolute',
                            top: '4px',
                            right: '8px'
                        }}
                        >{
                            isShowComfirmPassword ? (
                            <EyeFilled />
                            ) : (
                            <EyeInvisibleFilled />
                            )
                        }
                        </span>
                        <InputForm
                        placeholder="comfirm password"
                        type={isShowComfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={handleOnchangeConfirmPassword}
                        />
                    </div>
                    {data?.status === 'ERR' && <span style={{color: 'red'}}>{data?.message}</span>}
                    <Loading isLoading={isLoading}>
                        <ButtonComponent
                        disabled={!email.length || !password.length || !confirmPassword.length}
                        onClick = {handleSingup}
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
                        textbutton={'Đăng ký'}
                        styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                        ></ButtonComponent>
                    </Loading>
                    <p>Bạn đã có tài khoản? 
                        <WrapperTextLight onClick={handleNavigateSignin}>Đăng Nhập</WrapperTextLight>
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

export default SignUppage;