import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Button, IconButton, Paper } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { motion } from 'framer-motion';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import InfiniteScroll from 'react-infinite-scroller';
import Skeleton from '@material-ui/lab/Skeleton';
import MosaicCard from './MosaicCard';
import MosaicDetails from './MosaicDetails';

// const MosaicCard = React.lazy(() => import('./MosaicCard'));

const drawerWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) / 2.5;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
    width: '100%',
    textAlign: 'left',
    margin: '1.5vh 0',
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: '40vw',
    flexShrink: 0,
  },
  drawerPaper: {
    flexFlow: 'wrap',
    display: 'flex',
    width: '40vw',
    top: '6vh',
    overflowY: 'hidden',
  },
  drawerHeader: {
    display: 'flex',
    // alignItems: 'center',
    // padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
    marginLeft: '1vw',
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
    // borderRight: '1px solid rgba(0, 0, 0, 0.12)',
    // background: 'gray',
  },
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    margin: '2vh 0',
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
  },
  viewMore: {
    marginRight: '3vw',
    marginBottom: '4vh',
  },
}));

export default function RightDrawer({
  submissions, cardClicked, setCardClicked, handleBack, selectedCountry, open, handleDrawerClose, filterSelection
}) {
  const [selectedCard, setSelectedCard] = useState(0);
  const [incrementCount, setIncrementCount] = useState(0);
  const [submissionData, setSubmissionData] = useState([]);
  const [submissionLimit, setSubmissionLimit] = useState(6);
  const [allSubmissionsVisible, setAllSubmissionsVisible] = useState(true);

  // check what submissions to show to user
  useEffect(() => {
    // if a country is selected
    if (Object.values(selectedCountry).length !== 0) {
      const selectedISO = selectedCountry.ISO_A3;
      const selectedCountrySubmissions = submissions[selectedISO] || [];
      if (submissionLimit < selectedCountrySubmissions.length) setAllSubmissionsVisible(false);
      else setAllSubmissionsVisible(true);
      const batchSubmissions = selectedCountrySubmissions.slice(0, Math.min(selectedCountrySubmissions.length, submissionLimit));
      setSubmissionData(batchSubmissions);
    } else if (Object.values(selectedCountry).length === 0 && open) {
      // country is deselected
      const selectedSubmissions = Object.values(submissions).flat();
      if (submissionLimit < selectedSubmissions.length) setAllSubmissionsVisible(false);
      else setAllSubmissionsVisible(true);
      setSubmissionData(selectedSubmissions.slice(0, Math.min(selectedSubmissions.length, submissionLimit)));
    }
  }, [submissionLimit, selectedCountry, submissions]);

  const handleViewMore = () => {
    setSubmissionLimit(submissionLimit + 4);
  };

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
            {theme.direction === 'rtl' ? <ChevronLeftIcon style={{ width: '3vw', height: '3vw' }} /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <div className={classes.drawerHeader}>
          {/* <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton> */}
          {/* <Paper square elevation={0} className={classes.paperInner}> */}
          { cardClicked
            ? (
              <motion.div
                className="col-md-6 offset-md-3"
                initial={{ x: '100vw' }}
                animate={{ x: 0 }}
                transition={{ stiffness: 150 }}
              >
                <MosaicDetails handleBack={handleBack} selectedCard={selectedCard} submissionData={submissionData} />
              </motion.div>
            )
            : (
              <div style={{ overflow: 'auto' }}>
                <div className={classes.container}>
                  {
                    Object.keys(selectedCountry).length !== 0
                      ? <h3 className={classes.title}>{selectedCountry.NAME}</h3>
                      : <h3 className={classes.title}>All Submissions</h3>
                  }
                  <div className={classes.line} />
                </div>
                <div className={classes.cardContainer}>
                  {open ? submissionData.map((data, idx) => (
                    <MosaicCard key={`${data.title}_${data.name}`} index={idx} data={data} incrementCount={incrementCount} setIncrementCount={setIncrementCount} setSelectedCard={setSelectedCard} setCardClicked={setCardClicked} />
                  )) : null}
                </div>
                {
                  !allSubmissionsVisible
                    ? (
                      <Button className={classes.viewMore} onClick={handleViewMore}>
                        View More
                      </Button>
                    ) : null
                }

              </div>
            )
            }
          {/* </Paper> */}
        </div>
      </Drawer>
    </div>
  );
}
