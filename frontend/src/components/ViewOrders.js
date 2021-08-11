import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { styled } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

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
    const classes = useStyles();

    const displayItems = (props) => {
        const {items} = props;
        if (items !== undefined && items.length > 1) {
            return (
                items.map((item) => {
                    return (
                        <Typography gutterBottom variant="body1" component="div">
                        {item}
                        </Typography>
                    )
                })
            )
        }
    }

    const displayOrder = (props) => {
        const {orders} = props;

        if (orders.length > 0) {
            return (
                orders.map((order) => {
                    console.log(order);
                    return(
                        <div className={classes.root}>
                        <Grid container spacing={5}>
                        <Grid item xs>
                        <CustomCard p={2} className="order" variant="outlined" container direction={"column"}                       >
                            <CardContent>
                                <Typography sx={{ fontSize: 15 }} color="text.secondary" gutterBottom>
                                Restaurant: {order.restaurant}
                                </Typography>
                                <Typography gutterBottom variant="h4" component="div">
                                {order.name}
                                </Typography>
                                <Typography gutterBottom variant="body1" component="div">
                                Items Ordered: {order.itemsOrdered}
                                {/* <>{displayItems(order.itemsOrdered)}</> */}
                                {/* Items Ordered: {order.itemsOrdered.map(item => (<Typography gutterBottom variant="body1" component="div">{item}</Typography>))} */}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <CustomButton size="small" variant='outlined'
                                onClick={() => (window.location.href="/orders/" + order._id)}>
                                    View
                                </CustomButton>
                            </CardActions>
                        </CustomCard>
                        </Grid>
                        </Grid>
                        </div>
                    )
                })
            )
        }
    }
    // console.log(props.orders)
    return(
         <>
            {displayOrder(props)}
         </>
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
    color: theme.palette.text.secondary,
  },
}));

