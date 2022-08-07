import { put, takeLatest, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* getFavorites() {
    console.log('in getFavorites');

    try {
        const response = yield axios.get('/userFavorites');
        yield put({ type: "SET_RESTAURANTS", payload: response.data,});
      } catch (error) {
        console.log("Error in GETting favorites", error);
      }
}

function* postFavorites(action) {
    let myArray = action.payload.split(/[,]+/);
    console.log('in postFavorites, action.payload:', myArray)

    try {
        yield axios.post('/userFavorites', myArray);
    } catch (error) {
        console.log('Error in POSTing to favorites', error);
    }
}

function* editRating(action) {
    console.log('in editRating, action.payload:', action.payload);

    try {
        yield axios.put('/userFavorites', action.payload);
        yield window.location.reload();
    } catch (error) {
        console.log('Error UPDATEing rating', error);
    }
}

function* deleteFavorite(action) {
    console.log('in deleteFavorite, action.payload:', action.payload);

    try {
        yield axios.delete(`/userFavorites/${action.payload}`);
        yield put({type: "FETCH_FAVORITES"});
    } catch (error) {
        console.log('Error in deleteFavorite', error);
    }
}

function* favoritesSaga() {
    yield takeEvery("FETCH_FAVORITES", getFavorites);
    yield takeEvery("POST_FAVORITE", postFavorites);
    yield takeEvery("VANISH_ITEM", deleteFavorite);
    yield takeLatest("EDIT_RATING", editRating);
}
  
export default favoritesSaga;