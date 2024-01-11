import { Col, Image, Row } from "antd";
import ButtonComponent from '../ButtonComponent/ButtonComponent'

import {
    WrapperStyleImageSmall,
    WrapperStyleColImage,
    WrapperStyleNameProduct,
    WrapperStyleTextSell,
    WrapperPriceProduct,
    WrapperPriceText,
    WrapperQualityProduct,
    WrapperInputNumber,


} from './style'
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
function ProductDetailsComponent () {
    const onChange = () => {
        // Hàm xử lý khi giá trị thay đổi
    }

    return (
        <Row style={{padding: '16px', background: '#fff', borderRadius: '4px'}}>
            <Col span={12} style={{borderRight: '1px solid #e5e5e5', paddingRight: '8px'}}>
                <Image src='/image/image_product2.jpg' alt="image product" preview={false} />
                <Row style={{paddingTop: '10px', justifyContent: 'space-between'}}>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src='/image/image_product2.jpg' alt="image product" preview={false} />
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src='/image/image_product2.jpg' alt="image product" preview={false} />
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src='/image/image_product2.jpg' alt="image product" preview={false} />
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src='/image/image_product2.jpg' alt="image product" preview={false} />
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src='/image/image_product2.jpg' alt="image product" preview={false} />
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src='/image/image_product2.jpg' alt="image product" preview={false} />
                    </WrapperStyleColImage>
                </Row>
            </Col>
            <Col span={12} >
                <WrapperStyleNameProduct>Màn Hình Asrock CL25FF (IPS| 24.5 Inch| 100Hz| 1ms| FreeSync)</WrapperStyleNameProduct>
                <div>
                    <WrapperStyleTextSell>Mã SP: MH0000190 | Đánh giá: 14.8 | Bình luận: 0 | Lượt xem: 384</WrapperStyleTextSell>
                </div>
                <div>
                    <WrapperStyleTextSell>Bảo hành: 36 Tháng | Tình trạng: Còn hàng </WrapperStyleTextSell>
                </div>

                <WrapperPriceProduct>
                        <WrapperPriceText>2.490.000 đ</WrapperPriceText>
                        <WrapperStyleTextSell>Tiết kiệm 500.000đ</WrapperStyleTextSell>
                </WrapperPriceProduct>
                <div style={{ margin: '10px 0 20px', padding: '10px 0', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }}>
                        <div style={{ marginBottom: '10px' }}>Số lượng</div>
                        <WrapperQualityProduct>
                            <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} >
                                <MinusOutlined style={{ color: '#000', fontSize: '20px' }} />
                            </button>
                            <WrapperInputNumber onChange={onChange} defaultValue={1}  size="small" />
                            <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} >
                                <PlusOutlined style={{ color: '#000', fontSize: '20px' }} />
                            </button>
                        </WrapperQualityProduct>
                </div>
                <div style={{ display: 'flex', aliggItems: 'center', gap: '12px', justifyContent: 'center' }}>
                        <div>
                            <ButtonComponent
                                size={40}
                                styleButton={{
                                    background: 'rgb(255, 57, 69)',
                                    height: '48px',
                                    width: '220px',
                                    border: 'none',
                                    borderRadius: '4px'
                                }}
                                textbutton={'Chọn mua'}
                                styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                            ></ButtonComponent>
                        </div>
                        <ButtonComponent
                            size={40}
                            styleButton={{
                                background: '#fff',
                                height: '48px',
                                width: '220px',
                                border: '1px solid rgb(13, 92, 182)',
                                borderRadius: '4px'
                            }}
                            textbutton={'Mua trả sau'}
                            styleTextButton={{ color: 'rgb(13, 92, 182)', fontSize: '15px' }}
                        ></ButtonComponent>
                    </div>
                
            </Col>
        </Row>
    
    )
}

export default ProductDetailsComponent;

