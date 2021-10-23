import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import {
  CssBaseline,
  Typography,
  makeStyles,
  Container,
  Grid,
  Box,
  withStyles,
} from "@material-ui/core";

import { Copyright } from "../Copyright/Copyright";

const useStyles = makeStyles((theme) => ({
  main: {
    paddingBottom: "200px",
  },
  footer: {
    position: "fixed",
    padding: theme.spacing(3, 2),
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
  footerLink: {
    color: "#f0e9e9",
    textDecoration: "none",
  },
  copyright: {
    padding: "50px",
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <Box>
      <CssBaseline />
      {}
      <Box
        px={{ xs: 3, sm: 10 }}
        py={{ xs: 5, sm: 10 }}
        borderTop=" 1px solid #12233d"
        bgcolor="#12233d"
        color="white"
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {/* <Grid item xs={12} sm={6} md={3}>
              <Box fontWeight="fontWeightBold" borderBottom={1}>
                Help
              </Box>
              <Router>
                <Box>
                  <Link
                    className={classes.footerLink}
                    href="/"
                    color="secondary"
                  >
                    Contact
                  </Link>
                </Box>

                <Box>
                  <Link className={classes.footerLink} href="/" color="inherit">
                    About Us
                  </Link>
                </Box>

                <Box>
                  <Link className={classes.footerLink} href="/" color="inherit">
                    Privacy
                  </Link>
                </Box>

                <Box>
                  <Link className={classes.footerLink} href="/" color="inherit">
                    FAQs
                  </Link>
                </Box>
              </Router>
            </Grid> */}

            {/* <Grid item xs={12} sm={6} md={3}>
              <Box fontWeight="fontWeightBold" borderBottom={1}>
                Follow Us{" "}
              </Box>
              <Router>
                <Box>
                  <Link className={classes.footerLink} href="/" color="inherit">
                    Facebook
                  </Link>
                </Box>

                <Box>
                  <Link className={classes.footerLink} href="/" color="inherit">
                    Instagram
                  </Link>
                </Box>

                <Box>
                  <Link className={classes.footerLink} href="/" color="inherit">
                    Twitter
                  </Link>
                </Box>
                <Box>
                  <Link className={classes.footerLink} href="/" color="inherit">
                    LinkedIn
                  </Link>
                </Box>
              </Router>
            </Grid> */}
          </Grid>
          <div className={classes.copyright}>
            <Copyright />
          </div>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
