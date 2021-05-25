/* eslint-disable linebreak-style */
import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ProfileCard from './components/ProfileCard';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    // marginBottom: '30px',
    paddingTop: '10vh',
    width: '100%',
    // height: '100vh',
  },
  paper: {
    background: 'linear-gradient(125deg,#FFE8D6, #D67474);',
    width: '100%',
    height: '100%',
    // position: 'absolute', top: 0, left: 0,
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'wrap',
    marginTop: 100,
    marginBottom: 100,
  },
  card: {
    maxWidth: '300px',
    marginRight: '20px',
    minWidth: '300px',
  },
  bodyText: {
    color: 'white',
  },
  title: {
    fontFamily: 'Montserrat', color: 'white', width: '100%', fontSize: '4rem', marginBottom: '40px'
  },
  subtitle: {
    fontFamily: 'Montserrat', color: 'white', width: '100%', fontSize: '3rem', marginBottom: '40px'
  },
  button: {
    marginTop: '60px',
    margin: theme.spacing(1),
    color: 'white',
    border: '1px solid white',
    marginRight: 20,
  },
}));

export default function About() {
  const classes = useStyles();
  // const [gridStyle] = React.useState(getGridStyle);

  const handleClick = (e) => {
    // setClicked(true);
    // setTimeout(
    //     () => setHidden(true),
    //     350
    //   );
  };

  return (
    <div className={classes.paper}>
      {/* <Paper className={classes.paper}> */}
      <Container className={classes.container}>
        <Typography variant="h3" className={classes.title}>What is Projections 16?</Typography>
        <Container maxWidth="sm">
          <p className={classes.bodyText}>
            Projections, the Journal of the MIT Department of Urban Studies and Planning, focuses on the most innovative
            and cutting edge research in planning. Each volume is devoted to a different topic of interest to planning scholars,
            students, and professionals. As a peer-reviewed publication, Projections welcomes original high quality submissions at the
            vanguard of planning theory and practice.
          </p>
          <p className={classes.bodyText}>
            {' '}
            <b>Projections 16 | Measuring the City: The Power of Urban Metrics </b>
            {' '}
            initiates a discussion on the
            interplay between the epistemology of urban data, data-driven measurements, and the politics of designing urban places.
          </p>
        </Container>
        <Container>
          <Button onClick={handleClick} href="https://projections2021.mit.edu/" variant="outlined" size="large" className={classes.button}>
            Projections 16 Website
          </Button>
          <Button onClick={handleClick} href="https://projections2021.mit.edu/call-data-visualizations" variant="outlined" size="large" className={classes.button}>
            Submit Visualizations
          </Button>
        </Container>
        <Container className={classes.cardContainer}>
          <Typography variant="h4" className={classes.subtitle}>The Team</Typography>
          <ProfileCard name="Chaewon Ahn" title="Doctoral Candidate Editor" affil="DUSP MIT" image="chaewonahn_bw.png" link="" />
          <ProfileCard name="Carmelo Ignaccolo" title="Doctoral Candidate Editor" affil="DUSP MIT" image="capture_ilaud_bw.jpg" link="https://dusp.mit.edu/student/carmelo-ignaccolo" />
          <ProfileCard name="Arianna Salazar Miranda" title="Doctoral Candidate Editor" affil="DUSP MIT" image="salazarmiranda.png" link="https://dusp.mit.edu/student/arianna-salazar-miranda" />
          <ProfileCard name="Calvin Phung" title="Website and Visualization" affil="Course 6 MIT" image="calvin_bw.jpg" link="" />
        </Container>
      </Container>
      {/* </Paper> */}
    </div>
  );
}
