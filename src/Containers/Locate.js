import React, { useEffect, useState, useRef } from 'react'
import Axios from 'axios'

import Cookies from 'universal-cookie'

const cookies = new Cookies()

function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

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
        defaultZoom={20} defaultOptions={{ draggable: false, scrollWheel: false, gestureHandling: 'greedy' }}
        defaultCenter={{ lat: props.latitude, lng: props.longitude }}
    >
        {props.usersLoc ? props.usersLoc.map((user, index) => (
            <MarkerWithLabel key={index}
                position={{ lat: user.latitude, lng: user.longitude }}
                labelAnchor={{ lat: user.latitude, lng: user.longitude }}
                labelStyle={{ backgroundColor: "green", color: "white", fontSize: "16px", padding: "16px", borderRadius: '10%' }}
            >
                <div>{user.name}</div>
            </MarkerWithLabel>
        )) : null}
    </GoogleMap>
);

const Locate = (props) => {
    const [state, setState] = useState({
        latitude: 0, longitude: 0, cookies: null, usersLoc: null
    })

    useInterval(() => {

    }, 1000)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setState({ ...state, latitude: position.coords.latitude, longitude: position.coords.longitude, cookies: cookies.get('SESSION') })
        })
    }, [])

    useEffect(() => {
        if (state.cookies) {
            Axios.post('https://user-tracking-268910.appspot.com/users/track', { email: state.cookies.email, password: state.cookies.password, latitude: state.latitude, longitude: state.longitude })
                .catch(err => console.log(err))
            Axios.get('https://user-tracking-268910.appspot.com/users/location')
                .then(response => {
                    setState({ ...state, usersLoc: response.data.data })
                })
        }
    })

    return (
        <MapWithAMarkerWithLabel latitude={state.latitude} longitude={state.longitude} usersLoc={state.usersLoc}
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAZT4BTDagvDaXOI3PETfqh77bLyEaU4CI&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
        />
    )
}

export default Locate