import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';



const Navbar = () => {

    const useStyles = makeStyles((theme) => ({
        //popout design
        list: {
            width: 250,
        },
        fullList: {
            width: 'auto',
        },
        //navbar design
        root: {
            flexGrow: 1,

        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }));

    const classes = useStyles();
    const [state, setState] = React.useState({
        left: false,
    });

    const preventDefault = (event) => event.preventDefault();

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <ListItem button component="a" href="/">
                    <ListItemText primary={"Home"} />
                </ListItem>
                <ListItem button component="a" href="/find-restaurants">
                    <ListItemText primary={"Search Location"} />
                </ListItem>
                <ListItem button component="a" href="/orders">
                    <ListItemText primary={"Orders"} />
                </ListItem>
            </List>
            <Divider />
            <List>
                {['Login', 'Logout'].map((text, index) => (
                    <ListItem key={text}>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <div className={classes.root}>
            <AppBar position="static" style={{ backgroundColor: "#C6F5AB" }}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} aria-label="menu">
                        <MenuIcon onClick={toggleDrawer('left', true)} />
                        <Drawer open={state['left']} onClose={toggleDrawer('left', false)}>
                            {list('left')}
                        </Drawer>
                    </IconButton>
                    <Typography variant="h6" color="textSecondary" className={classes.title}>
                        Chef's Kiss
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );


}

export default Navbar;