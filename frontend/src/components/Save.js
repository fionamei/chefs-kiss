import React, { useState, setState } from "react";
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
        Name: "",
        Restaurant: "",
        Items: ""
    });

    function submit(e){
        e.preventDefault();
        Axios.post(url,{
            name: data.Name,
            restaurant: data.Restaurant,
            itemsOrdered: data.Items
        })
        .then(res => {
            console.log(res.data)
        })
        setData({
            Name: "",
            Restaurant: "",
            Items: ""
        })
    };

    function handle(e){
        const newdata={...data}
        newdata[e.target.id] = e.target.value
        setData(newdata)
        console.log(newdata)
    };

    return (
        <div>
            <h1>Save an Order!</h1>
            <form onSubmit={(e) => submit(e)}>
                <TextField
                    className={classes.field}
                    onChange={(e) => handle(e)}
                    id="Name"
                    value={data.Name}
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
                    id="Restaurant"
                    value={data.Restaurant}
                    placeholder="Restaurant"
                    type="text"
                    variant="outlined"
                    color="secondary"
                    size="small"
                    required
                />
                <TextField
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
                />
                <br></br>
                <Button variant="outlined" type="submit" size="large">Submit</Button>
            </form>
        </div>
    )
}

export default Save