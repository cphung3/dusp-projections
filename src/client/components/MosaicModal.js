import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { IconButton, Paper } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import MosaicCard from './MosaicCard';
import MosaicContent from './MosaicContent';
import { motion } from 'framer-motion';
import MosaicDetails from './MosaicDetails';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left-5}%)`,
    outline: 'none',
  };
}

const useStyles = makeStyles((theme) => ({
  paperOuter: {
    position: 'absolute',
    width: '80%',
    height: '80%',
    // backgroundColor: theme.palette.background.paper,
    opacity: 0.85,
  },
  paperInner: {
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
  },
  titleBar: {
    width: '100%',
    height: '35px',
    backgroundColor: 'gray',
    opacity: 1,
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    display: 'flex',
    justifyContent: 'flex-start',
    color: 'white',
    cursor: 'pointer',
    padding: '4px',
    marginLeft: '8px',
  },
}));

export default function MosaicModal({selectedCountry, open, handleClose}) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [cardClicked, setCardClicked] = React.useState(false);

  const handleCloseModal = () => {
    handleClose();
    setCardClicked(false);
  }
  const handleBack = () => {
    setCardClicked(false);
  }

  return (
    <div>
      <Modal
        BackdropProps={{ invisible: true }}
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div>
          <Paper square elevation={3} style={modalStyle} className={classes.paperOuter}>
            <div className={classes.titleBar}>
              { cardClicked ? 
                  <ArrowBackIosIcon onClick={handleBack} className={classes.icon}/>
                :
                null
              }
            </div>
            <Paper square elevation={0} className={classes.paperInner}>
              { cardClicked ? 
                <motion.div   
                    className="col-md-6 offset-md-3"
                    initial={{ x: '100vw' }}
                    animate={{ x: 0 }}
                    transition={{ stiffness: 150 }}
                    >
                  <MosaicDetails  />
                </motion.div>
                : 
                <div>
                  <div className={classes.container}>
                    <h1 className={classes.title} id="simple-modal-title">{selectedCountry}</h1>
                    <div className={classes.line}/>
                  </div>
                  <MosaicCard setCardClicked={setCardClicked}/>
                </div>
              }
            </Paper>
          </Paper>
        </div>
      </Modal>
    </div>
  );
}