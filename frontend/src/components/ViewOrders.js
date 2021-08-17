import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { styled } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
// import Order from "./Order.js";

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

    const displayOrder = (props) => {
        const {orders} = props;
        if (orders.length > 0) {
            return (
                orders.map((order) => {
                    console.log(order);
                    return(
                        <Order>{order}</Order>
                    )
                })
            )
        }
    }
    // console.log(props.orders)
    return(
         <>
            <h2>My Orders:</h2>
            {displayOrder(props)}
         </>
    )
}

const Order = (props) => {
    function deleteOrder(id) {
        // e.preventDefault();
        axios.delete(`/api/delete-order/` + id)
        .then(response => {
            console.log(response.data)
        })
    }
    const classes = useStyles();
    return (
        console.log(props.children._id),
        <div className={classes.root} style={{display: 'flex',alignItems: 'center'}}>
            <CustomCard p={2} className="order" variant="outlined" container direction={"column"}                       >
                {/* <CardActionArea component="ViewSpecificOrder" order> */}
                {/* <Link to={"/orders"+order._id} style={{ color: 'inherit', textDecoration: 'none' }}> */}
                <CardActions>
                    <Button size="small" color="secondary" onClick={() => deleteOrder(props.children._id)}>
                        X
                    </Button>
                </CardActions>
                <CardContent>
                    {/* <Typography gutterBottom variant="body" component="div"> */}
                    {props.children.name}
                    {/* </Typography> */}
                </CardContent>
                {/* </Link> */}
                {/* </CardActionArea> */}
            </CustomCard>
        </div>
    )
}


const CustomCard = styled(Card) ({
    width:'50%',
    margin: '0 auto',
    textAlign:'center',
    justifyContent:"center",
    background:'#FDDCD8',
});

const CustomButton = styled(Button)({
    justifyContent:"center"
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.textSecondary,
  },
}));

