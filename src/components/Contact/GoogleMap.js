import React, { Component } from 'react';
import '../../App.css';

class GoogleMap extends Component {
    render() {
        return (
            <div className="google-map">
                <iframe 
                    title="map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.8956504034536!2d105.7801041154025!3d21.036860892876646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454caaf9fa467%3A0x4cfd76cf514e1ce1!2zMTQ0IFh1w6JuIFRo4buneSwgTWFpIEThu4tjaCwgQ-G6p3UgR2nhuqV5LCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1619453500559!5m2!1svi!2s" 
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    aria-hidden="false" 
                    tabIndex="0"/>
            </div>
        );
    }
}

export default GoogleMap;