import React, { useState } from "react";
import { useDispatch } from "react-redux";
import useReduxStore from "../../hooks/useReduxStore";
import axios from "axios";
import swal from 'sweetalert';

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function HomePage(props) {
  const dispatch = useDispatch();
  const store = useReduxStore();

  const [address, setAddress] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch({ type: "FETCH_GEOCODING", payload: address });
  };

  const addToFavorites = (event) => {
    console.log("this is event.target", event.target.value);

    dispatch({ type: "POST_FAVORITE", payload: event.target.value });
    swal("Favorites", "Added to favorites!", "success");
  };

  const addToDroolList = (event) => {
    console.log("this is event.target", event.target.value);

    dispatch({ type: "POST_DROOL", payload: event.target.value });
    swal("👅 💦", "Added to Drool List", "success");
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Address"
            onChange={(event) => setAddress(event.target.value)}
            value={address}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      <TableContainer sx={{height: 500, width: 1000, overflow: "hidden", overflowY: "scroll"}} className = 'container' component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Restaurant</TableCell>
              <TableCell>Rating / #ofRatings</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {store.restaurants.map((restaurant, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {restaurant.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {restaurant.rating} ⭐️ / {restaurant.user_ratings_count}
                </TableCell>
                <TableCell component="th" scope="row">
                  <img style={{borderRadius: 8}} className = 'restaurant-img' src={restaurant.photos_url} alt="" />
                </TableCell>
                <TableCell component="th" scope="row">
                  <button className="btn btn_sizeSm"
                    onClick={(event) => addToFavorites(event)}
                    value={[
                      restaurant.name,
                      restaurant.photos_url,
                      restaurant.place_id,
                      restaurant.place_location,
                    ]}
                  >
                    Add to Favorites
                  </button>
                  <button className="btn btn_sizeSm"
                    onClick={(event) => addToDroolList(event)}
                    value={[restaurant.name, restaurant.place_location]}
                  >
                    Add to Drool List
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default HomePage;
