import { put, takeLatest, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* getDrools() {
    console.log('in getDrools');

    try {
        const response = yield axios.get('/userDrools');
        yield put({type: "SET_DROOLS", payload: response.data});
    } catch (error) {
        console.log('Error GETting drools', error);
    }

}

function* postDrools(action) {
    let myArray = action.payload.split(/[,]+/);
    console.log('in postDrools, action.payload:', myArray)

    try {
        yield axios.post('/userDrools', myArray);
    } catch (error) {
        console.log('Error in POSTing to drools', error);
    }
}

function* droolsSaga() {
    yield takeEvery("POST_DROOL", postDrools);
    yield takeLatest("FETCH_DROOLS", getDrools)
}
  
export default droolsSaga;