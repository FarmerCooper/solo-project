import { put, takeLatest, takeEvery } from "redux-saga/effects";
import axios from "axios";
import useReduxStore from "../../hooks/useReduxStore";
import { useDispatch, useSelector } from 'react-redux';


function* infoSaga() {
    yield takeLatest('FETCH_COORDINATES', getCoordinates)
    yield takeLatest("FETCH_RESTAURANTS", getRestrInfo);
}
  
export default infoSaga;