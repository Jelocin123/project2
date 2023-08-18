import { useEffect, useState, useRef } from 'react'
import Error from '../../components/Error'
import Loader from '../../components/Loader'


//import request-hook
import useRequestData from '../../hooks/useRequestData'


//MAP - Leaflet kort
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './leafletmap.scss'
//map-icon
import icon from 'leaflet/dist/images/marker-icon.png'

let DefaultIcon = L.icon({
  iconUrl: icon,
  iconSize: [24,36],
  iconAnchor: [12,36],
  className: 'marker-style'
})

L.Marker.prototype.options.icon = DefaultIcon;

const LeafletMap = ({ coordinates})=> {

    const mapRef = useRef()

    const markerRef = useRef
    
    
    useEffect(() => {
      
        if (!mapRef.current) {

            mapRef.current = L.map('mapcontainer').setView(coordinates, 12);
    
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo( mapRef.current );
            markerRef.current = L.marker(coordinates).addTo(mapRef.current)
        } else {

            mapRef.current.setView(coordinates, 13)
            markerRef.current.setLatLng(coordinates)

        }
    
      
      
    }, [coordinates])
    


    return (
        <div id='mapcontainer' style={{ width: '300px', height: '300px'}}>Kortet loader ...</div>
    )
}

export default LeafletMap