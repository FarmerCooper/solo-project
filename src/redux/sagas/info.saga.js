import { put, takeLatest, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* getCoordinates(action) {
    try {
        let address = action.payload;
        let formatAddress = address.replace(/\s/g, '+');
        console.log('this is formatAddress', formatAddress);
      const coordinates = yield axios.get(`/api/coordinates/${formatAddress}`)
      yield put({type: 'FETCH_RESTAURANTS', payload: coordinates.data.results[0].geometry.location})
    } catch (error) {
      console.log('Error in GETting Coords', error)
    }
}

function* getRestrInfo(action) {
    try {
        console.log('in getRestrInfo, this is action', action.payload);
        const propertyValues = Object.values(action.payload)
        console.log(propertyValues)
      // gets the restaurant data
      const restaurant = yield axios.get(`/api/info/${propertyValues}`);
      // sets the restaurant in the reducer
      yield put({ type: "SET_RESTAURANTS", payload: restaurant.data.results });
      
  
    } catch (error) {
      console.log("Error in getRestrInfo", error);
    }
  }

function* infoSaga() {
    yield takeLatest('FETCH_GEOCODING', getCoordinates)
    yield takeLatest("FETCH_RESTAURANTS", getRestrInfo);
}
  
export default infoSaga;