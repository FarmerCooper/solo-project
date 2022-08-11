import React, { useEffect } from "react";
import useReduxStore from "../../hooks/useReduxStore";
import { useDispatch, useSelector } from "react-redux";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function WishlistPage() {
  const store = useReduxStore();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_DROOLS" });
  }, []);

  const handleDelete = (event) => {
    dispatch({ type: "VANISH_THOU", payload: event.target.value });
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Restaurant(s)</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {store.drools.map((drool, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {drool.restr_name}
                </TableCell>
                <TableCell>
                  <button
                    onClick={(event) => handleDelete(event)}
                    value={[drool.restr_name]}
                  >
                    🗑
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

export default WishlistPage;
