import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Reptile from '../assets/contemplative-reptile.jpg';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    minWidth: 345,
    marginRight: '20px',
    opacity: 1,
  },
  media: {
    height: 140,
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

export default function MosaicCard({index, data, setCardClicked, setSelectedCard}) {
  const classes = useStyles();

  const handleClick = () => {
    setSelectedCard(index);
    setCardClicked(true);
  }

  return (
    <Card 
        className={classes.root}
        onClick={handleClick}
        >
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={Reptile}
          title="Contemplative Reptile"
        />
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