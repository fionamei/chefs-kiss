import React, { useState } from "react";
import Axios from "axios";
import { Button, TextField, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    field: {
        marginTop: 20,
        marginBotton: 20,
        display: "block"
    }
})

function Save() {
    const url = "http://127.0.0.1:5000/api/create-order";

    const classes = useStyles();

    const [data,setData] = useState({
        mealName: "",
        mealRestaurant: "",
        items: []
    });

    function submit(e){
        e.preventDefault();
        Axios.post(url,{
            name: data.mealName,
            restaurant: data.mealRestaurant,
            itemsOrdered: data.items
        })
        .then(res => {
            console.log(res.data)
        })
        setData({
            mealName: "",
            mealRestaurant: "",
            items: []
        })
    };

    function handle(e){
        const newdata={...data}
        newdata[e.target.id] = e.target.value
        setData(newdata)
        console.log(newdata)
    };
    // ITEMS STUFF
    const [itemsText, setItemsText] = useState("");
    const itemsTextHandler = (e) => {
        setItemsText(e.target.value);
    };
    const submitItemsHandler = (e) => {
        e.preventDefault();
        setData({
            mealName: data.mealName,
            mealRestaurant: data.mealRestaurant,
            items: [...data.items, itemsText]
        });
        setItemsText("");
    };
    return (
        <div>
            <h1>Save an Order!</h1>
            <form onSubmit={(e) => submit(e)}>
                <TextField
                    className={classes.field}
                    onChange={(e) => handle(e)}
                    id="mealName"
                    value={data.mealName}
                    placeholder="Name"
                    type="text"
                    variant="outlined"
                    color="secondary"
                    size="small"
                    required
                />
                <TextField
                    className={classes.field}
                    onChange={(e) => handle(e)}
                    id="mealRestaurant"
                    value={data.mealRestaurant}
                    placeholder="Restaurant"
                    type="text"
                    variant="outlined"
                    color="secondary"
                    size="small"
                    required
                />
                {/* <TextField
                    className={classes.field}
                    onChange={(e) => handle(e)}
                    id="Items"
                    value={data.Items}
                    placeholder="Items"
                    type="text"
                    variant="outlined"
                    color="secondary"
                    size="small"
                    required
                /> */}
                <br></br>
                <TextField 
                    id="items"
                    placeholder="Items"
                    type="text"
                    variant="outlined"
                    color="secondary"
                    size="small"
                    value={itemsText} 
                    onChange={itemsTextHandler}
                />
                <Button onClick={submitItemsHandler} variant="outlined" type="submit" size="large">+</Button>
                <br></br>
                <br></br>
                <Button variant="outlined" type="submit" size="large">Submit</Button>
            </form>
        </div>
    )
};

export default Save