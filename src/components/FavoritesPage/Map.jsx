import React, { useCallback, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  useLoadScript,
  MarkerF,
} from "@react-google-maps/api";
import useReduxStore from "../../hooks/useReduxStore";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: 44.9780,
  lng: -93.263,
};

const google_api_key = process.env.REACT_APP_MAPS_API_KEY;

function Map() {
  const store = useReduxStore();

  let locations = [];

  // if (store.favorites?.length > 0) {
  //   for (let i = 0; i < store.favorites.length; i++) {
  //     // console.log('this is all locations', store.favorites[i].place_location);

  //     locations.push(JSON.parse(store.favorites[i].place_location));
  //   }
  // }

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

  if (store.favorites) {
    for (let i = 0; i < store.favorites.length; i++) {
      // console.log('this is all locations', store.favorites[i].place_location);
      
      locations.push(JSON.parse(store?.favorites[i]?.place_location));
    }
  }

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
      {locations?.map((location, i) => {
        return <MarkerF key={i} position={{ lat: location.lat, lng: location.lng }} />;
      })}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default Map;
