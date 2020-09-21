import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import logo from "../../assets/images/minion.png";
import "./navbar.css"

const Navbar = () => {
  return (
    <div>
      <AppBar position="sticky" color="primary">
        <Toolbar className="toolbar">
          <a className="logo" href="#">
            <img src={logo} height="70px" alt="Clash LoL" />
          </a>
          <Typography variant="h5" className="cl1">CLASH</Typography>
          <Typography variant="h5" className="cl2">TEAM</Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
