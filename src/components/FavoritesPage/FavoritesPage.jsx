import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useReduxStore from "../../hooks/useReduxStore";
import Map from "./Map";
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
import { padding } from "@mui/system";

function FavoritesPage() {
  const store = useReduxStore();

  const dispatch = useDispatch();

  const [inputRating, setInputRating] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    dispatch({ type: "FETCH_FAVORITES" });
  }, []);

  const handleDelete = (event) => {
    console.log("in handleDelete, place_id:", event.target.value);

    dispatch({ type: "VANISH_ITEM", payload: event.target.value });
  };

  const handleState = (event) => {
    setShow(true);
  };

  const handleEdit = (event) => {
    // console.log("in handleDelete, place_id:", event.target.value);
    // console.log("this is the current rating", inputRating);

    setShow(false);
    dispatch({
      type: "EDIT_RATING",
      payload: { place_id: event.target.value, rating: inputRating },
    });
  };

  return (
    <>
      <div className="float-container">
        <TableContainer
          className="float-child"
          sx={{
            height: 400,
            width: "45%",
            overflow: "hidden",
            overflowY: "scroll",
            margin: "auto",
          }}
          component={Paper}
        >
          <Table
            stickyHeader
            aria-label="sticky table"
            xs={8}
            sm={6}
            md={4}
            lg={4}
          >
            <TableHead>
              <TableRow>
                <TableCell>Restaurant</TableCell>
                <TableCell>Your Rating</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {store.favorites.map((favorite, i) => (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {favorite.restr_name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {!show ? (
                      <>
                        {favorite.user_rating}
                        <button
                          className="btn btn_sizeXs"
                          onClick={(event) => handleState(event)}
                        >
                          Edit
                        </button>
                      </>
                    ) : (
                      <>
                        <Input
                          sx={{ width: 40, padding: 1 }}
                          type="number"
                          onChange={(event) =>
                            setInputRating(event.target.value)
                          }
                        />
                        <button
                          className="btn btn_sizeXs"
                          onClick={(event) => handleEdit(event)}
                          value={[favorite.place_id]}
                        >
                          Set
                        </button>{" "}
                      </>
                    )}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <img
                      style={{ borderRadius: 8 }}
                      className="restaurant-img"
                      src={favorite.photos_url}
                      alt="404"
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <button
                      className="btn btn_sizeSm"
                      onClick={(event) => handleDelete(event)}
                      value={[favorite.place_id, favorite.place_location]}
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="float-map">
          <Map />
        </div>
      </div>
    </>
  );
}

export default FavoritesPage;
