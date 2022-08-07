import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useReduxStore from "../../hooks/useReduxStore";

function FavoritesPage() {
  const store = useReduxStore();

  const dispatch = useDispatch();

  const [inputRating, setInputRating] = useState(0)

  useEffect(() => {
    dispatch({ type: "FETCH_FAVORITES" });
  }, []);

  const handleDelete = (event) => {
    console.log('in handleDelete, place_id:', event.target.value);

    dispatch({type: "VANISH_ITEM", payload: event.target.value});
  }

  const handleEdit = (event) => {
    console.log('in handleDelete, place_id:', event.target.value);
    console.log('this is the current rating', inputRating)

    dispatch({type: "EDIT_RATING", payload: {place_id: event.target.value, rating: inputRating}});
  }

  return (
    <div className="container">
      {store.favorites.map((favorite, i) => (
        <div key={i}>
          <p>{favorite.restr_name}</p>
          <p>{favorite.user_rating}</p>
          <input 
          type="number" 
          onChange={event => setInputRating(event.target.value)} 
          />
          <button
          onClick={event => handleEdit(event)}
          value={[favorite.place_id]}
          >Edit
          </button>
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
