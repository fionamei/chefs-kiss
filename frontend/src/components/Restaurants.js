import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';
import { useTheme } from '@material-ui/core/styles';

import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"

import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import Navbar from "./Navbar";


export const Restaurants = ({ restaurant }) => {

    //styling for displaying restaurants
    const resStyles = makeStyles((theme) => ({
        root: {
            backgroundColor: "#F5EAAB",
            padding: `0 ${theme.spacing.unit * 3}px`,
            // maxWidth: 200,
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
    }));

    const classes = resStyles();
    const [selectedIndex, setSelectedIndex] = React.useState("")

    //"show more" button handler -- index is needed for each button to be different
    const handleClick = index => {
        if (selectedIndex === index) {
            setSelectedIndex("")
        } else {
            setSelectedIndex(index)
        }
    }

    return (
        <div>
            {restaurant.map((res, index) => (
                <Box m={2} pt={2} mr={15} ml={15} >
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Restaurant #{index + 1}
                            </Typography>
                            <Typography variant="h2" component="h2">
                                {res.name}
                            </Typography>
                            <Typography>
                                <Rating name="read-only" value={res.rating} precision={0.5} size="small" readOnly />
                            </Typography>
                               
                            
                            <IconButton
                                className={clsx(classes.expand)}
                                onClick={() => {
                                    handleClick(index)
                                }}
                                aria-label="show more"
                            >
                                {index === selectedIndex ? <ExpandLess /> : <ExpandMore />}
                            </IconButton>
                            <Collapse in={index === selectedIndex} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <Typography className={classes.pos} color="textSecondary">
                                        {res.location.map((loc, i) => (
                                            <div key={i}>{loc}</div>
                                        ))}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        {res.price}
                                    </Typography>
                                </CardContent>
                            </Collapse>
                        </CardContent>
                    </Card>
                </Box>
            ))}
        </div>
    )
}