import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ImageModal from './ImageModal';

const useStyles = makeStyles(theme => ({
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
    height: '30vh',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)',
    '&:after': {
      opacity: 0,
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.6)',
      transition: 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)',
    },
    '&:hover': {
      cursor: 'pointer',
      transform: 'scale(1.05, 1.05)',
    },
    '&:hover:after': {
      opacity: 1,
    }
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
    textDecoration: 'none',
    color: 'rgba(0, 0, 0, 0.87)',
  },
  active: {
    textDecoration: 'none',
    color: 'rgba(0, 0, 0, 0.87)',
    transition: 'color .3s ease',
    cursor: 'pointer',
    '&:hover': {
      color: '#D67474',
    },
  }
}));

export default function MosaicDetails({ handleBack, selectedCard, submissionData }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [imageData, setImageData] = useState({});

  useEffect(() => {
    const data = submissionData[selectedCard] || {};
    setImageData(data);
  }, [selectedCard]);
  // const clicKBackButton = () => {
  //     handleBack
  // }

  function handleImageClick() {
    setOpen(true);
  }

  return (
    <div className={classes.outerContainer}>
      <div className={classes.buttonContainer}>
        <IconButton onClick={handleBack} aria-label="back" className={classes.back}>
          <ArrowBackIcon fontSize="large" />
        </IconButton>
      </div>
      {
                Object.keys(imageData).length
                  ? (
                    <div>
                      <div className={classes.container}>
                        <a className={imageData.url.length === 0 ? classes.inactive : classes.active} href={imageData.url} rel="noopener noreferrer" target="_blank">
                          <h1 className={classes.title} id="simple-modal-title">{imageData.title}</h1>
                        </a>
                        <div className={classes.lineContainer}>
                          <div className={classes.line} />
                        </div>
                        <div className={classes.subtext}>
                          <h3>{imageData.name}</h3>
                          <FiberManualRecordIcon color="primary" className={classes.icon} />
                          <h3>{imageData.city || 'No city provided'}</h3>
                          {/* <FiberManualRecordIcon color="primary" className={classes.icon}/>
                                <h3>Source</h3> */}
                        </div>
                        <div className={classes.description}>
                          {imageData.description}
                        </div>
                      </div>
                      <div>
                        <CardMedia
                          className={classes.media}
                          image={imageData.image}
                          title={imageData.title}
                          onClick={handleImageClick}
                        />
                        <ImageModal imageData={imageData} open={open} setOpen={setOpen} />
                      </div>
                    </div>
                  )
                  : null
            }
    </div>
  );
}
