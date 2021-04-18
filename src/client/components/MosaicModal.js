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
  // sets the transprency layer
  paperOuter: {
    position: 'absolute',
    width: '80%',
    height: '80%',
    // backgroundColor: theme.palette.background.paper,
    opacity: 0.85,
  },
  // keeps the inner cards opaque
  paperInner: {
    position: 'absolute',
    background: 0,
    width: '75%',
    height: '65%',
    padding: theme.spacing(2, 4, 3),
    overflow: 'auto',
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
    background: 'linear-gradient(94deg, #809e85, #526355)',
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
  backNav: {
    display: 'flex',
    justifyContent: 'flex-start',
    color: 'white',
    cursor: 'pointer',
    alignItems: 'center',
    fontSize: '23px',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexFlow: 'wrap',
  },
  card: {
    maxWidth: '300px',
    marginRight: '20px',
    minWidth: '300px',
  }
}));

export default function MosaicModal({submissionData, selectedCountry, open, handleClose}) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [cardClicked, setCardClicked] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(0);
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
                <div onClick={handleBack} className={classes.backNav}>
                  <ArrowBackIosIcon className={classes.icon}/>
                  <p>Back</p>
                </div>
                :
                null
              }
            </div>
          </Paper>
          <Paper square elevation={0} style={modalStyle} className={classes.paperInner}>
            { cardClicked ? 
              <motion.div   
                  className="col-md-6 offset-md-3"
                  initial={{ x: '100vw' }}
                  animate={{ x: 0 }}
                  transition={{ stiffness: 150 }}
                  >
                <MosaicDetails selectedCard={selectedCard} submissionData={submissionData} />
              </motion.div>
              : 
              <div>
                <div className={classes.container}>
                  <h1 className={classes.title} id="simple-modal-title">{selectedCountry}</h1>
                  <div className={classes.line}/>
                </div>
                <div className={classes.cardContainer}>
                  {submissionData.map((data, idx) => <MosaicCard key={idx} index={idx} data={data} setSelectedCard={setSelectedCard} setCardClicked={setCardClicked}/>)}
                </div>
              </div>
            }
          </Paper>
        </div>
      </Modal>
    </div>
  );
}