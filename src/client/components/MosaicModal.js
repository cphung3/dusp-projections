import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Paper } from '@material-ui/core';
import MosaicCard from './MosaicCard';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left-5}%)`,
    outline: 'none',
    opacity: 0.85,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {

    position: 'absolute',
    width: '80%',
    height: '80%',
    backgroundColor: theme.palette.background.paper,
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
    backgroundColor: 'red',
    width: '50px',
  }
}));

export default function MosaicModal({selectedCountry, open, handleClose}) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  return (
    <div>
      <Modal
        BackdropProps={{ invisible: true }}
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Paper elevation={3} style={modalStyle} className={classes.paper}>
            <div className={classes.container}>
              <h1 className={classes.title} id="simple-modal-title">{selectedCountry}</h1>
              <hr className={classes.line}/>
            </div>
            <MosaicCard />
        </Paper>
      </Modal>
    </div>
  );
}