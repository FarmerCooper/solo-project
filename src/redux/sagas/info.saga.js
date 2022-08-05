import { put, takeLatest, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* getCoordinates(action) {
    try {
        let address = action.payload;
        let formatAddress = address.replace(/\s/g, '+');
        console.log('this is formatAddress', formatAddress);
      const coordinates = yield axios.get(`/api/coordinates/${formatAddress}`)
      yield put({type: 'FETCH_RESTAURANTS', payload: coordinates.data})
    } catch (error) {
      console.log('Error in GETting Coords', error)
    }
}

function* infoSaga() {
    yield takeLatest('FETCH_GEOCODING', getCoordinates)
    // yield takeLatest("FETCH_RESTAURANTS", getRestrInfo);
}
  
export default infoSaga;