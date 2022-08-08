import React, { useCallback, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  useLoadScript,
  MarkerF,
} from "@react-google-maps/api";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: 39.098,
  lng: -94.578,
};

const google_api_key = process.env.REACT_APP_MAPS_API_KEY;

function Map() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: google_api_key,
    libraries: ["places"],
  });

  const [map, setMap] = useState(/** @type google.maps.Map */ (null));

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={4}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      }}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <MarkerF position={{ lat: 44, lng: -80 }} />
    </GoogleMap>
  ) : (
    <></>
  );
}

export default Map;
