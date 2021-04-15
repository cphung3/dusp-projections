import React from 'react'
import { Paper } from '@material-ui/core';
import MosaicCard from './MosaicCard';
import { makeStyles } from '@material-ui/core/styles';

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
        marginBottom: '30px',
    },
    title: {
        width: '100%',
        textAlign: 'left',
    },
    line: {
        margin: '0px',
        backgroundColor: '#D67474',
        width: '50px',
        height: '2px',
    }
}));

export default function MosaicContent({selectedCountry}) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render

    return (
        <div>
            <div className={classes.container}>
                <h1 className={classes.title} id="simple-modal-title">{selectedCountry}</h1>
                <div className={classes.line}/>
            </div>
            <MosaicCard />
        </div>
    )
}
