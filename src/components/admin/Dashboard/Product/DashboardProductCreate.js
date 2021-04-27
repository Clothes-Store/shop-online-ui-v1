import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import {URL_API_BASE, URL_IMAGE_BASE} from '../../../../config'

export default function DashboardProductCreate(props) {

    const createForm = useRef();
    const cateInput = useRef();
    const groupCateInput = useRef();
    const [isCheckedSmall, setIsCheckedSmall] = useState(false);
    const [isCheckedMedium, setIsCheckedMedium] = useState(false);
    const [isCheckedLarge, setIsCheckedLarge] = useState(false);
    const [inputValue, setInputValue] = useState([])
    const [cate, setCate] = useState([])
    const [cateValue, setCateValue] = useState(0)
    const [size, setSize] = useState([])
    const [sex, setSex] = useState("")
    const [file, setFile] = useState([])
    const [productGroupCate, setProductGroupCate] = useState("")
    const [productGroupCateList, setProductGroupCateList] = useState([])

    const [productImg, setProductImg] = useState([])

    const checkedSize = (event) => {
        if (event.target.id == "1") {
            if (isCheckedSmall) {
                setIsCheckedSmall(false)
            } else {
                setSize(size=>[...size, 'Small'])
                setIsCheckedSmall(true)
            }
        }
        if (event.target.id == "2") {
            if (isCheckedMedium) {
                setIsCheckedMedium(false)
            } else {
                setSize(size=>[...size, 'Medium'])
                setIsCheckedMedium(true)
            }
        }
        if (event.target.id == "3") {
            if (isCheckedLarge) {
                setIsCheckedLarge(false)
            } else {
                setSize(size=>[...size, 'Large'])
                setIsCheckedLarge(true)
            }
        }
    }

    const handleOnChange = (event) => {
        setInputValue({...inputValue, [event.target.name]: event.target.value})
    }

    const setCateV2 = (event) => {
        let cate_id = 1;
        for(let i =0; i<cate.length; i++){
            if(cate[i].name == event.target.value){
                cate_id=cate[i].id;
                break;
            }
        }
        setCateValue(cate_id)
    }
    
    useEffect(()=> {
        axios.get(`${URL_API_BASE}/product`)
            .then(res => {
                res.data = res.data.data
                const test = Object.values(res.data.reduce((a, {category_name}) => {
                    a[category_name] = a[category_name] || {category_name};
                    return a;
                }, Object.create(null)));
                setProductGroupCateList(test)
            }
        )
        axios.get(`${URL_API_BASE}/category`)
            .then(res => {
                res.data = res.data.data
                setCate(res.data)
            }) 
    },[])

    const onSubmit = (event) => {
        event.preventDefault()
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        const formData = new FormData();

        const imageArr = Array.from(file);
        imageArr.forEach(image => {
            formData.append('images', image);
        });

        formData.append("name", inputValue.name);
        formData.append("sale", inputValue.sale);
        formData.append("current_price", inputValue.price);
        formData.append("category_id", cateValue);
        formData.append("description", inputValue.des);
        formData.append("type", sex);
        axios.post(`${URL_API_BASE}/product`, formData, config)
        .then(()=>{
            props.setCloseCreateFunc(false);
            props.setToastFunc(true);
        })
    }

    const addNewCate = () => {
        axios.post(`${URL_API_BASE}/category`, {
            name: inputValue.cate
        })
        setCate(cate=>[...cate, {name: inputValue.cate}])
        setCateValue(inputValue.cate)
        cateInput.current.value = ""
    }

    const addNewGroupCate = () => {
        setProductGroupCate(inputValue.groupCate)
        setProductGroupCateList(productGroupCateList => [...productGroupCateList, {productGroupCate: inputValue.groupCate}])
        groupCateInput.current.value = ""
    } 

    const deleteImg = (event) => {
        const virutalFile = [...file]
        virutalFile.splice(event.target.id, 1)
        setFile(virutalFile)

        const items = [...productImg]
        items.splice(event.target.id, 1)
        setProductImg(items)
    }

    return (
        <div className="DashboardProductInfo">
            <div className="create-box"> 
                <div className="create-box-title flex">
                    <div className="create-box-title-text">
                        Product infomation
                    </div>
                    <div  
                        className="create-box-title-close flex-center"
                        onClick={()=>{
                            props.setCloseCreateFunc(false);
                        }}
                    >
                        <FontAwesomeIcon icon={faTimes}/>
                    </div>
                </div>
                <form onSubmit={onSubmit} encType="multipart/form-data" ref={createForm}>
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Name</div>
                        <div className="dashboard-right">
                            <input type="text" name="name" onChange={handleOnChange} required></input>
                        </div>
                    </div>
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Images </div>
                        <div className="dashboard-right">
                            <input 
                                onChange={(event) => {
                                    const files = event.target.files;
                                    for (let i = 0; i< files.length; i++) {
                                        setProductImg(product=>[...product, URL.createObjectURL(files[i])])
                                    }
                                    const fileArr = Array.prototype.slice.call(files)
                                    fileArr.forEach(item=>{
                                        
                                        setFile(file=>[...file, item])
                                    })
                                }}
                                type="file"
                                name="images"
                                className="noborder"
                                multiple="multiple"
                                style={{height: '50px'}}
                            ></input>
                            <div className="flex" style={{ overflowY: 'hidden', flexWrap:'wrap'}}>
                                { productImg && 
                                    productImg.map((item, index) => {
                                        return (
                                            <div key={index} className="create-box-img">
                                                <img key={index} src={item} alt=""></img>
                                                <div 
                                                    className="create-box-img-overlay"
                                                >
                                                    <p
                                                        id={index}
                                                        onClick={deleteImg}
                                                        className="icon">X
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Defaut price </div>
                        <div className="dashboard-right">
                            <input type="number" name="price" placeholder="Price" onChange={handleOnChange} required></input>
                        </div>
                    </div>
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Sale off </div>
                        <div className="dashboard-right flex-center">
                            <input type="number" placeholder="%" style={{ width: "100px"}} onChange={handleOnChange} name="sale" required></input>
                            {/* <label>From: </label>
                            <input type="date"  name="fromdate" onChange={handleOnChange} placeholder="dd/mm/yyyy" pattern="(^(((0[1-9]|1[0-9]|2[0-8])[\/](0[1-9]|1[012]))|((29|30|31)[\/](0[13578]|1[02]))|((29|30)[\/](0[4,6,9]|11)))[\/](19|[2-9][0-9])\d\d$)|(^29[\/]02[\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)"/>
                            <label>To: </label>
                            <input type="date"  name="todate" onChange={handleOnChange} placeholder="dd/mm/yyyy" pattern="(^(((0[1-9]|1[0-9]|2[0-8])[\/](0[1-9]|1[012]))|((29|30|31)[\/](0[13578]|1[02]))|((29|30)[\/](0[4,6,9]|11)))[\/](19|[2-9][0-9])\d\d$)|(^29[\/]02[\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)"/> */}
                        </div>
                    </div>
                    {/* <div className="create-box-row flex">
                        <div className="dashboard-left flex">Category group</div>
                        <div className="dashboard-right flex-center">
                            <select style={{ width: "350px"}} 
                                onChange={(event) => {setProductGroupCate(event.target.value)}}
                                value={productGroupCate}
                            >
                                { productGroupCateList.length > 0 &&
                                    productGroupCateList.map((item, index) => {
                                        return(
                                            <option key={index}>{item.category_name}</option>
                                        )
                                    })
                                }
                            </select>
                            <input type="text" name="groupCate" placeholder="New category group?" style={{  margin:'0 10px'}} onChange={handleOnChange} ref={groupCateInput}></input>
                            <div className="btn" style={{
                                fontSize: '14px',
                                fontFamily: 'sans-serif',
                                fontWeight: '300',
                                padding: '0 10px',
                                cursor: 'pointer',
                                width: '350px',
                                height: '30px'
                            }}
                            onClick={addNewGroupCate}>
                                Add
                            </div>
                        </div>
                    </div> */}
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Category </div>
                        <div className="dashboard-right flex-center">
                            <select style={{ width: "350px"}} 
                                onChange={(event) => {setCateV2(event)}}
                                >
                                <option></option>
                                { cate.length > 0 &&
                                    cate.map((item, index) => {
                                        return(
                                            <option key={index}>{item.name}</option>
                                        )
                                    })
                                }
                            </select>
                            <input type="text" name="cate" placeholder="New category?" style={{  margin:'0 10px'}} onChange={handleOnChange} ref={cateInput}></input>
                            <div className="btn" style={{
                                fontSize: '14px',
                                fontFamily: 'sans-serif',
                                fontWeight: '300',
                                padding: '0 10px',
                                cursor: 'pointer',
                                width: '350px',
                                height: '30px'
                            }}
                            onClick={addNewCate}>
                                Add
                            </div>
                        </div>
                    </div>
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Type </div>
                        <div className="dashboard-right flex">
                            <select style={{ width: "200px"}} 
                                onChange={(event) => {setSex(event.target.value)}}
                                value={sex}
                                required>
                                <option></option>
                                <option>Man</option>
                                <option>Woman</option>
                            </select>
                        </div>
                    </div>
                    {/* <div className="create-box-row flex">
                        <div className="dashboard-left flex">Size </div>
                        <div className="dashboard-right flex">
                            <div 
                                className={isCheckedSmall ? "size-check isChecked" : "size-check"}
                                id="1" 
                                onClick={checkedSize}>Small</div>
                            <div 
                                className={isCheckedMedium ? "size-check isChecked" : "size-check"}
                                id="2" 
                                onClick={checkedSize}>Medium</div>
                            <div 
                                className={isCheckedLarge ? "size-check isChecked" : "size-check"}
                                id="3" 
                                onClick={checkedSize}>Large</div>
                        </div>
                    </div> */}
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Description </div>
                        <div className="dashboard-right">
                            <input type="text" name="des" onChange={handleOnChange} required></input>
                        </div>
                    </div>

                    <div className="flex-center" style={{marginTop: '40px'}}>
                    <button className="create-box-btn btn">
                        Add product
                    </button>
                </div>
                </form>
            </div>
        </div>
    )
}