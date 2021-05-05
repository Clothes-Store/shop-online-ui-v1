import React, { useState } from 'react';
import '../../App.css';
import ProductQuickView from './ProductQuickView';
import ProductOverlay from './ProductOverlay'
import { withRouter } from 'react-router-dom'
import {URL_IMAGE_BASE} from '../../config'

function Product(props) {

    const [hover, setHover] = useState(false);
    const [view, setView] = useState(false);
    const product = props.product;
    console.log({product})

    const closeView = (event) => {
        document.body.style.overflow = 'unset';
        setView(false)
    }
    const openView = () => {
        setView(true)
    }
    if(view){
        document.body.style.overflow = 'hidden';
    } 

    const redirect = (target) => {
        window.scrollTo(0,0);
        props.history.push(`/products/${product.id}`);
        console.log({url: `/products/${product.id}`})
    }

    let productDate = new Date(product.created) 
    let today = new Date()
 
    return(
        <div 
            className={`Product opa`}
            style={{ 
                width: `calc(${props.width} - 30px)`,
                height: `${props.parentHeight}`,
            }}
        >
            <ProductQuickView 
                view={view} 
                closeView={closeView}
                product={product}
            />
            <div className="product-img"
                style={{ 
                    height: `${props.height}`,
                }}
                onMouseOver={()=> {setHover(true)}}
                onMouseOut={()=> {setHover(false)}}
                >
                <div className="product-tag">
                    {
                        product.sale > 0 && <div className="product-tag-item sale">
                            {product.sale}%
                        </div>
                    }
                    {/* {
                        product.productSold > 40 && <div className="product-tag-item hot">
                            HOT
                        </div>
                    } */}
                    {
                        (today - productDate)/ (1000 * 3600 * 24) < 10 && <div className="product-tag-item new">
                            NEW
                        </div>
                    }
                </div>
                <div    
                    className="product-img-bg"
                    onClick={redirect}>
                    <img 
                        className=""
                        src={`${URL_IMAGE_BASE}/${product.imgs[0].img.replace('public\\', '').replaceAll('\\','/')}`} alt=""></img>
                    <img 
                        className={hover == false ? "img-defalt hide" : "img-defalt"}
                        src={`${URL_IMAGE_BASE}/${product.imgs[1].img.replace('public\\', '').replaceAll('\\','/')}`} alt=""></img>
                </div>
                <ProductOverlay
                    product={product}
                    openView={openView}
                />
            </div>
            <div className="product-title">
                {product.name}
            </div>
            <div className="product-price">
                    <p>{product.current_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} Đ</p>
                </div>
            {/* {
                product.productFinalPrice < product.productPrice &&
                <div className="product-price flex-center">
                    <p style={{textDecoration: 'line-through', color: '#777', marginRight: '10px'}}>{product.productPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} Đ</p>
                    <p>{product.productFinalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} Đ</p>
                </div>
            } */}
            {/* {
                product.productFinalPrice == product.productPrice &&
                <div className="product-price">
                    <p>{product.productFinalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} Đ</p>
                </div>
            } */}
        </div>
    )
}
export default withRouter(Product);