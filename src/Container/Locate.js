import React, { useEffect, useState } from 'react'
import Axios from 'axios'

const { compose } = require("recompose");
const {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
} = require("react-google-maps");
const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel");

const MapWithAMarkerWithLabel = compose(
    withScriptjs,
    withGoogleMap
)(props =>
    <GoogleMap
        defaultZoom={20} defaultOptions={{draggable : false, scrollWheel : false, gestureHandling : 'greedy'}}
        defaultCenter={{ lat: props.latitude, lng: props.longitude }}
    >
        <MarkerWithLabel
            position={{ lat: props.latitude, lng: props.longitude }}
            labelAnchor={{ lat: props.latitude, lng: props.longitude }}
            labelStyle={{ backgroundColor: "green", color :"white", fontSize: "16px", padding: "16px", borderRadius : '10%'}}
        >
            <div>Hello There!</div>
        </MarkerWithLabel>
    </GoogleMap>
);

const Locate = (props) => {
    const [state, setState] = useState({
        latitude: null, longitude: null
    })
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setState({ ...state, latitude: position.coords.latitude, longitude: position.coords.longitude })
        })
    }, [])
    return (
        <MapWithAMarkerWithLabel latitude={state.latitude} longitude={state.longitude}
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAZT4BTDagvDaXOI3PETfqh77bLyEaU4CI&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
        />
    )
}

export default Locate