import { Image, Col, InputNumber } from "antd";
import styled from "styled-components";

export const WrapperStyleImageSmall = styled(Image)`
    height: 64px;
    width: 64px;
`

export const WrapperStyleColImage = styled(Col)`
    flex-basis: unset;
    display: flex;
`
export const WrapperStyleNameProduct = styled.h1`
    font-size: 18px;
    line-height: 24px;
    text-transform: capitalize;
    margin-bottom: 12px;
`
export const WrapperStyleTextSell = styled.samp`
    font-size: 15px;
    line-height: 15px;
    margin-right: 10px;
    position: relative;
`
export const WrapperPriceProduct = styled.div`
    margin-top: 16px;
    padding: 16px;
    border: 1px solid #b8b8b8;
    color: #e31223;
    background: #f7f9fb;
    gap: 13px;
    margin-bottom: 16px;
`
export const WrapperPriceText = styled.div`
    font-size: 36px;
    font-weight: 600;
    line-height: 32px
`

export const WrapperQualityProduct = styled.div`
    display: flex;
    gap: 4px;
    align-items: center;
    width: 90px;
    border: 1px solid #ccc;
    border-radius: 4px;
`

export const WrapperInputNumber = styled(InputNumber)`
    &.ant-input-number.ant-input-number-sm {
        width: 40px;
        border-top: none;
        border-bottom: none;
        .ant-input-number-handler-wrap {
            display: none !important;
        }
    };
`