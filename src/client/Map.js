import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import './app.css';
import tip from 'd3-tip';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    //   padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: 0,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: '40vw',
  },
  disclaimer: {
    display: 'flex',
    position: 'absolute',
    bottom: '1vh',
    left: '1vw',
    maxWidth: '20vw',
    color: 'rgba(0,0,0,.5)',
    fontSize: '.7rem',
  }
}));

/**
 * Source inspiration from https://dev.to/muratkemaldar/interactive-world-map-with-d3-geo-498
 *
 * @param {Object} submissions submitted data object from Google spreadsheets
 * @param {Object} data GeoJson map
 * @param {Integer} size parameter used for width and height
 * @returns
 */
export default function Map(props) {
  const {
    open,
    setSelectedCountry,
    selectedCountry,
    handleDrawerOpen,
    handleBack,
    submissions,
    coordData,
    data,
    sizeVw,
    sizeVh
  } = props;
  const svgRef = useRef();
  const wrapperRef = useRef();
  const classes = useStyles();

  const sensitivity = 75;

  function handleCountryClick(e, d) {
    handleBack();
    if (open && svgRef.current.selectedFeature === d.properties.ISO_A3) {
      setSelectedCountry({});
      svgRef.current.selectedFeature = '';
    } else if (d.properties.ISO_A3 in submissions) {
      handleDrawerOpen();
      setSelectedCountry(d.properties);
      svgRef.current.selectedFeature = d.properties.ISO_A3;
    }
  }

  // Add tooltip for name of each country
  const tooltip = tip()
    .attr('class', 'd3-tip')
    .offset([-5, 0])
    .html((event, d) => d.properties.NAME || d.properties.FORMAL_EN);


  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const projection = d3.geoOrthographic().fitSize([sizeVw, sizeVh], data);
    let path = d3.geoPath().projection(projection).pointRadius(1.5);
    function rotateFunction() {
      const rotate = projection.rotate();
      const k = sensitivity / projection.scale();
      projection.rotate([
        rotate[0] + 1 * k / 2,
      ]);
      path = d3.geoPath().projection(projection).pointRadius(1.5);
      svg.selectAll('path').attr('d', feature => path(feature));
    }

    if (!svgRef.current.isBuilt) {
      svg.selectAll('.country').remove();
      svgRef.current.isBuilt = true;
      svg.call(tooltip);
      svg
        .selectAll('.country')
        .data(data.features)
        .join('path')
        .attr('class', 'country')
        .attr('d', feature => path(feature))
        .on('mouseover', tooltip.show)
        .on('mouseout', tooltip.hide)
        .on('click', (e, d) => handleCountryClick(e, d));

      svg.selectAll('.country').attr('fill', '#aaa');
      const rotateTimer = d3.timer(rotateFunction, 200);
      svg.call(d3.drag().on('drag', (event) => {
        const rotate = projection.rotate();
        const k = sensitivity / projection.scale();
        projection.rotate([
          rotate[0] + event.dx * k,
        ]);
        path = d3.geoPath().projection(projection).pointRadius(1.5);
        svg.selectAll('path').attr('d', feature => path(feature));
        rotateTimer.stop();
      }));
    }

    svg
      .selectAll('.country')
      .on('click', (e, d) => handleCountryClick(e, d));

    if (Object.keys(selectedCountry).length) {
      if (svgRef.current.selectedFeature === selectedCountry.ISO_A3) {
        svg.selectAll('.country').attr('fill', feature => (svgRef.current.selectedFeature === feature.properties.ISO_A3 ? '#D67474' : '#aaa'));
      }
    } else {
      svg.selectAll('.country').attr('fill', '#aaa');
    }

    if (svgRef.current.coordData !== coordData) {
      svg.call(tooltip);
      svg.selectAll('.circles').remove();
      svgRef.current.coordData = coordData;
      // blinking circles from https://bl.ocks.org/Tak113/4a8caf75e1d3aa13132c8ad9a662a49b

      const circles = svg
        .selectAll('.circles')
        .data(coordData)
        .join('path') // has to be a path because circles don't have edge clipping
        .attr('class', 'circles')
        .attr('d', geo => path(geo.coordinates))
        .attr('fill', 'pink')
        .attr('point-events', 'none');
        // .on('mouseover', tooltip.show)
        // .on('mouseout', tooltip.hide);
        // .on('click', handleCountryClick);

      // circles.attr('d', path.pointRadius(0.1));

      path.pointRadius('.2');

      // eslint-disable-next-line no-inner-declarations
      function repeat() {
        circles
          .attr('stroke-width', 0)
          .attr('stroke', 'pink')
          .attr('opacity', 1)
          .transition()
          .duration(2000)
          .attr('stroke-width', 25)
          .attr('opacity', 0)
          .on('end', repeat);
      }
      repeat();
    }
  }, [open, submissions, coordData, selectedCountry]);


  return (
    <div
      id="globe"
      ref={wrapperRef}
      className={clsx(classes.content, {
        [classes.contentShift]: open,
      })}
    >
      <svg
        width={sizeVw}
        height={sizeVh}
        ref={svgRef}
      />
      <div className={classes.disclaimer}>
        The team of "Visualizing Cities" has utilized state boundaries
        provided by naturalearthdata.com to construct this
        interactive rotating globe. Our group stands in solidarity with
        communities affected by conflicts taking place in areas of territorial dispute.
      </div>
    </div>
  );
}

Map.propTypes = {
  coordData: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.shape({
    features: PropTypes.arrayOf(PropTypes.object).isRequired
  }).isRequired,
  handleBack: PropTypes.func.isRequired,
  handleDrawerOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedCountry: PropTypes.shape({
    ISO_A3: PropTypes.string
  }).isRequired,
  setSelectedCountry: PropTypes.func.isRequired,
  sizeVh: PropTypes.number.isRequired,
  sizeVw: PropTypes.number.isRequired,
  submissions: PropTypes.shape({
    ISO_A3: PropTypes.string
  }).isRequired
};
