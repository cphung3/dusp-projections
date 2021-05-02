import React from "react";
import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";
import LazyLoad from "react-lazyload";

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 10vh;
`;

const loadingAnimation = keyframes`
  0% {
    background-color: #fff;
  }
  50% {
    background-color: #ccc;
  }
  100% {
    background-color: #fff;
  }
`;

const Placeholder = styled.div`
  left: 0;
  width: 50%;
  height: 10vh;
  animation: ${loadingAnimation} 1s infinite;
`;

const StyledImage = styled.img`
  left: 0;
  width: 50%;
  height: 10vh;
  object-fit: cover;
`;

const LazyImage = ({ data, setSelectedCard, setCardClicked }) => {
  const refPlaceholder = React.useRef();
  console.log('data: ', data);

  const removePlaceholder = () => {
    refPlaceholder.current.remove();
  };

  return (
    <ImageWrapper>
      <Placeholder ref={refPlaceholder} />
      <LazyLoad>
        <StyledImage
          onLoad={removePlaceholder}
          onError={removePlaceholder}
          src={data.image}
          alt={data.title}
        />
      </LazyLoad>
    </ImageWrapper>
  );
};

// LazyImage.propTypes = {
//   src: PropTypes.string.isRequired,
//   alt: PropTypes.string.isRequired
// };

export default LazyImage;