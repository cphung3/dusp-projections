import React from 'react'
import Container from '@material-ui/core/Container';
import MosaicCard from './components/MosaicCard';
import { makeStyles } from '@material-ui/core/styles';

function getGridStyle() {
  }
  
  const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
      marginBottom: '30px',
    },
    cardContainer: {
      display: 'flex',
      justifyContent: 'flex-start',
      flexFlow: 'wrap',
      marginTop: 100,
    },
    card: {
      maxWidth: '300px',
      marginRight: '20px',
      minWidth: '300px',
    }
  }));

export default function Grid({submissions}) {
    const classes = useStyles();
    // const [gridStyle] = React.useState(getGridStyle);

    return (
        <div>
            <Container>
                <div className={classes.cardContainer}>
                  {Object.values(submissions).map((country, idx) => {
                      return country.map((data, index) => {
                          return <MosaicCard key={`${idx}.${index}`} index={index} data={data}/>
                      })
                  })}
                </div>
            </Container>
        </div>
    )
}
