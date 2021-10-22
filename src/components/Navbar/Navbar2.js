// import React, { Component } from "react";
// import { makeStyles, useTheme } from "@material-ui/core/styles";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
// import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";
// import MenuItem from "@material-ui/core/MenuItem";
// import Menu from "@material-ui/core/Menu";
// import Button from "@material-ui/core/Button";
// import useMediaQuery from "@material-ui/core/useMediaQuery";
// import { Link } from "react-router-dom";
// import { Auth } from "aws-amplify";
// import PropTypes from "prop-types";
// import { withStyles } from "@material-ui/core/styles";
// import { withRouter } from "react-router";
// import { connect } from "react-redux";
// import { AuthContext } from "../../App";
// import { authRoutes, defaultRoutes } from "../../routes";

// const useStyles = (theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   navbarButton: {
//     fontSize: "1rem",
//     border: "none",
//     backgroundColor: "none",
//     outline: "none",
//     color: "inherit",
//     "&:hover": {
//       backgroundColor: "#fff",
//       color: "#3c52b2",
//     },
//   },
//   title: {
//     [theme.breakpoints.down("xs")]: {
//       flexGrow: 1,
//     },
//   },
//   headerOptions: {
//     display: "flex",
//     flex: 1,
//     justifyContent: "flex-end",
//     disableRipple: true,
//   },
// });

// const Navbar = (props) => {

//     const [anchorEl, setAnchorEl] = useState(null);
//     const { history } = props;
//     const classes = useStyles();
//     const open = Boolean(anchorEl);
//     const theme = useTheme();
//     const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//     const handleMenu = (event) => {
//       setAnchorEl(event.currentTarget);
//     };

//     const handleMenuClick = (pageURL) => {
//       history.push(pageURL);
//       setAnchorEl(null);
//     };

//     const handleButtonClick = (pageURL) => {
//       history.push(pageURL);
//     };

//     const menuItems = [
//       {
//         menuTitle: "Home",
//         pageURL: "/",
//       },
//       {
//         menuTitle: "Membership",
//         pageURL: "/membership",
//       },
//       {
//         menuTitle: "Login",
//         pageURL: "/login",
//       },
//       {
//         menuTitle: "Sign Up",
//         pageURL: "/signup",
//       },
//     ];

//     const handleLogout = async (event) => {
//       event.preventDefault();
//       try {
//         Auth.signOut();
//         this.props.auth.setAuthStatus(false);
//         this.props.auth.setUser(null);
//       } catch (error) {
//         console.log(error.message);
//       }
//     };

//     return (
//       <div className={classes.root}>
//         <AppBar position="static">
//           <Toolbar>
//             <Typography variant="h6">
//               <Link style={{ textDecoration: "none", color: "inherit" }} to="/">
//                 FLYER
//               </Link>
//             </Typography>
//             {/* responsive design for Navbar starts here */}
//             {isMobile ? (
//               <>
//                 <IconButton
//                   edge="start"
//                   className={classes.menuButton}
//                   color="inherit"
//                   aria-label="menu"
//                   onClick={handleMenu}
//                 >
//                   <MenuIcon />
//                 </IconButton>
//                 <Menu
//                   id="menu-appbar"
//                   anchorEl={anchorEl}
//                   anchorOrigin={{
//                     vertical: "top",
//                     horizontal: "right",
//                   }}
//                   keepMounted
//                   transformOrigin={{
//                     vertical: "top",
//                     horizontal: "right",
//                   }}
//                   open={open}
//                   onClose={() => setAnchorEl(null)}
//                 >
//                   {menuItems.map((menuItem) => {
//                     const { menuTitle, pageURL } = menuItem;
//                     return (
//                       <MenuItem onClick={() => handleMenuClick(pageURL)}>
//                         {menuTitle}
//                       </MenuItem>
//                     );
//                   })}
//                 </Menu>
//               </>
//             ) : (
//             {/* response design for Navbar ends here */}

//             <div className={classes.headerOptions}>
//               <Link style={{ textDecoration: "none", color: "inherit" }} to="/">
//                 <Button
//                   variant="outlined"
//                   disableRipple
//                   className={classes.navbarButton}
//                 >
//                   HOME
//                 </Button>
//               </Link>
//               <Link
//                 style={{ textDecoration: "none", color: "inherit" }}
//                 to="/membership"
//               >
//                 <Button
//                   variant="outlined"
//                   disableRipple
//                   className={classes.navbarButton}
//                 >
//                   Membership
//                 </Button>
//               </Link>

//               <Link
//                 style={{ textDecoration: "none", color: "inherit" }}
//                 to="/signup"
//               >
//                 <Button
//                   variant="outlined"
//                   disableRipple
//                   className={classes.navbarButton}
//                 >
//                   Sign-up
//                 </Button>
//               </Link>

//               <Link
//                 style={{ textDecoration: "none", color: "inherit" }}
//                 to="/workspace"
//               >
//                 <Button
//                   variant="outlined"
//                   disableRipple
//                   className={classes.navbarButton}
//                 >
//                   Workspace
//                 </Button>
//               </Link>
//               {/* <Popconfirm
//                 title="Are you sure to logout?"
//                 onConfirm={confirm}
//                 onCancel={cancel}
//                 okText="Yes"
//                 cancelText="No"
//               > */}
//               <Button
//                 variant="outlined"
//                 disableRipple
//                 onClick={this.handleLogOut}
//                 className={classes.navbarButton}
//               >
//                 Logout
//               </Button>
//               <Link
//                 style={{ textDecoration: "none", color: "inherit" }}
//                 to="/login"
//               >
//                 <Button
//                   variant="outlined"
//                   disableRipple
//                   className={classes.navbarButton}
//                 >
//                   Login
//                 </Button>
//               </Link>

//               {/* {this.props.auth.isAuthenticated && this.props.auth.user ? (
//                 <Button
//                   variant="outlined"
//                   disableRipple
//                   onClick={this.handleLogOut}
//                   className={classes.navbarButton}
//                 >
//                   Logout
//                 </Button>
//               ) : (
//                 <Link
//                   style={{ textDecoration: "none", color: "inherit" }}
//                   to="/login"
//                 >
//                   <Button
//                     variant="outlined"
//                     disableRipple
//                     className={classes.navbarButton}
//                   >
//                     Login
//                   </Button>
//                 </Link>
//               )} */}
//             </div>
//             {/* )} */}
//           </Toolbar>
//         </AppBar>
//       </div>
//     );
//   }
// }

// {/* Disable */}
// {/* Navbar.propTypes = {
//   classes: PropTypes.object.isRequired,
// };
// export default withStyles(useStyles)(Navbar); */}

// // export default withRouter(connect()(withStyles(styles)(FirstPage)))

// // export default withRouter(connect()(withStyles(useStyles)(Navbar)));

// export default withRouter(Navbar);
