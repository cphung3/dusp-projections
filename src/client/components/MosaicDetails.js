import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Reptile from '../assets/contemplative-reptile.jpg';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from "react-router-dom";

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
        textAlign: 'left',
    },
    title: {
        width: '100%',
        textAlign: 'left',
        fontSize: '1.5vw',
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
        width: '100%',
        fontSize: '1vw',
    },
    icon: {
        width: '10px',
        margin: '0px 10px',
    },
    media: {
        height: 300,
        // maxWidth: '20vh',
    },
    description: {
        marginBottom: '30px',
        fontSize: '.9vw',
    },
    outerContainer: {
        marginRight: 30,
    },
    back: {
        padding: 0,
        marginTop: 12,
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
    },
    inactive: {
        pointerEvents: 'none',
        cursor: 'default',
    }
}));

export default function MosaicDetails({handleBack, selectedCard, submissionData}) {
    const classes = useStyles();
    
    const data = submissionData[selectedCard] || {}
    // const clicKBackButton = () => {
    //     handleBack
    // }

    return (
        <div className={classes.outerContainer}>
            <div className={classes.buttonContainer}>
                <IconButton onClick={handleBack} aria-label="back" className={classes.back}>
                    <ArrowBackIcon fontSize="large" />
                </IconButton>
            </div>
            <div className={classes.container}>
                <h1 className={classes.title} id="simple-modal-title">{data.title}</h1>
                <div className={classes.lineContainer}>
                    <div className={classes.line}/>
                </div>
                <div className={classes.subtext}>
                    <h3>{data.name}</h3>
                    <FiberManualRecordIcon color="primary" className={classes.icon}/>
                    <h3>{data.timestamp}</h3>
                    {/* <FiberManualRecordIcon color="primary" className={classes.icon}/>
                    <h3>Source</h3> */}
                </div>
                <div className={classes.description}>
                    {data.description}
                </div>
            </div>
            <a className={data.url.length === 0 ? classes.inactive : classes.active} href={data.url} rel="noopener noreferrer" target="_blank">
                <CardMedia
                    className={classes.media}
                    image={data.image}
                    title={data.title}
                />
            </a>
                {/* <img
                    className={classes.media}
                    src={data.image}
                    title={data.title}
                    onProgress={console.log('getting image')}
                /> */}
        </div>
    )
}
