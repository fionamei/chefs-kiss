import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { styled } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from "react-router-dom";

export default function ViewThisOrder() {
    // get data from API
    const [order,getOrder] = useState([])
    const { id } = useParams()

    useEffect(() => {
        getThisOrder();
        // eslint-disable-next-line
    }, []);

    const getThisOrder = () => {
        axios.get(`http://localhost:5000/api/get-all-orders/` + id)
        .then((response) => {
            const order = response.data.result;
            console.log("order: "+order);
            getOrder(order);
        })
        .catch((error) => {
            console.log(id)
            console.error(`Error: ${error}`);
        })
    }

    return (
        <div>
            <br></br>
            <br></br>
            <Order order={order}/>
        </div>
    )
}


function Order(props) {
    const classes = useStyles();
    // get data from API
    const displayOrder = (props) => {
        const {order} = props;

            return (
                <div className={classes.root}>
                <CustomCard p={2} 
                            className="order" 
                            variant="outlined" 
                            container direction={"column"}                       >
                    <CardContent>
                        <Typography sx={{ fontSize: 15 }} 
                                    color="textSecondary" 
                                    gutterBottom>
                            Restaurant: {order.restaurant}
                        </Typography>
                        <Typography gutterBottom 
                                    variant="h4" 
                                    component="div">
                            {order.name}
                        </Typography>
                        <Typography gutterBottom 
                                    variant="body1" 
                                    component="div">
                            {console.log("Items: " + order.itemsOrdered)}
                            {displayItems(order.itemsOrdered)}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <CustomButton size="small" 
                                      variant='outlined'
                                      onClick={() => (window.location.href="/orders/")}>
                            Return
                        </CustomButton>
                    </CardActions>
                </CustomCard>
                </div>
            )
    }
    return(
         <>
            {displayOrder(props)}
         </>
    )

}

function displayItems(props) {
    if (props !== undefined) {
        return (
            <div>
                {
                    props.map(
                        (item, i) => (
                            <Typography key={i} 
                                        gutterBottom variant="body1" 
                                        component="div"
                            >
                            {item}
                            </Typography>
                        )
                    )
                }
            </div>
        )
    }
    else {
        return (
            <div>
                Items Ordered: {props}
            </div>
        )
    }
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

