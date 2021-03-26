import React, { Component } from 'react'
import '../app.css';

export default class LandingOverlay extends Component {
    render() {
        return (
            <div className="overlay">
                <div className="container">
                    <div className="heading">
                        PROJECTIONS
                    </div>
                    <div className="subheading">
                        Visualizing Cities
                    </div>
                    <div className="body-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        In aliquet praesent leo ipsum, imperdiet tempor, quam. 
                        Curabitur nisl facilisis libero sed habitant interdum. 
                        Etiam non amet, quis eu ut rutrum aenean. 
                        Nunc cras accumsan pellentesque lacus sed sed facilisis blandit urna.
                    </div>
                </div>
            </div>
        )
    }
}
