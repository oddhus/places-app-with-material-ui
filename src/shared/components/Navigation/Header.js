import React, { useState, useEffect } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/styles';
import { Tabs, Tab, Button, useTheme, useMediaQuery, SwipeableDrawer, IconButton, ListItem, ListItemText, List, Typography } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu'
import { useStore } from '../../store/store';
import { useObserver } from 'mobx-react-lite';

//import logo from '../../assets/logo.svg'

function ElevationScroll(props) {
  const { children } = props

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  })

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  })
}

const useStyles = makeStyles(theme => ({
  appbar: {
    zIndex: theme.zIndex.modal + 1
  },
  button: {
    ...theme.typography.tab,
    color: "white",
    opacity: 0.7,
    "&:hover": {
      opacity: 1
    }
  },
  drawer: {
    backgroundColor: theme.palette.common.lightGreen
  },
  drawerIcon:{
    height: "50px",
    width: "50px"
  },
  drawerIconContainer: {
    marginLeft: "auto",
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  drawerItem: {
    ...theme.typography.tab,
    color: "white",
    opacity: 0.7
  },
  drawerItemSelected: {
    "& .MuiListItemText-root": {
      opacity: 1
    }  
  },
  logo: {
    height: "8em",
    [theme.breakpoints.down("md")]: {
      height: "7em"
    },
    [theme.breakpoints.down("xs")]: {
      height: "5.5em"
    }
  },
  logoContainer: {
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  menu: {
    backgroundColor: theme.palette.common.lightGreen,
    color: "white",
    borderRadius: "0px"
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    "&:hover": {
      opacity: 1
    }
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "25px"
  },
  tabContainer: {
    marginLeft: 'auto'
  },
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "3em",
    [theme.breakpoints.down("md")]: {
      marginBottom: "2em"
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "1.25em"
    }
  }
}))

export default function Header(props) {
  const classes = useStyles()
  const theme = useTheme()
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent)
  const matches = useMediaQuery(theme.breakpoints.down("md"))
  const { auth } = useStore()
  const [openDrawer, setOpenDrawer] = useState(false)
  const history = useHistory()

  function logoutUser(e) {
    props.setValue(0)
    auth.logout()
    history.push("/")
  }

  const routes = [
    {name: "All Users", link: "/", activeIndex: 0},
    auth.isLoggedIn && {name: "My Places", link: "/u1/places", activeIndex: 1},
    auth.isLoggedIn && {name: "Add place", link: "/places/new", activeIndex: 2},
    !auth.isLoggedIn && {name: "Authenticate", link: "/auth", activeIndex: 3},
    {name: "About", link: "/about", activeIndex: 4},
  ]

  useEffect(() => {
    const pathname = window.location.pathname;
    let routeIndex = routes.filter(route => route).findIndex(route => route.link === pathname)

    props.setValue(routeIndex === -1 ? 1 : routeIndex);
    
  }, [routes, props]);

  const tabs = (
    <React.Fragment>
      <Tabs
        value={props.value}
        onChange={(e, value) => props.setValue(value)}
        className={classes.tabContainer}
      >
        {routes.map((route) => {
           if(route){
            return (
              <Tab
                aria-owns={route.ariaOwns}
                aria-haspopup={route.ariaHaspopup}
                className={classes.tab}
                component={Link}
                key={route.link}
                label={route.name}
                onMouseOver={route.onMouseOver}
                to={route.link}
              />
            )
           }
        })}
      </Tabs>
      {auth.isLoggedIn && <Button className={classes.button} onClick={logoutUser}>Logout</Button>}
    </React.Fragment>
  )

  const drawer = (
    <React.Fragment>
      <SwipeableDrawer disableBackdropTransition={!iOS} disableDiscovery={iOS}
      classes={{paper: classes.drawer}} 
      onClose={() => setOpenDrawer(false)}
      onOpen={() => setOpenDrawer(true)}
      open={openDrawer}
      >
        <div className={classes.toolbarMargin} />
        <List disablePadding>
          {routes.map(route => {
            if (route) {
              return (
                <ListItem
                  button
                  classes={{ selected: classes.drawerItemSelected }}
                  component={Link}
                  divider
                  key={route.link}
                  onClick={() => { setOpenDrawer(false); props.setValue(route.activeIndex) }}
                  selected={props.value === route.activeIndex}
                  to={route.link}
                >
                  <ListItemText
                    className={classes.drawerItem}
                    disableTypography
                  >
                    {route.name}
                  </ListItemText>
                </ListItem>
              )
            }
          })}
        </List>
      </SwipeableDrawer>
      <IconButton className={classes.drawerIconContainer} onClick={() => setOpenDrawer(!openDrawer)} disableRipple>
        <MenuIcon className={classes.drawerIcon}/>
      </IconButton>
    </React.Fragment>
  )

  return useObserver(() => (
    <React.Fragment>
      <ElevationScroll>
        <AppBar position="fixed" className={classes.appbar}>
          <Toolbar disableGutters>
            <Button component={Link} to="/" className={classes.logoContainer} onClick={() => props.setValue(0)} disableRipple>
              <Typography variant="h2" style={{color: "white", paddingLeft: 10}}>Places App</Typography>
              {/* <img alt="company logo" src={logo} className={classes.logo} /> */}
            </Button>
            {matches ? drawer : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  ))
}
