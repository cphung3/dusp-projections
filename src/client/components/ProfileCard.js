/* eslint-disable linebreak-style */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  root: {
    width: 240,
    color: 'white',
    background: 'rgba(0,0,0,0)',
    marginRight: '2vw',

  },
  media: {
    height: 180,
  },
});

export default function ProfileCard({ name, title, affil }) {
  const classes = useStyles();

  return (
    <Card elevation={0} className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="/public/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
        <CardContent style={{ textAlign: 'Left', padding: '1rem 0 0 0' }}>
          <Typography gutterBottom variant="h5" component="h4" style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: '1rem' }}>
            {name}
          </Typography>
          <Typography variant="body2" component="p" style={{ fontFamily: 'Montserrat' }}>
            {title}
          </Typography>
          <Typography variant="body2" component="p" style={{ fontFamily: 'Montserrat' }}>
            {affil}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

ProfileCard.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  affil: PropTypes.string.isRequired,
};
