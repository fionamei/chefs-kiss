import React, { useEffect, useState } from "react";
import { Restaurants } from "./Restaurants";
import axios from "axios";

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Navbar from "./Navbar";


const Location = () => {

    const [location, setLocation] = useState("");
    const [restaurants, setRestaurants] = useState([]);

    //functions
    const locationHandler = (e) => {
        setLocation(e.target.value);
    };

    // POST request to input location into API 
    const submitHandler = (e) => {
        e.preventDefault();
        axios({
            method: "POST",
            url: 'http://localhost:5000/api/find-nearby-restaurants',
            data: { "location": location },
        })
            .then((response) => {
                //handle success
                setRestaurants(response.data.result)
            })
            .catch(err => {
                //handle error
                console.log("POST REQ ERROR");
            });
    };

    // gets the output from api 
    useEffect(() => {
        axios
            .get('http://localhost:5000/api/find-nearby-restaurants')
            .then((response) => {
                setRestaurants(response.data.result);
            })
            .catch(
                (err => {
                    //handle error
                    console.log("GET REQ ERROR!")
                })
            );
    }, [])

    //styling for the form
    const formStyles = makeStyles((theme) => ({
        root: {
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: 400,
            margin: 'auto',
        },
        input: {
            marginLeft: theme.spacing(1),
            flex: 1,
        },
        iconButton: {
            padding: 10,
        },
    }));

    const classes = formStyles();

    return (
        <div>
            <Navbar />
            <h1>Search page</h1>
            <Paper component="form" className={classes.root}>
                <InputBase
                    className={classes.input}
                    value={location}
                    onChange={locationHandler}
                    placeholder="Enter Location"
                />
                <IconButton type="submit" className={classes.iconButton} onClick={submitHandler} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Paper>
            <Restaurants restaurant={restaurants} />
        </div>
    );
}

export default Location;
