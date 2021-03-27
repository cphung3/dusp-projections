import React, { Component } from 'react'
import '../app.css';
import ArrowDown from '../assets/arrow_down.svg';
import { ReactSVG } from 'react-svg';
import { animations } from 'react-animation'

export default class LandingOverlay extends Component {
    state = { clicked: false, hidden: false };

    handleClick = (e) => {
        this.setState({clicked: true});
        setTimeout(
            () => this.setState({ hidden: true }), 
            400
          );
      }
    render() {
        const { clicked, hidden } = this.state;

        return (
            <div className={`overlay ${hidden ? 'hidden' : ''}`} style={clicked ? { animation: animations.slideOut } : {}}>
                <div className="container">
                    <div className="heading">
                        PROJECTIONS
                    </div>
                    <div className="subheading">
                        Visualizing Cities
                    </div>
                    <div className="body-container">
                        <div className="body-text">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            In aliquet praesent leo ipsum, imperdiet tempor, quam. 
                            Curabitur nisl facilisis libero sed habitant interdum. 
                            Etiam non amet, quis eu ut rutrum aenean. 
                            Nunc cras accumsan pellentesque lacus sed sed facilisis blandit urna.
                        </div>
                    </div>
                    <ReactSVG  id="arrow-down" src={ArrowDown} onClick={this.handleClick} />
                </div>
            </div>
        )
    }
}
