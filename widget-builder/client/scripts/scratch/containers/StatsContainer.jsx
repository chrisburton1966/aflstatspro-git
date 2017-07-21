import React from 'react';

export default class StatsContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return React.createElement('div', {
            className: "stat-select-container " + this.props.noOfStats.value + "-col"
        }, this.props.statSelectContainers)
    }

}