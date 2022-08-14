import { put, takeLatest, takeEvery } from "redux-saga/effects";
import axios from "axios";

// Gets user specific data
function* getDrools() {
    // console.log('in getDrools');

    try {
        const response = yield axios.get('/userDrools');
        yield put({type: "SET_DROOLS", payload: response.data});
    } catch (error) {
        console.log('Error GETting drools', error);
    }

}

// Saves data to the database
function* postDrools(action) {
    // Splits to allow action.payload to be separated
    let myArray = action.payload.split(/[,]+/);
    // console.log('in postDrools, action.payload:', myArray)

    try {
        yield axios.post('/userDrools', myArray);
    } catch (error) {
        console.log('Error in POSTing to drools', error);
    }
}

// Deletes item from table
function* deleteDrool(action) {
    // console.log('in deleteDrool, action.payload:', action.payload);

    try {
        yield axios.delete(`/userDrools/${action.payload}`);
        yield put({type: "FETCH_DROOLS", getDrools});
    } catch (error) {
        console.log('Error in POSTing to drools', error);
    }
}

// Listens for dispatches
function* droolsSaga() {
    yield takeEvery("POST_DROOL", postDrools);
    yield takeLatest("FETCH_DROOLS", getDrools);
    yield takeEvery("VANISH_THOU", deleteDrool);
}
  
export default droolsSaga;