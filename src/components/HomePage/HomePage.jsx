import React, { useState } from "react";
import { useDispatch } from "react-redux";
import useReduxStore from "../../hooks/useReduxStore";
import axios from "axios";
import swal from "sweetalert";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Input from "@mui/material/Input";
import Button from "@mui/material/Button";

function HomePage(props) {
  const dispatch = useDispatch();
  const store = useReduxStore();

  const [address, setAddress] = useState("");
  const [show, setShow] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch({ type: "FETCH_GEOCODING", payload: address });
    setAddress('')
    setShow(true);
    swal("Loading...", "", "success");
  };

  const addToFavorites = (event) => {
    // console.log("this is event.target", event.target.value);

    if (store.user.id) {
      dispatch({ type: "POST_FAVORITE", payload: event.target.value });
      swal("🫡", "Added to favorites!", "success");
    } else {
      swal("", "Please login/register", "warning");
    }
  };

  const addToDroolList = (event) => {
    // console.log("this is event.target", event.target.value);

    if (store.user.id) {
      dispatch({ type: "POST_DROOL", payload: event.target.value });
      swal("👅 💦", "Added to Drool List", "success");
    } else {
      swal("", "Please login/register", "warning");
    }
  };

  return show ? (
    <>
      <div className="home-text">
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Enter Address"
            onChange={(event) => setAddress(event.target.value)}
            value={address}
            sx={{ width: "50%", margin: "auto" }}
          />
          <Button
            sx={{ width: "15%", margin: "auto" }}
            type="submit"
            variant="outlined"
            color="primary"
          >
            Search Nearby
          </Button>
        </form>
      </div>
      <TableContainer
        sx={{

          height: 500,
          width: "80%",
          overflow: "hidden",
          overflowY: "scroll",
          margin: "auto",
        }}
        component={Paper}
      >
        <Table
          stickyHeader
          aria-label="sticky table"
          xs={12}
          sm={10}
          md={8}
          lg={8}
        >
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
                  <img
                    style={{ borderRadius: 8 }}
                    className="restaurant-img"
                    src={restaurant.photos_url}
                    alt="404"
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  <button
                    className="btn btn_sizeSm"
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
                  <button
                    className="btn btn_sizeSm"
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
  ) : (
    <div className="home-text">
      <h1>Welcome to FoodieFinds!</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Enter Address"
          onChange={(event) => setAddress(event.target.value)}
          value={address}
          sx={{ width: "50%", margin: "auto" }}
        />
        <Button
          sx={{ width: "15%", margin: "auto" }}
          type="submit"
          variant="outlined"
          color="primary"
        >
          Search Nearby
        </Button>
      </form>
      <h3>Enter an address to begin</h3>
      <h4>Address, City, State/Province/Country</h4>
    </div>
  );
}

export default HomePage;
