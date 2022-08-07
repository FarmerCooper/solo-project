import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";

function FavoritesPage() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_FAVORITES" });
  }, []);

  return (
    <div className="container">
      <div>
        <p>This will contain a Google search feature!</p>
      </div>
    </div>
  );
}

export default FavoritesPage;