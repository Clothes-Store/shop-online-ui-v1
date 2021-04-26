import React, { Component } from 'react';
import '../../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faMailBulk, faPhone } from '@fortawesome/free-solid-svg-icons';

export default class ContactBody extends Component {

    render() {
        return(
            <div className="ContactBody">
                <div className="contact-info">
                    <div className="contact-info-title">
                        Hãy đến với chúng tôi, chúng tôi sẽ mang lại cho bạn những bộ đồ khi mặc vào sẽ nhìn như người điên =]].
                    </div>
                    <div className="contact-info-detail">
                        <div className="contact-info-item">
                            <FontAwesomeIcon icon={faHome} className="contact-icon"/>
                            <p className="contact-info-title2">ADDRESS</p>
                            <p>144 Xuân Thủy, Cầu Giấy, Hà Nội</p>
                        </div>
                        <div className="contact-info-item">
                            <FontAwesomeIcon icon={faPhone} className="contact-icon"/>
                            <p className="contact-info-title2">phone</p>
                            <p>086 864 đoán tiếp xem</p>
                        </div>
                        <div className="contact-info-item">
                            <FontAwesomeIcon icon={faMailBulk} className="contact-icon"/>
                            <p className="contact-info-title2">email</p>
                            <p>mito.huna@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
