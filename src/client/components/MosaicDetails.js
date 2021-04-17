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

export default function MosaicDetails({selectedCard, submissionData}) {
    const classes = useStyles();
    
    const data = submissionData[selectedCard] || {}
    console.log('details', selectedCard, submissionData, data)

    return (
        <div>
            <div className={classes.container}>
                <h1 className={classes.title} id="simple-modal-title">{data.title}</h1>
                <div className={classes.lineContainer}>
                    <div className={classes.line}/>
                </div>
                <div className={classes.subtext}>
                    <h5>{data.name}</h5>
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
