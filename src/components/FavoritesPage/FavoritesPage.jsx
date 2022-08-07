import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useReduxStore from "../../hooks/useReduxStore";

function FavoritesPage() {
  const store = useReduxStore();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_FAVORITES" });
  }, []);

  return (
    <div className="container">
      {store.favorites.map((favorite, i) => (
        <div key={i}>
          <p>{favorite.restr_name}</p>
          <img src={favorite.photos_url} alt="" />
        </div>
      ))}
    </div>
  );
}

export default FavoritesPage;
