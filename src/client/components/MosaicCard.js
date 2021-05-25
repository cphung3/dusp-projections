import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Image from 'material-ui-image';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles({
  root: {
    // maxWidth: 300,
    // minWidth: 300,
    width: '16vw',
    marginRight: '1vw',
    marginBottom: '1vh',
    opacity: 1,
    borderRadius: 0,
    // backgroundColor: theme.palette.primary.light,
    // color: theme.palette.primary.contrastText,
    boxShadow: 'none'
  },
  media: {
    paddingTop: 0,
    // height: 180,
  },
  icon: {
    width: '1vh',
    margin: '0px 1vh',
  },
  subtitle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '.8rem',
  },
  content: {
    padding: '0 1vh',
  },
  ellipsis: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  }
});

export default function MosaicCard({
  index, data, setCardClicked, setSelectedCard
}) {
  const classes = useStyles();

  const handleClick = () => {
    setSelectedCard(index);
    setCardClicked(true);
  };
  const loadingSkeleton = () => (<Skeleton animation="wave" variant="rect" width={345} height={158} />);

  return (
    <Card
      className={classes.root}
      onClick={handleClick}
    >
      <CardActionArea>
        <Image
          className={classes.media}
          loading={loadingSkeleton()}
            // disableSpinner={true}
          src={data.image}
          title={data.title}
          imageStyle={{ height: 'auto' }}
          style={{ paddingTop: 'calc(47%)', maxHeight: '168px', overflow: 'hidden' }}
          animationDuration={1000}
        />
        <CardContent className={classes.content}>
          <Typography variant="subtitle1" className={classes.subtitle}>
            <b className={classes.ellipsis}>{data.title}</b>
            {' '}
            <FiberManualRecordIcon color="primary" className={classes.icon} />
            {' '}
            <p className={classes.ellipsis}>{data.name}</p>
          </Typography>
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

MosaicCard.propTypes = {
  data: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired,
  index: PropTypes.number.isRequired,
  setCardClicked: PropTypes.func.isRequired,
  setSelectedCard: PropTypes.func.isRequired
};
