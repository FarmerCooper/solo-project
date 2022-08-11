import { put, takeLatest, takeEvery } from "redux-saga/effects";
import axios from "axios";

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
}
  
export default droolsSaga;