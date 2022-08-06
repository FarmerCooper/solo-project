import { put, takeLatest, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* getFavorites() {
    console.log('in getFavorites');
}

function* favoritesSaga() {
    yield takeEvery("FETCH_FAVORITES", getFavorites);
  }
  
  export default favoritesSaga;