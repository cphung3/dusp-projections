import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    // width: '80vw',
    // backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    boxShadow: theme.shadows[5],
  },
  inactive: {
    pointerEvents: 'none',
    cursor: 'default',
  },
  media: {
    height: '90vh',
  }
}));

export default function ImageModal({imageData, open, setOpen}) {
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };
  

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
          {
                Object.keys(imageData).length ? 
                    <div>
                      <img className={classes.media} src={imageData.image}></img>
                        {/* <CardMedia
                            className={classes.media}
                            image={imageData.image}
                            title={imageData.title}
                        /> */}
                    </div>
                : null
            }
          </div>
        </Fade>
      </Modal>
    </div>
  );
}