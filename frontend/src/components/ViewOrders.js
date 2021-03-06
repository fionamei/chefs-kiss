import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@material-ui/core/Card';
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
    const [orders,getOrders] = useState([]);

    useEffect(() => {
        getAllOrders();
    }, []);

    const getAllOrders = () => {
        axios.get(`http://localhost:5000/api/get-all-orders`)
        .then((response) => {
            const allOrders = response.data.result;
            getOrders(allOrders);
            console.log(response.data.result)
        })
        .catch((error) => {
          console.error(`Error: ${error}`);
        })
    }

    return (
        <div>
          <OrderList orders={orders}/>
        </div>
    )
}

function OrderList(props) {
    const displayOrder = (props) => {
        const {orders} = props;

        if (orders.length > 0) {
            return (
                orders.map((order, i) => {
                    return(
                        <Order key={i}>{order}</Order>
                    )
                })
            )
        }
    }
    return(
         <>
            <h1>My Orders:</h1>
            {displayOrder(props)}
         </>
    )
}

const Order = (props) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  function deleteOrder(id) {
      axios.delete("http://localhost:5000/api/delete-order/" + id)
      .then((response) => {
          console.log(response.data);
      })
      .then(() => {
        window.location.reload();
      })
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
      <Grid 
        container spacing={5} 
        className={classes.root} 
        style={{alignItems: 'stretch'}}
      >
        <Grid 
          item xs 
          style={{display: 'flex'}}
        >
          <CustomCard 
            p={2} 
            className="order" 
            variant="outlined" 
            container direction={"column"}
          >
              <CardActionArea>
                  <CardContent>
                      <Typography p={1}>
                        <Link to={{
                          pathname: `/orders/${props.children._id}`, 
                          }} style={{ color: 'inherit', textDecoration: 'none' }}
                        >
                        {props.children.name}
                        </Link>
                      </Typography>
                      <DeleteOutlinedIcon
                        variant="outlined" 
                        color="primary" 
                        onClick={handleClickOpen} 
                        style={{cursor: "pointer"}}
                      >
                      </DeleteOutlinedIcon>

                      <Dialog 
                        open={open} 
                        onClose={handleClose}
                      >
                        <DialogContent>
                          <DialogContentText>
                            Confirm Delete?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose} color="primary">
                            Cancel
                          </Button>
                          <Button onClick={() => deleteOrder(props.children._id)} color="primary">
                            Delete
                          </Button>
                        </DialogActions>
                    </Dialog>
                  </CardContent>
              </CardActionArea>
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
