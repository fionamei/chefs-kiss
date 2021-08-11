import React, {useState} from "react";
import Axios from "axios";
import Button from '@material-ui/core/Button';

function Save() {
    const url = "http://127.0.0.1:5000/api/create-order"
    const [data,setData] = useState({
        Name: "",
        Restaurant: "",
        Items: ""
    })

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
    }
    function handle(e){
        const newdata={...data}
        newdata[e.target.id] = e.target.value
        setData(newdata)
        console.log(newdata)
    }

    return (
        <div>
            <form onSubmit={(e) => submit(e)}>
                <input onChange={(e) => handle(e)} id="Name" value={data.Name} placeholder='Name' type='text'></input>
                <input onChange={(e) => handle(e)} id="Restaurant" value={data.Restaurant} placeholder='Restaurant' type='text'></input>
                <input onChange={(e) => handle(e)} id="Items" value={data.Items} placeholder='Items' type='text'></input>
                <br></br>
                <Button variant="outlined" type="submit">Submit</Button>
            </form>
        </div>
    )
}

export default Save