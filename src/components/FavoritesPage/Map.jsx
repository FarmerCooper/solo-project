import React, { useCallback, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  useLoadScript,
  MarkerF,
} from "@react-google-maps/api";
import useReduxStore from "../../hooks/useReduxStore";

const containerStyle = {
  width: "600px",
  height: "440px",
  float: 'right',
};

const center = {
  lat: 44.9780,
  lng: -93.263,
};

// Map styling
var stylers = [{
  "stylers": [{ 
     "hue": "#FAF1E6"
   }, {
     "saturation": 0
   }, {
     "lightness": 20
   }, {
    "contrast": 10
  }, {"marker": 'p'}]
}];

// Brings the env variables from .env file
const google_api_key = process.env.REACT_APP_MAPS_API_KEY;

function Map() {
  const store = useReduxStore();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: google_api_key,
    libraries: ["places"],
  });

  const [map, setMap] = useState(/** @type google.maps.Map */ (null));

  const onLoad = useCallback(function callback(map, locations) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  let locations = [];

    for (let i = 0; i < store.coordinates.length; i++) {
      // console.log('this is all locations', store.coordinates[i]);

      // Sets the markers for the JS Google API
      locations.push(store.coordinates[i]);
    }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        styles: stylers,
        zoom: 5,
        center: center
      }
      }
    >
      {/* Child components, such as markers, info windows, etc. */}
      {locations?.map((location, i) => {
        return  <MarkerF key={i} position={{ lat: location.lat, lng: location.lng }} />;
      })}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default Map;
