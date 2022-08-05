import { put, takeLatest, takeEvery } from "redux-saga/effects";
import axios from "axios";
import useReduxStore from "../../hooks/useReduxStore";
import { useDispatch, useSelector } from 'react-redux';

function* getCoordinates(action) {
    try {
      const coordinates = yield axios.get(`/api/coordinates/${action.payload}`)
      yield put({type: 'FETCH_RESTAURANTS', payload: coordinates.data})
    } catch (error) {
      console.log('Error in GETting Coords', error)
    }
}

function* infoSaga() {
    yield takeLatest('FETCH_COORDINATES', getCoordinates)
    yield takeLatest("FETCH_RESTAURANTS", getRestrInfo);
}
  
export default infoSaga;