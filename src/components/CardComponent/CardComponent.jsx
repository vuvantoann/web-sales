import React from 'react';
import { StarFilled } from '@ant-design/icons'

import {
    WrapperCardStyle,
    StyleNameProduct,
    WrapperPriceText,
    WrapperDiscounText,
    WrapperReportText,
    WrapperStyleTextSell
} from './style'

function CardComponent (props) {
    const {countInStock, description, image, name, price, rating, type, selled, discount } = props
    return (
    <WrapperCardStyle
        hoverable
        headStyle={{ width: '200px', height: '200px'}}
        style={{ width: 240 }}
        bodyStyle={{padding: '10px', }}
        cover={<img alt="example" src="/image/image_product1.png" />}
    >
        <StyleNameProduct>{name}</StyleNameProduct>
        <WrapperReportText>
                <span style={{ marginRight: '4px' }}>
                    <span>{rating}</span> <StarFilled style={{ fontSize: '12px', color: 'rgb(253, 216, 54)' }} />
                </span>
                <WrapperStyleTextSell> | Da ban {selled || 1000}+</WrapperStyleTextSell>
            </WrapperReportText>
        <WrapperPriceText>
            <span style={{marginRight: '8px'}}>{price.toLocaleString()}</span>
            <WrapperDiscounText>
            -{discount || 9} %
            </WrapperDiscounText>
        </WrapperPriceText>
    </WrapperCardStyle>
    )
}

export default CardComponent;