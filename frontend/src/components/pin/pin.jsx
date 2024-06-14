import './pin.scss'
import {Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
// doesn't include the marker image files

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

function Pin({ item }){
  return (
    <Marker position={[item.latitude, item.longitude]}>
      <Popup>
        <div className="popupContainer">
          <img src={item.img} alt=""/>
          <div className="textContainer">
            <Link to={`/${item.id}`}>{item.title}</Link>
            <span className='bed'>{item.bedroom} Bedroom</span>
            <span> $ {item.price}</span>

          </div>
        </div>
      </Popup>
   </Marker>  
  )
}

export default Pin