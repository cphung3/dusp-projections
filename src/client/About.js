/* eslint-disable linebreak-style */
import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { ReactSVG } from 'react-svg';
import ProfileCard from './components/ProfileCard';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    // marginBottom: '30px',
    paddingTop: '10vh',
    paddingBottom: '10vh',
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
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'wrap',
    width: '100%',
    marginBottom: '3vh'
  },
  card: {
    maxWidth: '300px',
    marginRight: '20px',
    minWidth: '300px',
  },
  bodyText: {
    textAlign: 'left',
    color: 'white',
  },
  contentBody: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    flexWrap: 'wrap',
    maxWidth: 960,
  },
  title: {
    fontFamily: 'Montserrat', color: 'white', width: '100%', fontSize: '4rem', marginBottom: '40px'
  },
  subtitle: {
    fontFamily: 'Montserrat', color: 'white', width: '100%', fontSize: '3rem', marginBottom: '40px'
  },
  awardTitle: {
    fontFamily: 'Montserrat', color: 'white', width: '100%', fontSize: '2rem', marginBottom: '40px'
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
            Projections, the Journal of the MIT Department of Urban Studies and Planning,
            focuses on the most innovative and cutting edge research in planning.
            Each volume is devoted to a different topic of interest to planning scholars,
            students, and professionals. .
          </p>
          <p className={classes.bodyText}>
            {' '}
            <b>Projections 16 | Measuring the City: The Power of Urban Metrics </b>
            {' '}
            initiates a discussion on the
            interplay between the epistemology of urban data, data-driven measurements, and the politics of designing urban places.
          </p>
        </Container>
        <Container style={{marginBottom: 30}}>
          <Button onClick={handleClick} href="https://projections2021.mit.edu/" variant="outlined" size="large" className={classes.button}>
            Projections 16 Website
          </Button>
          <Button onClick={handleClick} href="https://projections2021.mit.edu/call-data-visualizations" variant="outlined" size="large" className={classes.button}>
            Submit Visualizations
          </Button>
        </Container>
        <Container>
          <Typography variant="h4" className={classes.subtitle}>Projections 16 Best Visualization Award</Typography>
          <Typography variant="h5" className={classes.awardTitle}>"The Atlas of the Carbon Economy" by Jamie Williams</Typography>
          <Container className={classes.contentBody}>
            <p className={classes.bodyText}>
            The "Projections 16" editorial team is pleased to announce that <b>"The Atlas of the Carbon Economy" by Jamie Williams 
            (University of Westminster)</b> has won the "Projections 16 Best Visualization" award. We also would like to celebrate 
            <b> "Why and Where We Need to Change, London 2020" by Ben Pollock (4D Island and Jestico Whiles)</b> and <b>"Satellite 
            Remote Sensing of Nitrogen Dioxide (NO2): Transport Pollution in Russia" by Nabi Agzamov (STRELKA KB)</b> as 
            recipients of two honorable mentions.
            </p>
          <p className={classes.bodyText}>
            Jamie Williams' "The Atlas of the Carbon Economy" impressed the editorial team with a combination 
            of rigorous research and visual storytelling to unpack the geopolitics of carbon trading. 
            By mapping each country's contribution to the carbon economy and the role they are undertaking to offset 
            their carbon footprint, the visualization highlights the countries that contribute the most to the climate crisis. 
            One of the most compelling aspects of the visualization is how it integrates the global and local scales, 
            as well as the human and non-human contributions towards carbon production. The editorial team is proud to announce 
            the unanimous decision to award the "Projections Best Visualization" to "The Atlas of the Carbon Economy".
          </p>
          <div style={{marginBottom: 60}}>
            <img alt="The Atlas of the Carbon Economy" src="/Jamie_Williams.jpg" style={{ width: '960px' }} />
          </div>
          <Typography variant="h5" className={classes.awardTitle}>Projections 16 Honorable Mentions</Typography>
          <p className={classes.bodyText}>
            Ben Pollock’s "Why and Where We Need to Change, London 2020" receives an honorable mention for highlighting the 
            compound effect that social factors, environmental stress, and climate threats have in London neighborhoods. 
            The editorial team deeply appreciated the integration of multiple spatial datasets and the creative use 
            of interactive mediums that made the visualization tangible using AR filters.
          </p>
          <div style={{marginBottom: 60}}>
            <img alt="Why and Where We Need To Change" src="/Ben_Pollock.jpg" style={{ width: '960px' }} />
          </div>
          <p className={classes.bodyText}>
            Nabi Agzamov’s "Satellite Remote Sensing of Nitrogen Dioxide (NO2): Transport Pollution in Russia" 
            receives an honorable mention for using satellite imagery to study NO2 concentrations in Russian cities. 
            The visualization shows how NO2 concentrations are closely linked to urban activities, contrasting with other views 
            put forth by policymakers that have highlighted industrial air pollution as the primary source of pollution. 
            The editorial team appreciated how the project used multiple scales and time-series data to reveal 
            the relationship between air pollution and human activities. 
          </p>  
          <div style={{marginBottom: 60}}>
            <img alt="Satellite Remote Sensing of Nitrogen Dioxide" src="/Nabi_Agzamov.jpg" style={{ width: '960px' }} />
          </div>

          </Container>
        </Container>
        <Container className={classes.cardContainer}>
          <Typography variant="h4" className={classes.subtitle}>The Team</Typography>
          <ProfileCard name="Chaewon Ahn" title="Doctoral Candidate Editor" affil="DUSP MIT" image="chaewonahn_bw.png" link="https://www.ahnchaewon.com" />
          <ProfileCard name="Carmelo Ignaccolo" title="Doctoral Candidate Editor" affil="DUSP MIT" image="capture_ilaud_bw.jpg" link="https://dusp.mit.edu/student/carmelo-ignaccolo" />
          <ProfileCard name="Arianna Salazar Miranda" title="Doctoral Candidate Editor" affil="DUSP MIT" image="salazarmiranda.png" link="https://dusp.mit.edu/student/arianna-salazar-miranda" />
          <ProfileCard name="Calvin Phung" title="Website and Visualization" affil="Course 6 MIT" image="calvin_bw.jpg" link="" />
        </Container>
        <div className={classes.logoContainer}>
          <img alt="DUSP" src="/Dusp_png-01.png" style={{ width: '15vh', marginRight: '2vw' }} />
          {/* <ReactSVG id="MIT" src="/MIT-logo-gray-ltgray-72x38.svg" /> */}
        </div>
        <div style={{ fontSize: '.7vw', color: 'white' }}>© Copyright MIT, DUSP 2021 - 2028 | All rights reserved.</div>
      </Container>
      {/* </Paper> */}
    </div>
  );
}
