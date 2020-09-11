import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    minHeight: 80,
    alignItems: "flex-start",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
}));

const Navbar = () => {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="fixed" color="primary">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6">CLASH TEAM</Typography>

          <div>
            <a href="#">
              <img src="../assets/images/minion.png" alt="" />
            </a>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
