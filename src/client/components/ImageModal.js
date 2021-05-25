import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles(theme => ({
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
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function ImageModal({ imageData, open, setOpen }) {
  const classes = useStyles();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const handleClose = () => {
    setOpen(false);
  };

  const handleImageLoad = (e) => {
    e.persist();
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) / 2;
    const xPos = vw + (e.target.width / 2) - 65;
    setDimensions({ width: xPos, height: e.target.height });
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
                Object.keys(imageData).length
                  ? (
                    <div>
                      <img onLoad={e => handleImageLoad(e)} alt={imageData.title} className={classes.media} src={imageData.image} />
                      <IconButton
                        aria-label="exit"
                        onClick={handleClose}
                        className={classes.margin}
                        style={{
                          background: 'rgba(0,0,0,0.1)', color: 'white', position: 'absolute', left: dimensions.width
                        }}
                      >
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    </div>
                  )
                  : null
            }
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

ImageModal.propTypes = {
  imageData: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string
  }).isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired
};
