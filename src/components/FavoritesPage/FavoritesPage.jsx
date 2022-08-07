import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useReduxStore from "../../hooks/useReduxStore";

function FavoritesPage() {
  const store = useReduxStore();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_FAVORITES" });
  }, []);

  const handleDelete = (event) => {
    console.log('in handleDelete, place_id:', event.target.value);

    dispatch({type: "VANISH_ITEM", payload: event.target.value});
  }

  return (
    <div className="container">
      {store.favorites.map((favorite, i) => (
        <div key={i}>
          <p>{favorite.restr_name}</p>
          <p>{favorite.user_rating}</p>
          <img src={favorite.photos_url} alt="" />
          <button
          onClick={event => handleDelete(event)}
          value={[favorite.place_id]}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default FavoritesPage;
