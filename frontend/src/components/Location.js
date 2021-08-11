import React, { useEffect, useState } from "react";
import { Restaurants } from "./Restaurants";
import axios from "axios";
import { Button } from '@material-ui/core';


const Location = () => {

    const [location, setLocation] = useState("");
    const [restaurant, setRestaurant] = useState([])
    // console.log("Rendering with: ", restaurant);

    //functions
    const locationHandler = (e) => {
        setLocation(e.target.value);
    };
    const submitHandler = (e) => {
        e.preventDefault();

        // POST request to input location into API 
        axios({
            method: "POST",
            url: 'http://localhost:5000/api/find-nearby-restaurants',
            data: {"location": location},
          })
            .then((response) => {
              //handle success
              setRestaurant(response.data.result)
            //   console.log(response);
            })
            .catch( err => {
              //handle error
              console.log("POST REQ ERROR");
            });

    };

    useEffect(() => {
        // gets the output from api 
        axios
            .get('http://localhost:5000/api/find-nearby-restaurants')
            .then((response) => {
                // console.log(response)
                // console.log(response.data.result)
                setRestaurant(response.data.result);
                // console.log(restaurant)
            })
            .catch(
                (err => {
                    console.log("GET REQ ERROR!")
                })
            );
    }, [])

    // console.log(restaurant);
    return (
        <div>
            <h1>Search page</h1>
            <form>
                <input value={location} onChange={locationHandler} type="text" />
                <Button onClick={submitHandler} color="primary" type="submit">Submit</Button>
            </form>
            <Restaurants restaurant={restaurant} />
        </div>
    );
}

export default Location;
