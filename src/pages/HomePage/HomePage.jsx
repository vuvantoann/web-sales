import React, { useEffect, useRef } from "react";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import CardComponent from "../../components/CardComponent/CardComponent";
//import { useNavigate } from "react-router-dom";
import * as ProductService from '../../servives/ProductService'
import {
    WrapperTypeProduct,
    WrapperCart,
    WrapperButtonMore
} from './style'
import { useQuery } from "@tanstack/react-query";
import FooterComponent from "../../components/FooterComponent/FooterComponent";
import { useSelector } from "react-redux";
import { useState } from "react";
import Loading from "../../components/LoadingComponent/Loading";
import { useDebounceHooks } from "../../hooks/UseDebounceHook";

function HomePage () {
    const searchProduct = useSelector((state) => state?.product?.search)
    const searchDebounce = useDebounceHooks(searchProduct, 1000)
    const refSearch = useRef()
    const [loading, setLoading] = useState(false)
    const [stateProduct, setStateProduct] = useState([])
    const arr = ['Laptop', 'PC', 'Linh phụ kiện', 'Phím chuột', 'Thiết bị văn phòng']
    const image1 = "/image/slider1.webp";
    const image2 = "/image/slider2.webp";
    const image3 = "/image/slider3.webp";

    const fetchProductAll = async (search) => {
        //if(search.length > 0) {}
        const res =  await ProductService.getAllProduct(search)
        if(search?.length > 0 || refSearch?.current) {
            setStateProduct(res?.data)
        }else {
            return res
        }

    }

    useEffect(() => {
        if(refSearch.current){
            setLoading(true)
            fetchProductAll(searchDebounce)
        }
        refSearch.current = true
        setLoading(false)
    },[searchDebounce] )
    const {isLoading, data: products} = useQuery(['products'], fetchProductAll, {retry: 3, retryDelay: 1000})
   // const navigate = useNavigate();
   
   useEffect(() => {
    if(products?.data?.length > 0) {
        setStateProduct(products?.data)
    }
   },[products])
     
    
    return (
    <Loading isLoading={isLoading || loading}>
    <div style={{width: '1270px', margin: '0 auto'}}>
        <WrapperTypeProduct>
        {arr.map((item) => {
            return (
                <TypeProduct name={item} key={item}/>
            )
        })}
        </WrapperTypeProduct>
    </div>
    <div className='body' style={{ width: '100%', backgroundColor: '#efefef', }}>
        <div id="container" style={{height: '1500px', width: '1270px', margin: '0 auto'}}>
            <img src={'/image/background1.webp'} alt="background1" />
            <SliderComponent arrImages={[image1, image2, image3]}/>
            <WrapperCart>
                {stateProduct?.map((product) => (
                        <CardComponent 
                            key={product._id} 
                            countInStock={product.countInStock} 
                            description={product.description} 
                            image={product.image}
                            name={product.name}
                            price={product.price}
                            rating={product.rating}
                            type={product.type}
                            selled={product.selled}
                            discount ={product.discount}

                        />
                    ))
                }
            </WrapperCart>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
            <WrapperButtonMore
                textbutton= "Xem thêm" type="outline" styleButton={{
                    border: '1px solid rgb(11, 116, 229) ', color: 'rgb(11, 116, 229)',
                    width: '240px', height: '38px', borderRadius: '4px'
                }}
                styleTextButton={{fontWeight: 500}} 
            />
            </div >
        </div>
    </div>
    <div id="containerFooter" style={{ width: '1270px', margin: '0 auto'}}>                
        <FooterComponent />
    </div>
    </Loading>
    )
}

export default HomePage;