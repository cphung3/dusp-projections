import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Reptile from '../assets/contemplative-reptile.jpg';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles((theme) => ({
    paper: {

        position: 'absolute',
        width: '80%',
        height: '80%',
        // backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 4, 3),
    },
    container: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
    },
    title: {
        width: '100%',
        textAlign: 'left',
    },
    lineContainer: {
        width: '100%',
    },
    line: {
        margin: '0px',
        backgroundColor: '#D67474',
        width: '50px',
        height: '2px',
    },
    subtext: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    icon: {
        width: '10px',
        margin: '0px 10px',
    },
    media: {
        height: 500,
    },
}));

export default function MosaicDetails() {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render

    return (
        <div>
            <div className={classes.container}>
                <h1 className={classes.title} id="simple-modal-title">Title of Paper</h1>
                <div className={classes.lineContainer}>
                    <div className={classes.line}/>
                </div>
                <div className={classes.subtext}>
                    <h5>Author Name</h5>
                    <FiberManualRecordIcon color="primary" className={classes.icon}/>
                    <h5>Publishing Date</h5>
                    <FiberManualRecordIcon color="primary" className={classes.icon}/>
                    <h5>Source</h5>
                </div>
            </div>
                <CardMedia
                    className={classes.media}
                    image={Reptile}
                    title="Contemplative Reptile"
                />
        </div>
    )
}
