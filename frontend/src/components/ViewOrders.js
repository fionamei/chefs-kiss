import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ViewOrders() {
    // get data from API
    const [orders,getOrders] = useState('');

    useEffect(() => {
        getAllOrders();
    }, []);


    // const url = 'http://localhost:5000/api/get-all-orders';
    const getAllOrders = () => {
        axios.get(`http://localhost:5000/api/get-all-orders`)
        .then((response) => {
            const allOrders = response.data.result;
            // console.log(response.data.result);
            getOrders(allOrders);
        })
        .catch(error => console.error(`Error: ${error}`));
    }

    return (
        <OrderList orders={orders}/>
    )

}

function OrderList(props) {
    console.log(props.orders)
    return(
         <>
         </>
    )
}