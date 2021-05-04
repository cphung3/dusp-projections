import React, { useEffect, useState } from 'react';
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
import InfiniteScroll from 'react-infinite-scroller';
import Skeleton from '@material-ui/lab/Skeleton';

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
    overflowY: 'hidden',
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
    // maxWidth: 0,
    overflow: 'auto',
    maxHeight: '95vh',
  },
  closeDrawer: {
    display: 'flex',
    height: '100%',
  },
  closeDrawerBtn: {
    borderRadius: 0, 
    padding: 0, 
    borderRight: '1px solid rgba(0, 0, 0, 0.12)',
    // background: 'gray',
  },
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    margin: '20px 0',
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
    // height: 700,
    overflowY: 'auto',
  },
  card: {
    maxWidth: '300px',
    marginRight: '20px',
    minWidth: '300px',
  }
}));

export default function RightDrawer({submissionData, selectedCountry, open, handleDrawerClose}) {
  const [cardClicked, setCardClicked] = useState(false);
  const [selectedCard, setSelectedCard] = useState(0);
  // const [visibleCards, setVisibleCards] = useState(submissionData.slice(0, Math.min(submissionData.length, 4)))
  const [incrementCount, setIncrementCount] = useState(0)
  // const [cardsLoaded, setCardsLoaded] = useState(false)
  // console.log('submissions cards: ', submissionData);
  // console.log('visible cards: ', visibleCards);
  // setVisibleCards(submissionData.slice(0, Math.min(submissionData.length, 4)));

  const handleBack = () => {
    setCardClicked(false);
  }
  const handleScroll = (added) => {
    setVisibleCards(submissionData.slice(0, Math.min(submissionData.length, 4+added)));
  }

  useEffect(() => {
    console.log('inside use effect of drawer');
  }, [])

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
          {/* <Paper square elevation={0} className={classes.paperInner}> */}
            { cardClicked ? 
              <motion.div   
                  className="col-md-6 offset-md-3"
                  initial={{ x: '100vw' }}
                  animate={{ x: 0 }}
                  transition={{ stiffness: 150 }}
                  >
                <MosaicDetails handleBack={handleBack} selectedCard={selectedCard} submissionData={submissionData} />
              </motion.div>
              : 
              <div style={{overflow: 'auto'}}>
                <div className={classes.container}>
                  {/* <h3 className={classes.title} id="simple-modal-title">{}</h3> */}
                  <div className={classes.line}/>
                </div>
                <div className={classes.cardContainer}>
                      {/* <InfiniteScroll
                          pageStart={0}
                          loadMore={() => handleScroll(4)}
                          hasMore={false}
                          loader={<div className="loader" key={0}>Loading ...</div>}
                          useWindow={false}
                      > */}
                          {submissionData.map((data, idx) => 
                            (
                              <MosaicCard key={idx} index={idx} data={data} incrementCount={incrementCount} setIncrementCount={setIncrementCount} setSelectedCard={setSelectedCard} setCardClicked={setCardClicked}/>
                            )
                          )}
                      {/* </InfiniteScroll> */}
                  
                </div>
              </div>
            }
          {/* </Paper> */}
        </div>
      </Drawer>
    </div>
  );
}