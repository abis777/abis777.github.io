import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ParcelForm from "./components/ParcelForm/ParcelForm";

const useStyles = makeStyles({
  parcel: {
    color: "#148ce4",
    fontWeight: "bold",
  },
  me: {
    color: "#fbab2c",
    fontWeight: "bold",
  },
});

function App() {
  const classes = useStyles();
  return (
    <Container maxWidth="sm">
      <Box pt={3}>
        <Typography variant="h4">
          <span className={classes.parcel}>parcel</span>
          <span className={classes.me}>me</span>
        </Typography>
      </Box>
      <ParcelForm />
    </Container>
  );
}

export default App;
