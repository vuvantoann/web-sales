import { Image } from 'antd';
import React from 'react'
import { WrapperSliderStyle } from './style';

function SliderComponent({ arrImages }) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
      };

  return (
    <div>
    <WrapperSliderStyle {...settings}>
      {arrImages.map((image, index) => (
        <div key={index} style={{ paddingRight: '8px' }}>
          <Image src={image} alt={`slider-${index}`} preview={false} style={{ borderRadius: '8px' }} />
        </div>
      ))}
    </WrapperSliderStyle>
    </div>
  );
}

export default SliderComponent;
