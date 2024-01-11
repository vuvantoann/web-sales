import React from 'react'
import { WrapperInputStyle } from './style'

const InputForm = (props) => {
    const { placeholder = 'Nhập text', onChange, ...rests } = props;

    const handleOnchangeInput = (e) => {
        if (typeof onChange === 'function') {
            onChange(e.target.value);
        }
    }

    return (
        <WrapperInputStyle placeholder={placeholder} value={props.value} {...rests} onChange={handleOnchangeInput} />
    )
}


export default InputForm