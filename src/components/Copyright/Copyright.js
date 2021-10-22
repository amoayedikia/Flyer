import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

export const Copyright = () => {
  return (
    <Typography variant="body2" color="inherit" align="center">
      {"Copyright © "}
      Flyer&nbsp;
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};
