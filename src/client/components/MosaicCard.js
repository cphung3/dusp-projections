import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Image from 'material-ui-image'
import Skeleton from '@material-ui/lab/Skeleton';
import LazyCardMedia from './LazyCardMedia.js';

const useStyles = makeStyles({
  root: {
    // maxWidth: 300,
    // minWidth: 300,
    width: '16vw',
    marginRight: 20,
    marginBottom: 20,
    opacity: 1,
  },
  media: {
    paddingTop: 0,
    // height: 180,
  },
  icon: {
    width: '10px',
    margin: '0px 10px',
  },
  subtitle: {
    display: 'flex', 
    justifyContent: 'center',
    alignItems: 'center', 
    fontSize: '.8rem',
  },
  content: {
    padding: '0 10px',
  },
  ellipsis: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  }
});

export default function MosaicCard({index, data, incrementCount, setIncrementCount, setCardClicked, setSelectedCard}) {
  const [isLoading, setIsLoading] = useState(true)

  const classes = useStyles();

  const handleClick = () => {
    setSelectedCard(index);
    setCardClicked(true);
  }
  const loadingSkeleton = () => {
    return (<Skeleton animation="wave" variant="rect" width={345} height={158} />);
  }

  const handleLoaded = () => {
    setIncrementCount(incrementCount+1);
    console.log('loading false')
  }

  return (
    <Card 
        className={classes.root}
        onClick={handleClick}
        >
      <CardActionArea>
          {/* <LazyCardMedia
            className={classes.media}          
            image={data.image}
            title={data.title}
          /> */}
          <Image
            className={classes.media}
            loading={loadingSkeleton()}
            // disableSpinner={true}
            src={data.image}
            title={data.title}
            imageStyle={{height: 'auto'}}
            style={{paddingTop: 'calc(47%)', maxHeight: '168px', overflow: 'hidden'}}
            animationDuration={1000}
            // onLoad={handleLoaded}
          />
          {/* <LazyImage
            image={data.image}
          /> */}
          {/* <CardMedia
            className={classes.media}          
            image={data.image}
            title={data.title}
          /> */}
        <CardContent className={classes.content}>
          <Typography variant="subtitle1" className={classes.subtitle}>
            <b className={classes.ellipsis}>{data.title}</b> <FiberManualRecordIcon color="primary" className={classes.icon}/> <p className={classes.ellipsis}>{data.name}</p> 
          </Typography>
          {/* <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography> */}
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions> */}
    </Card>
  );
}