import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { green, red } from '@material-ui/core/colors';
import Stars from './Stars'



const useStyles = makeStyles((theme) => ({
    card: {
        maxWidth: 345,
    },
    media: {
        height: 300,
    },
}));


function BusinessCard(props) {
    const classes = useStyles();
    const [selectedBusiness, setSelectedBussines] = React.useState([])
    const [limit, setLimit] = React.useState(4)
    React.useEffect(() => {
        setLimit(4)
        if (props.listOpen === true) {
            setSelectedBussines(
                Object.values(props.data).map(business => {
                    if (business["price"] != null) {
                        if (business["is_closed"] == false && business["price"] === props.price) {
                            return business
                        }
                    } else {
                        if (business["is_closed"] == false) {
                            return business
                        }
                    }
                })
            )
        } else {
            if (props.price != null) {
                setSelectedBussines(
                    Object.values(props.data).map(business => {
                        if (business["price"] === props.price) {
                            return business
                        }
                    })
                )
            } else {
                setSelectedBussines(props.data)
            }
        }
    }, [props.data, props.listOpen, props.price])

    const handleLoadMore = () => {
        var definedKeys = []
        var i = 0
        Object.keys(selectedBusiness).map(key => {
            if(selectedBusiness[key] != undefined) {
                i++
                definedKeys.push(i)
            }
        })
        if(definedKeys.length > limit) {
            if(definedKeys.length - limit <= 4) {
                setLimit(definedKeys.length)
            }else{
                setLimit(limit => limit + 4)
            }
        }
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                <Grid container justify="center">
                    {
                        Object.keys(selectedBusiness).length > 0 ?
                            Object.values(selectedBusiness).slice(0, limit).map(business => {
                                if (business != null) {
                                    return (
                                        <Grid key={business["id"]} item xs={3} style={{ padding: 50 }}>
                                            <Card className={classes.card}>
                                                <CardActionArea>
                                                    <CardMedia
                                                        className={classes.media}
                                                        image={business["photos"][0]}
                                                        title={business["name"]}
                                                    />
                                                </CardActionArea>
                                                <CardContent style={{ textAlign: "start" }}>
                                                    <Typography gutterBottom variant="h5" component="h2">
                                                        {business["name"]}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary" component="p">
                                                        {business["price"] ? business["categories"].map(category => category["title"]).join(", ") + " - " + business["price"] : business["categories"].map(category => category["title"]).join(", ") + " - Unspecified"}
                                                    </Typography>
                                                    <Stars count={business["rating"]} name={business["name"]} empty={business["rating"]} />
                                                    {business["is_closed"] == false ?
                                                        <Grid container className={classes.root}>
                                                            <Grid item>
                                                                <FiberManualRecordIcon style={{ color: green[500] }}>
                                                                </FiberManualRecordIcon>
                                                            </Grid>
                                                            <Grid item xs={8}>
                                                                <Typography variant="body1" style={{ marginTop: 0.3 }} color="textSecondary" component="p">
                                                                    OPEN
                                                    </Typography>
                                                            </Grid>
                                                        </Grid>
                                                        :
                                                        <Grid container>
                                                            <Grid item>
                                                                <FiberManualRecordIcon style={{ color: red[500] }}>
                                                                </FiberManualRecordIcon>
                                                            </Grid>
                                                            <Grid item xs={8}>
                                                                <Typography variant="body1" style={{ marginTop: 0.3 }} color="textSecondary" component="p">
                                                                    CLOSED
                                                    </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    }
                                                </CardContent>
                                                <CardActions>
                                                    <Button size="small" color="primary">
                                                        Share
                                                </Button>
                                                    <Button size="small" color="primary">
                                                        Learn More
                                                </Button>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    )
                                }
                            }) : null
                    }
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={() => handleLoadMore()}>
                    Load More
                </Button>
            </Grid>
        </Grid>
    )
}

export default BusinessCard