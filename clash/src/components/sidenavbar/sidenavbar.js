import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Link, Switch, Route, Redirect, useRouteMatch } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import SearchIcon from '@material-ui/icons/Search';
import GroupIcon from '@material-ui/icons/Group';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import CssBaseline from '@material-ui/core/CssBaseline';
import TeamsMain from '../teams/teamsmain.js';
import EditTeam from '../teams/updateteam.js';
import NewTeam from '../teams/newteam.js';
import Profile from '../profile/profile.js';
import ProfileSec from '../profile/profile-sec.js';
import Calendar from '../calendars/calendar.js';
import Search from '../teams/search.js';
import Requests from '../requests/requests.js';
import { Logout } from '../../services/auth.service';

const drawerWidth = 240;
var openclose = true;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    position: "inherit !important",
    minHeight: '87vh',
  },
  drawerOpen: {
    width: drawerWidth,
    position: "inherit !important",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    position: "inherit !important",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const useStylesFooter = makeStyles((theme) => ({
  footer: {
    display: "flex",
    marginTop: '1rem',
    padding: '1rem',
    backgrounColor: 'rgb(235, 195, 64)',
    position: 'fixed',
    bottom: 0,
    left:0,
    width: '100%'
  },
}));

const Footer = () => {
  const classes = useStylesFooter();

  return (
    <div className={classes.footer}>
      <p>This is some content in sticky footer</p>
    </div>
    );
};

const SideNavBar = props => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  let match = useRouteMatch();

  const handleDrawerOpenClose = () => {
    if(openclose){
      openclose = false;
      setOpen(false);
    }else{
      openclose = true;
      setOpen(true);
    }  
  };

  const UserLogout = () => {
    Logout();

    props.props.history.push(`/home/signin`);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerOpenClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {[{text: "Perfil", link:"profile"}, {text: "Mis Equipos", link:"teams"} , {text: "Buscar Equipos", link:"search"}, {text: "Calendarios", link:"calendars"}].map((item, index) => (
            <ListItem button component={Link} to={`${match.url}/${item.link}`} key={item.text}>
              <ListItemIcon>
                {index === 0 ? <AssignmentIndIcon /> : 
                 index === 1 ? <GroupIcon /> : 
                 index === 2 ? <SearchIcon /> : <CalendarTodayIcon /> }
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["Cerrar Sesión"].map((text, index) => (
            <ListItem button key={text} onClick={UserLogout}>
              <ListItemIcon>
                {index % 2 === 0 ? <KeyboardReturnIcon /> : <SearchIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer> 
      <Switch>
        <Route exact path={`${match.path}/`} render={()=>{
              return(
                <Redirect to={`${match.url}/profile`}/>
              )
            }}/>
        <Route exact path={`${match.path}/profile`} component={Profile}></Route>
        <Route exact path={`${match.path}/teams`} component={TeamsMain}></Route>
        <Route exact path={`${match.path}/search`} component={Search}></Route>
        <Route exact path={`${match.path}/calendars`} component={Calendar}></Route>
        <Route exact path={`${match.path}/teams/new`} component={NewTeam}></Route>
        <Route exact path={`${match.path}/teams/:id`} component={EditTeam}></Route>
        <Route exact path={`${match.path}/teams/requests/:id`} component={Requests}></Route>
        <Route exact path={`${match.path}/teams/requests/:id/:nickname`} component={ProfileSec}></Route>
      </Switch>  
    </div>
  );
};

export default SideNavBar;
