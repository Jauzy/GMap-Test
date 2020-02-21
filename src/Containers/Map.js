import React from 'react'

//import { GoogleMap, withScriptjs, withGoogleMap, Marker } from 'react-google-maps'
import mapStyle from '../mapStyle'

const { compose, withProps, lifecycle } = require("recompose");
const {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    DirectionsRenderer,
} = require("react-google-maps");

const MapWithADirectionsRenderer = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAZT4BTDagvDaXOI3PETfqh77bLyEaU4CI",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `100%` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap,
    lifecycle({
        componentDidMount() {
            const DirectionsService = new window.google.maps.DirectionsService();
            DirectionsService.route({
                origin: new window.google.maps.LatLng(-6.912636, 107.602476),
                destination: new window.google.maps.LatLng(-6.918851, 107.625925),
                travelMode: window.google.maps.TravelMode.TRANSIT,
            }, (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    console.log(result)
                    this.setState({
                        directions: result,
                    });
                } else {
                    console.error(`error fetching directions ${result}`);
                }
            });
        }
    })
)(props =>
    <GoogleMap
        defaultZoom={15}
        defaultOptions={{ styles: null }}
    >
        {props.directions && <DirectionsRenderer directions={props.directions} />}
    </GoogleMap>
);

export default MapWithADirectionsRenderer