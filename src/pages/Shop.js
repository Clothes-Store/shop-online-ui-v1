import React, { useEffect, useState } from "react";
import "../App.css";
import Newsletter from "../components/Layouts/Newsletter.js"
import Footer from "../components/Layouts/Footer.js"
import BannerV2 from '../components/Banner/BannerV2.js'
import Header from '../components/Header/Header.js'
import ShopBody from "../components/Shop/ShopBody";
import bg from '../assets/S3.jpg'
import axios from 'axios'
import { withRouter } from "react-router-dom";
import {URL_API_BASE} from '../config'

function Shop(props) {

    const [products, setProducts] = useState([]);
    const [sortedCate, setSortedCate] = useState([]);
    let sex = props.location.pathname.split('/')[1]
    let cate = props.location.pathname.split('/')[2] 

    useEffect(()=>{
        window.scrollTo(0,0);
        document.body.style.overflow = 'unset';
    },[])

    useEffect(() => {
        if (sex == "shop") { 
            axios.get(`${URL_API_BASE}/product`)
            .then(res => {   
                res.data = res.data.data
                const virtualCate = [...res.data] 
                //Get all category
                const sortedcate = Object.values(virtualCate.reduce((a, {category_name,category_id}) => {
                    a[category_id] = a[category_id] || {category_name,category_id, count: 0};
                    a[category_id].count++;
                    return a;
                }, Object.create(null)));
                //Sort and splice category by posts count
                sortedcate.sort((a,b) =>  b.count - a.count)
                setSortedCate(sortedcate)
                const virtualData = []
                for(let i in res.data) { 
                    if (cate) { 
                        if ((res.data[i].category_id.toString()).toLowerCase() == (cate.toLowerCase())) {
                            virtualData.push(res.data[i])
                        } 
                    } else {
                        virtualData.push(res.data[i])
                    } 
                }
                setProducts(virtualData)
            })
        } else {
            sex.toLowerCase() == "men" ? sex = "man" : sex = "woman"
            axios.get(`${URL_API_BASE}/product`)
                .then(res => {
                    res.data =  res.data.data
                    const virtualCate = []
                    for (let i in res.data) {
                        if (sex == "woman") {
                            if (res.data[i].type == "Woman") {
                                virtualCate.push(res.data[i])
                            } 
                        } else {
                            if (res.data[i].type == "Man") {
                                virtualCate.push(res.data[i])
                            } 
                        }
                    }
                    //Get all category
                    const sortedcate = Object.values(virtualCate.reduce((a, {category_id}) => {
                        a[category_id] = a[category_id] || {category_id, count: 0};
                        a[category_id].count++;
                        return a;
                    }, Object.create(null)));
                    //Sort and splice category by posts count
                    sortedcate.sort((a,b) =>  b.count - a.count)
                    setSortedCate(sortedcate)
                    
    
                    const virtualData = []
                    for(let i in res.data) { 
                        if (!cate) {
                            if (res.data[i].type.toLowerCase() == sex) {
                                virtualData.push(res.data[i])
                            }
                        } else {
                            if (res.data[i].type.toLowerCase() == sex && cate && res.data[i].productGroupCate.toLowerCase().split(' ').join('-') == cate) {
                                virtualData.push(res.data[i])
                            } else if (res.data[i].type.toLowerCase() == sex && cate && res.data[i].productCate.toLowerCase().split(' ').join('-') == cate) {
                                virtualData.push(res.data[i])
                            }
                        }
    
                    }
                    setProducts(virtualData)
                }
            )
        }
    },[sex, cate]) 
    
    return (
        <div className="Men">
            <Header/>
            <BannerV2 bannerImage={bg} position={'120px'}/>
            <ShopBody
                products={products}
                sortedCate={sortedCate}
            />
            {/* <Newsletter/> */}
            <Footer/>
        </div>
    )
}
export default withRouter(Shop);
