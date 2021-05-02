import React, { Suspense } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { IconButton, Paper } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { motion } from 'framer-motion';
import MosaicDetails from './MosaicDetails';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import MosaicCard from './MosaicCard';
// const MosaicCard = React.lazy(() => import('./MosaicCard'));

const drawerWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) / 2.5;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    flexFlow: 'wrap',
    display: 'flex',
    width: drawerWidth,
    top: 64,
  },
  drawerHeader: {
    display: 'flex',
    // alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
    marginLeft: 20,
    flex: 1,
  },
  closeDrawer: {
    display: 'flex',
    height: '100%',
  },
  closeDrawerBtn: {
    borderRadius: 0, 
    padding: 3, 
    borderRight: '1px solid rgba(0, 0, 0, 0.12)',
    // background: 'gray',
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
    background: 'white',
    opacity: 1,
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    display: 'flex',
    justifyContent: 'flex-start',
    color: 'gray',
    cursor: 'pointer',
    padding: '4px',
    marginLeft: '8px',
  },
  backNav: {
    display: 'flex',
    justifyContent: 'flex-start',
    color: 'gray',
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

export default function RightDrawer({submissionData, selectedCountry, open, handleDrawerClose}) {
  const [cardClicked, setCardClicked] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(0);

  const handleBack = () => {
    setCardClicked(false);
  }
  const classes = useStyles();
  const theme = useTheme();
  
  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.closeDrawer}>
          <IconButton onClick={handleDrawerClose} className={classes.closeDrawerBtn}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <div className={classes.drawerHeader}>
          {/* <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton> */}
          <Paper square elevation={0} className={classes.paperInner}>
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
                  {submissionData.map((data, idx) => 
                  (
                      <LazyLoadComponent>
                        <MosaicCard key={idx} index={idx} data={data} setSelectedCard={setSelectedCard} setCardClicked={setCardClicked}/>
                      </LazyLoadComponent>
                  )
                  )}
                </div>
              </div>
            }
          </Paper>
        </div>
      </Drawer>
    </div>
  );
}