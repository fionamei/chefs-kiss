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
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
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
            // () => window.location.reload(); 
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

    const classes = useStyles();
    return (
        console.log(props.children._id),
        <Grid className={classes.root} style={{alignItems: 'stretch'}}>
            <Grid item style={{display: 'flex'}}>
            <CustomCard p={2} className="order" variant="outlined" container direction={"column"}>
                {/* <CardActionArea component="ViewSpecificOrder" order> */}
                {/* <Link to={"/orders"+order._id} style={{ color: 'inherit', textDecoration: 'none' }}> */}
                    <CardActions>
                        <ConfirmDelete>{props.children._id}</ConfirmDelete>
                    </CardActions>
                    <CardContent>
                        {/* <Typography gutterBottom variant="body" component="div"> */}
                        {props.children.name}
                        {/* </Typography> */}
                    </CardContent>
                
                {/* </Link> */}
                {/* </CardActionArea> */}
            </CustomCard>
            </Grid>
        </Grid>
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

const ConfirmDelete = (props) => {
    const [open, setOpen] = useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const deleteURL = "http://localhost:5000/api/delete-order/"
    function deleteOrder(id) {
        // e.preventDefault();
        axios.delete(deleteURL + id)
        .then(response => {
            console.log(response.data)
        })
        .then( () => window.location.reload());
    }
  
    return (
        console.log(props.children),
      <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          <DeleteOutlinedIcon></DeleteOutlinedIcon>
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <DialogContentText>
              Confirm Delete?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={() => deleteOrder(props.children)} color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }